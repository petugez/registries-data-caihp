(function() {
	'use strict';

	var log = require(process.cwd() + '/build/server/logging.js').getLogger('handlers/FeeHandler.js');
	var objectTools = require(process.cwd() + '/build/server/ObjectTools.js');
	var universalDaoModule = require(process.cwd() + '/build/server/UniversalDao.js');
	var dateUtils = require(process.cwd()+'/build/server/DateUtils.js').DateUtils;
	var QueryFilter = require(process.cwd()+'/build/server/QueryFilter.js');

	function FeeHandler(ctx) {
		this.ctx=ctx;
		var self=this;

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
				eventScheduler.scheduleEvent(new Date().getTime()+1000,'event-fee-recount',{entityId:entity.id},[entity.id],function(err,data){
						if (err){
							log.err(err);
							return;
						}
						log.debug('fees recount scheduled');
					} );
				if (entity.baseData.dueDate && dateUtils.isReverseAfterNow(entity.baseData.dueDate)){
					eventScheduler.scheduleEvent(dateUtils.reverseToDate(entity.baseData.dueDate).getTime(),'event-fee-recount',{entityId:entity.id},[entity.id],function(err,data){
							if (err){
								log.err(err);
								return;
							}
							log.debug('fees recount scheduled');
						} );
				}

				if (!entity.baseData.variableSymbol && entity.baseData.member && entity.baseData.member.oid){
					peopleDao.get(entity.baseData.member.oid,function(err,person){
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

		this.handleFeeRecount=function(event){

			var feesDao = new universalDaoModule.UniversalDao(
				this.ctx.mongoDriver,
				{collectionName: 'fees'}
			);
			var paymentsDao = new universalDaoModule.UniversalDao(
				this.ctx.mongoDriver,
				{collectionName: 'payments'}
			);

			var eventScheduler = this.ctx.eventScheduler;

			log.error('event',event);

			feesDao.get(event.entityId,function(err,fee){
				if (err){
					log.error(err);
					return;
				}
				if (!fee){
					return;
				}

				//find allready paired payments
				var qf=QueryFilter.create();
				qf.addCriterium("baseData.fee.oid","eq",fee.id);
				qf.addSort('baseData.accountingDate','asc');

				paymentsDao.find(qf,function(err,data){
					if (err){
						log.error('paymentsDao',err);
						return;
					}

					var found=false;
					var paymentsToUnpair=[];
					var payments=data.map(function(payment){
						if (payment.baseData.variableSymbol===fee.baseData.variableSymbol && payment.baseData.amount===fee.baseData.membershipFee && !found ){
							found=true;
							fee.baseData.membershipFeePaid=payment.baseData.amount;
							fee.baseData.dateOfPayment=payment.baseData.accountingDate;
						} else {
							paymentsToUnpair.push(payment);
						}
					});

					if (found){
						fee.baseData.feePaymentStatus='refunded';
					} else {
						fee.baseData.membershipFeePaid=0;
						fee.baseData.dateOfPayment=null;

						if (fee.baseData.feePaymentStatus!='canceled'){
							if (fee.baseData.dueDate && dateUtils.isReverseAfterNow(fee.baseData.dueDate)){
								fee.baseData.feePaymentStatus='created';
							} else {
								fee.baseData.feePaymentStatus='overdue';
							}
						 //check for addepts


							var qf=QueryFilter.create();
							qf.addCriterium("baseData.variableSymbol","eq",fee.baseData.variableSymbol);
							qf.addCriterium("baseData.amount","eq",fee.baseData.membershipFee);
							qf.addCriterium("baseData.status","eq",'Unpaired');
							qf.addSort('baseData.accountingDate','asc');
							qf.setLimit(1);

							paymentsDao.find(qf,function(err,data){
								if (data.length===1){
									eventScheduler.scheduleEvent(new Date().getTime()+1000,'event-payment-updated',{entity:data[0]},[],function(err,data){
											if (err){
												log.err(err);
												return;
											}
											log.debug('payment repair scheduled');
									});
								}

							});
						}
					}
					feesDao.save(fee,function(err,data){
						if (err){
							log.error(err);
							return;
						}

						paymentsToUnpair.map(function(payment){
							eventScheduler.scheduleEvent(new Date().getTime()+1000,'event-payment-updated',{entity:payment},[],function(err,data){
									if (err){
										log.err(err);
										return;
									}
									log.debug('payment repair scheduled');
								} );
						});
						log.debug('fee updated',fee);
					});
				});
			});

		};
	}


	FeeHandler.prototype.handle = function(event) {
		log.info('handle called',event,FeeHandler.prototype.ctx);

		if ("event-fee-created" === event.eventType){
			this.handleFeeChange(event);
		}else if ("event-fee-updated" === event.eventType){
			this.handleFeeChange(event);
		} else if ("event-fee-recount"===event.eventType ){
			this.handleFeeRecount(event);
		}
	};

	FeeHandler.prototype.getType=function(){
		return ['event-fee-updated','event-fee-created','event-fee-overdue','event-fee-recount'];
	};


	module.exports = function( ctx) {
		return new FeeHandler(ctx );
	};
}());
