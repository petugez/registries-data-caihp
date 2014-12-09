(function() {
	'use strict';

	var log = require(process.cwd() + '/build/server/logging.js').getLogger('handlers/FeeHandler.js');
	var objectTools = require(process.cwd() + '/build/server/ObjectTools.js');
	var universalDaoModule = require(process.cwd() + '/build/server/UniversalDao.js');
	var dateUtils = require(process.cwd()+'/build/server/DateUtils.js').DateUtils;
	var QueryFilter = require(process.cwd()+'/build/server/QueryFilter.js');


 	function VirtualAccount(){

		this.dates=[];
		this.trans={};
		var self=this;


		this.addDate=function(date){
			this.dates.push(date);
			this.dates=this.dates.sort(function(a,b){
				if (a < b)
     				return -1;
  				if (a > b)
    				return 1;
  				return 0;});
		};

		this.getTrans=function(revdate){

			if (!this.trans[revdate]){
				this.trans[revdate]={credits:[],debits:[],balance:0,date:revdate};
				this.addDate(revdate);
			}

			return this.trans[revdate];
		};

		this.credit=function(revdate,value,entity){
			if (!revdate) return;
			var trs=this.getTrans(revdate);
			trs.credits.push({value:value,entity:entity});
		};

		this.debit=function(revdate,value,entity){
			if (!revdate) return;
			var trs=this.getTrans(revdate);
			trs.debits.push({value:value,entity:entity});
		};

		this.history=function(){
			return this.dates.map(function (date){
				return self.trans[date];
			});
		};

		this.recount = function(){
			var toPay=[];
			var paid=[];

			var toSpend=[];

			var balance =0;

			this.history().forEach(function(tr){
				tr.credits.map(function(credit){
					balance+=credit.value;
					credit.toSpend=credit.value;
					toSpend.push(credit);

				});

				tr.debits.map(function(debit){
					toPay.push(debit);
					debit.toPay=debit.value;
					debit.paid=0;
					debit.dateOfPayment=null;
				});

				if (balance>0){
					var payedCount=0;

					var toSpendUsed=null;
					toPay.forEach(function(debit){
						if (balance>0){
							if (balance>=debit.toPay){
							// full fee payed
								debit.paid=debit.entity.baseData.membershipFee;
								payedCount++;
								debit.dateOfPayment=tr.date;
								balance-=debit.toPay;
								toSpendUsed=spend(toSpend,debit.toPay);
								debit.toPay=0;
								toSpend=toSpendUsed.toSpend;
								debit.used=toSpendUsed.used;
								debit.fullyPayed=true;
								paid.push(debit);
							} else {
								// partially paid fee
								debit.paid+=balance;
								debit.toPay-=balance;
								debit.entity.baseData.membershipFeePaid=debit.entity.baseData.membershipFee-debit.toPay;
								spend(toSpend,balance);
								toSpendUsed=spend(toSpend,balance);
								balance=0;
								debit.used=toSpendUsed.used;
								toSpend=toSpendUsed.toSpend;
							}
						}
					});
					toPay.splice(0,payedCount);
				}
			});
			return{paid:paid,toPay:toPay};
		};
		function spend(credits,amount){

			var required=amount;
			var used=[];
			var toSpend=[];

			var useMore=true;
			credits.forEach(function(credit){

				if (useMore){
					if (required==credit.toSpend){
						required-=credit.toSpend;
						used.push(credit);
						useMore=false;
					}else if (required<credit.toSpend){
						used.push(credit);

						credit.toSpend-=required;
						toSpend.push(credit);
						useMore=false;
					} else if (required>credit.toSpend){
						used.push(credit);
						required-=credit.toSpend;
					}
				}else {
					toSpend.push(credit);
				}


			});

			return	{toSpend:toSpend,used:used};

		}

	}

	function FeeHandler(ctx) {
		this.ctx=ctx;
		var self=this;


		this.handleRecoutFeeStatus=function(event){

			var peopleId=event.peopleId;

			var peopleDao = new universalDaoModule.UniversalDao(
				this.ctx.mongoDriver,
				{collectionName: 'people'}
			);
			var feesDao = new universalDaoModule.UniversalDao(
				this.ctx.mongoDriver,
				{collectionName: 'fees'}
			);

			var paymentsDao = new universalDaoModule.UniversalDao(
				this.ctx.mongoDriver,
				{collectionName: 'payments'}
			);

			//get users fees and payments
			var qf=QueryFilter.create();
			qf.addCriterium("baseData.member.oid","eq",peopleId);
			// qf.addSort('baseData.accountingDate','asc');

			var va =  new VirtualAccount();



			paymentsDao.find(qf,function(err,payments){

				if (err){
					log.error(err);
					return;
				}

				var qf=QueryFilter.create();
				qf.addCriterium("baseData.member.oid","eq",peopleId);
				// qf.addSort('baseData.setupDate','asc');


				payments.forEach(function(payment){
					va.credit(payment.baseData.accountingDate,payment.baseData.amount,payment);

				});

				feesDao.find(qf,function (err,fees){

					if (err){
						log.error(err);
						return;
					}

					fees.forEach(function(fee){
						va.debit(fee.baseData.setupDate,fee.baseData.membershipFee,fee);
					});

					var counted=va.recount();
					// update
					counted.paid.forEach(function(paid){
						// if (paid.dateOfPayment!=paid.entity.baseData.dateOfPayment ||  paid.entity.baseData.feePaymentStatus!='refunded' ){
							paid.entity.baseData.dateOfPayment=paid.dateOfPayment;
							paid.entity.baseData.feePaymentStatus='refunded';
							paid.entity.baseData.membershipFeePaid=paid.paid;
							paid.entity.listOfPayments={payments:paid.used.map(function(used){
								return {registry:'payments',oid:used.entity.id};
							})};
							feesDao.save(paid.entity,function(err,data){
								log.debug('fee updated',paid.entity);
							});
						// }
					});
					var overDue={new:[],old:[],sum:0};
					counted.toPay.forEach(function(topay){
						topay.entity.baseData.membershipFeePaid=topay.paid;
						if (topay.entity.baseData.feePaymentStatus=='created' ){
							if (topay.entity.baseData.dueDate<dateUtils.nowToReverse()){
								overDue.new.push(topay);
								overDue.sum+=(topay.entity.baseData.membershipFee-topay.entity.baseData.membershipFeePaid);
								topay.entity.baseData.feePaymentStatus='overdue';
							}
							topay.entity.baseData.dateOfPayment=topay.dateOfPayment;
							topay.entity.baseData.membershipFeePaid=topay.paid;
							if (topay.used){
								topay.entity.listOfPayments={payments:topay.used.map(function(used){
									return {registry:'payments',oid:used.entity.id};
								})};
							}
							feesDao.save(topay.entity,function(err,data){
								log.debug('fee updated',topay.entity);
							});
						} else if (topay.entity.baseData.feePaymentStatus=='overdue' ||topay.entity.baseData.feePaymentStatus=='refunded'){
							topay.entity.baseData.feePaymentStatus='overdue';
							if (topay.entity.baseData.dueDate>dateUtils.nowToReverse()){
								topay.entity.baseData.feePaymentStatus='created';
							} else {
								overDue.old.push(topay);
								overDue.sum+=(topay.entity.baseData.membershipFee-topay.entity.baseData.membershipFeePaid);

							}
							if (topay.used){
								topay.entity.listOfPayments={payments:topay.used.map(function(used){
									return {registry:'payments',oid:used.entity.id};
								})};
							}
							topay.entity.baseData.dateOfPayment=topay.dateOfPayment;
							topay.entity.baseData.membershipFeePaid=topay.paid;
							feesDao.save(topay.entity,function(err,data){
								log.debug('fee updated',topay.entity);
							});
						}

					});


				});

			});



		};





		this.handleFeeChange=function(event){

			var entity = event.entity;

			var peopleDao = new universalDaoModule.UniversalDao(
				this.ctx.mongoDriver,
				{collectionName: 'people'}
			);
			var feesDao = new universalDaoModule.UniversalDao(
				this.ctx.mongoDriver,
				{collectionName: 'fees'}
			);

			var eventScheduler = this.ctx.eventScheduler;

			eventScheduler.unscheduleEvents(entity.id,null,function(err,data){
				eventScheduler.scheduleEvent(new Date().getTime()+1000,'event-fee-recount',{peopleId:entity.baseData.member.oid},[entity.id],function(err,data){
						if (err){
							log.err(err);
							return;
						}
						log.debug('fees recount scheduled');
					} );
				if (entity.baseData.dueDate && dateUtils.isReverseAfterNow(entity.baseData.dueDate)){
					eventScheduler.scheduleEvent(dateUtils.reverseToDate(entity.baseData.dueDate).getTime(),'event-fee-recount',{peopleId:entity.baseData.member.oid},[entity.id],function(err,data){
							if (err){
								log.err(err);
								return;
							}
							log.debug('fees recount scheduled');
						} );
				}

				var update=false;
				if (!entity.baseData.feePaymentStatus ){
					entity.baseData.feePaymentStatus='created';
					update=true;
				}

				if ( entity.baseData.member && entity.baseData.member.oid && !entity.baseData.variableSymbol || update  ){
					peopleDao.get(entity.baseData.member.oid,function(err,person){

						if (!entity.baseData.club && person.hockeyPlayerInfo.clubName){
							entity.baseData.club=person.hockeyPlayerInfo.clubName;
						}
						var vs=(person.baseData.bornNumber || '0000000000');
						entity.baseData.variableSymbol = vs.replace('/','');
						feesDao.save(entity,function(err,data){
							if (err) {
								log.error(err);
							}
							log.debug('fee VS set');
						});
					});
				}

			});

		};

		// this.handleFeeRecount=function(event){
		//
		// 	var feesDao = new universalDaoModule.UniversalDao(
		// 		this.ctx.mongoDriver,
		// 		{collectionName: 'fees'}
		// 	);
		// 	var paymentsDao = new universalDaoModule.UniversalDao(
		// 		this.ctx.mongoDriver,
		// 		{collectionName: 'payments'}
		// 	);
		//
		// 	var eventScheduler = this.ctx.eventScheduler;
		//
		// 	feesDao.get(event.entityId,function(err,fee){
		// 		if (err){
		// 			log.error(err);
		// 			return;
		// 		}
		// 		if (!fee){
		// 			return;
		// 		}
		// 		feesDao.getWithTimeLock(fee,3000,function(err,feeLock){
		//
		// 			if (err){
		// 				log.error(err);
		// 				return;
		// 			}
		//
		// 			if (!feeLock){
		// 				log.debug('fees: not able to get lock');
		// 				return;
		// 			}
		//
		// 			//find allready paired payments
		// 			var qf=QueryFilter.create();
		// 			qf.addCriterium("baseData.fee.oid","eq",fee.id);
		// 			qf.addSort('baseData.accountingDate','asc');
		//
		// 			paymentsDao.find(qf,function(err,data){
		// 				if (err){
		// 					log.error('paymentsDao',err);
		// 					return;
		// 				}
		//
		// 				fee.baseData.membershipFeePaid=0;
		// 				fee.baseData.dateOfPayment=null;
		//
		// 				var found=false;
		// 				var paymentsToUnpair=[];
		// 				var payments=data.map(function(payment){
		// 					if (!found && payment.baseData.variableSymbol===fee.baseData.variableSymbol && payment.baseData.amount===fee.baseData.membershipFee && !found ){
		// 						found=true;
		// 						fee.baseData.membershipFeePaid=payment.baseData.amount;
		// 						fee.baseData.dateOfPayment=payment.baseData.accountingDate;
		// 						fee.baseData.membershipFeePaid=payment.baseData.amount;
		// 					} else {
		// 						paymentsToUnpair.push(payment);
		// 					}
		// 				});
		// 				console.log('should be unpaired',payments);
		//
		// 				if (found){
		// 					fee.baseData.feePaymentStatus='refunded';
		// 				} else {
		// 					if (fee.baseData.feePaymentStatus!='canceled'){
		// 						if (fee.baseData.dueDate && dateUtils.isReverseAfterNow(fee.baseData.dueDate)){
		// 							fee.baseData.feePaymentStatus='created';
		// 						} else {
		// 							fee.baseData.feePaymentStatus='overdue';
		// 						}
		// 					 //check for addepts
		// 						var qf=QueryFilter.create();
		// 						qf.addCriterium('baseData.variableSymbol','eq',fee.baseData.variableSymbol);
		// 						qf.addCriterium('baseData.amount','eq',fee.baseData.membershipFee);
		// 						qf.addCriterium('baseData.status','eq','Unpaired');
		// 						qf.addSort('baseData.accountingDate','asc');
		// 						qf.setLimit(1);
		//
		// 						paymentsDao.find(qf,function(err,data){
		// 							if (data.length===1){
		// 								eventScheduler.scheduleEvent(new Date().getTime()+1000,'event-payment-updated',{entity:data[0]},[],function(err,data){
		// 										if (err){
		// 											log.err(err);
		// 											return;
		// 										}
		// 										log.debug('payment repair scheduled');
		// 								});
		// 							}
		//
		// 						});
		// 					}
		// 				}
		// 				feesDao.save(fee,function(err,data){
		// 					if (err){
		// 						log.error(err);
		// 						return;
		// 					}
		//
		// 					paymentsToUnpair.map(function(payment){
		// 						eventScheduler.scheduleEvent(new Date().getTime()+1000,'event-payment-unpair',{entity:payment},[],function(err,data){
		// 								if (err){
		// 									log.err(err);
		// 									return;
		// 								}
		// 								log.debug('payment repair scheduled');
		// 							} );
		// 					});
		// 					log.debug('fee updated',fee);
		// 				});
		// 		});
		// 		});
		// 	});
		//
		// };
	}


	FeeHandler.prototype.handle = function(event) {
		log.info('handle called',event,FeeHandler.prototype.ctx);

		if ('event-fee-created' === event.eventType){
			this.handleFeeChange(event);
		}else if ('event-fee-updated' === event.eventType){
			this.handleFeeChange(event);
		} else if ('event-fee-recount'===event.eventType ){
			this.handleRecoutFeeStatus(event);
		}
	};

	FeeHandler.prototype.getType=function(){
		return ['event-fee-updated','event-fee-created','event-fee-overdue','event-fee-recount'];
	};


	module.exports = function( ctx) {
		return new FeeHandler(ctx );
	};
}());
