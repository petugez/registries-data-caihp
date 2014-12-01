(function() {
	'use strict';

	var log = require(process.cwd() + '/build/server/logging.js').getLogger('handlers/PaymentHandler.js');
	var objectTools = require(process.cwd() + '/build/server/ObjectTools.js');
	var universalDaoModule = require(process.cwd() + '/build/server/UniversalDao.js');
	var dateUtils = require(process.cwd()+'/build/server/DateUtils.js').DateUtils;
	var QueryFilter = require(process.cwd()+'/build/server/QueryFilter.js');

	function PaymentHandler(ctx) {
		this.ctx=ctx;
		var self=this;

		this.handleUnpair=function(event){
			var eventScheduler = this.ctx.eventScheduler;

			var payment = event.entity;


			var paymentDao = new universalDaoModule.UniversalDao(
					this.ctx.mongoDriver,
					{collectionName: 'payments'}
			);

			payment.fee=null;
			payment.baseData.status='Unpaired';

			paymentDao.save(payment,function(err,data){
				if (err){
					log.error(err);
					return;
				}

				eventScheduler.scheduleEvent(new Date().getTime()+1000,'event-payment-updated',{entity:payment},[payment.id],function(err,data){
						if (err){
							log.err(err);
							return;
						}
						log.debug('fees recount scheduled');
					} );
			});
		};


		this.handlePaymentChange=function(event){

			var eventScheduler = this.ctx.eventScheduler;
			var payment = event.entity;

			var paymentDao = new universalDaoModule.UniversalDao(
					this.ctx.mongoDriver,
					{collectionName: 'payments'}
			);

			var feesDao = new universalDaoModule.UniversalDao(
				this.ctx.mongoDriver,
				{collectionName: 'fees'}
			);

			if (payment.baseData.status==='Paired' || !payment.baseData.status ){

				if ( !payment.baseData.fee || !payment.baseData.fee.oid ){
						payment.baseData.status='Unpaired';
						paymentDao.save(payment,function(err,data){

						});
				} else {
					feesDao.get(payment.baseData.fee.oid,function(err,fee){
						if (payment.baseData.amount!=fee.baseData.membershipFee || payment.baseData.variableSymbol!=fee.baseData.variableSymbol){
							var feeId= payment.baseData.fee.oid ;

							payment.baseData.status='Unpaired';
							payment.baseData.fee=null;

							paymentDao.save(payment,function(err,data){
									eventScheduler.scheduleEvent(new Date().getTime()+1000,'event-fee-recount',{entityId:feeId},[feeId],function(err,data){
											if (err){
												log.err(err);
												return;
											}
											log.debug('fees recount scheduled');
										} );
							});
						}
					});
				}
			}
			if (payment.baseData.status==='Standalone'){
				//has paired fee
				if (payment.baseData.fee.oid){
					feesDao.get(payment.baseData.fee.oid,function(err,payment){
							var feeId= payment.baseData.fee.oid ;
							payment.baseData.fee=null;
							paymentDao.save(payment,function(err,data){
									eventScheduler.scheduleEvent(new Date().getTime()+1000,'event-fee-recount',{entityId:feeId},[feeId],function(err,data){
											if (err){
												log.err(err);
												return;
											}
											log.debug('fees recount scheduled');
										} );
							});
					});
				}
				return;
			}

			if (payment.baseData.status==='Unpaired'){

				//search for pair
				var qf=QueryFilter.create();
				qf.addCriterium('baseData.variableSymbol','eq',payment.baseData.variableSymbol);
				qf.addCriterium('baseData.feePaymentStatus','in',['created','overdue']);
				qf.addCriterium('baseData.membershipFee','eq',payment.baseData.amount);
				qf.addSort('baseData.dueDate','asc');
				feesDao.find(qf,function(err,fees){
					if ( fees.length>0 ){
						//update payment.status
						var fee=fees[0];

						if (payment.baseData.feeId && payment.baseData.feeId!=fee.id){
							//throw recount old;
							feesIdToRecount.push(payment.baseData.feeId);
						}
						payment.baseData.fee={registry:'fees',oid:fee.id};
						payment.baseData.status='Paired';

						paymentDao.save(payment,function(err,data){
								eventScheduler.scheduleEvent(new Date().getTime()+1000,'event-fee-recount',{entityId:fee.id},[],function(err,data){
									if (err){
										log.err(err);
										return;
									}
									log.debug('fees recount scheduled');
								});
						});
					}
				});
			}
		};
	}

	PaymentHandler.prototype.handle = function(event) {
		log.info('handle called',event,PaymentHandler.prototype.ctx);

		if ('event-payment-created' === event.eventType){
			this.handlePaymentChange(event);
		} else
		if ('event-payment-unpair'===event.eventType){
			this.handleUnpair(event);
		}else
		if ('event-payment-updated' === event.eventType){
				this.handlePaymentChange(event);
		} else{}

	};

	PaymentHandler.prototype.getType=function(){
		return ['event-payment-updated','event-payment-created','event-payment-unpair'];
	};

	module.exports = function( ctx) {
		return new PaymentHandler(ctx);
	};
}());
