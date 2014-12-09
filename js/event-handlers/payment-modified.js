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


		this.handlePaymentChange=function (event){

				var eventScheduler = this.ctx.eventScheduler;
				var payment = event.entity;

				var paymentDao = new universalDaoModule.UniversalDao(
						this.ctx.mongoDriver,
						{collectionName: 'payments'}
				);
				var peopleDao = new universalDaoModule.UniversalDao(
						this.ctx.mongoDriver,
						{collectionName: 'people'}
				);




				if (payment.baseData.variableSymbol){

					//search for pair
					var qf=QueryFilter.create();
					var vsToSearch=payment.baseData.variableSymbol.substring(0,6)+'/'+payment.baseData.variableSymbol.substring(6);
					qf.addCriterium('baseData.bornNumber','eq',vsToSearch);
					peopleDao.find(qf,function(err,data){
						if (data.length==1){
							if (!payment.baseData.member || !payment.baseData.member.oid){
								payment.baseData.member={registry:'people',oid:data[0].id};
							}
							payment.baseData.status='Paired';

							eventScheduler.scheduleEvent(new Date().getTime()+1000,'event-fee-recount',{peopleId:data[0].id},[payment.id],function(err,data){
									if (err){
										log.err(err);
										return;
									}
									log.debug('fees recount scheduled');
								} );
						}
						else {
							payment.baseData.status='Unpaired';
							payment.baseData.member=null;
						}
						paymentDao.save(payment,function(err,data){
							log.debug('payemnt status updated');
						});

					});
				} else {

					if (payment.baseData.member && payment.baseData.member.oid){


						peopleDao.get(payment.baseData.member.oid,function(err,user){

							payment.baseData.clientName= user.baseData.name.v+' '+user.baseData.surName.v;
							payment.baseData.status='Paired';

							eventScheduler.scheduleEvent(new Date().getTime()+1000,'event-fee-recount',{peopleId:payment.baseData.member.oid},[payment.id],function(err,data){
									if (err){
										log.err(err);
										return;
									}
									log.debug('fees recount scheduled');
								} );
							paymentDao.save(payment,function(err,data){
								log.debug('payemnt status updated');
							});
						});
					}
				}
		};



	}

	PaymentHandler.prototype.handle = function(event) {
		log.info('handle called',event,PaymentHandler.prototype.ctx);

		if ('event-payment-created' === event.eventType){
			this.handlePaymentChange(event);
		} else

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
