(function() {
	'use strict';

	var log = require(process.cwd() + '/build/server/logging.js').getLogger('handlers/PlayerChangedHandler.js');
	var objectTools = require(process.cwd() + '/build/server/ObjectTools.js');
	var universalDaoModule = require(process.cwd() + '/build/server/UniversalDao.js');
	var dateUtils = require(process.cwd()+'/build/server/DateUtils.js').DateUtils;
	var QueryFilter = require(process.cwd()+'/build/server/QueryFilter.js');

	function PlayerChangedHandler(ctx) {
		this.ctx=ctx;
		var self=this;

		this.handleFeeRecount=function(event){
			var peopleDao = new universalDaoModule.UniversalDao(
				this.ctx.mongoDriver,
				{collectionName: 'people'}
			);
			peopleDao.get(event.id,function(err,data){
					self.handlePlayerChange({entity:data},true);
			});
		};
		this.handlePlayerChange=function(event,force){

			var entity = event.entity;

			var peopleDao = new universalDaoModule.UniversalDao(
				this.ctx.mongoDriver,
				{collectionName: 'people'}
			);

			var organizationsDao = new universalDaoModule.UniversalDao(
				this.ctx.mongoDriver,
				{collectionName: 'organizations'}
			);

			var eventScheduler = this.ctx.eventScheduler;

			eventScheduler.unscheduleEvents(entity.id,"event-player-recount-fees",function(err,data) {
				if (entity.hockeyPlayerInfo && entity.hockeyPlayerInfo.isActivePlayer ){
					if (entity.hockeyPlayerInfo.clubName){
						if (!entity.membershipFeeInfo){
							entity.membershipFeeInfo={};
						}
						if (!entity.membershipFeeInfo.paymentFrequency){
							entity.membershipFeeInfo.paymentFrequency='12xročne';
						}

						if (entity.baseData.birthDate){
							organizationsDao.get(entity.hockeyPlayerInfo.clubName.oid,function(err,org){
								var refDate=new Date();
									refDate.setMonth(8);//september
									refDate.setDate(1);
								var age=dateUtils.ageOnDate(refDate,dateUtils.reverseToDate(entity.baseData.birthDate));
								if ('Extraliga'==org.baseData.competitionCategory){
									var willSave=false;
									if (!entity.membershipFeeInfo.membershipFee || force ){
										willSave=true;
									}
									if (age<24){
										entity.membershipFeeInfo.membershipFee=6000;
										entity.membershipFeeInfo.membershipType="Extraliga do 23r.";
										// scheduled on next years
										if (!force){
											eventScheduler.scheduleEvent( new Date((refDate.getFullYear()+24-age),8,1).getTime(),'event-player-recount-fee-profile',{id:entity.id},[entity.id],function(err,data){
												if (err){
													log.err(err);
													return;
												}
												log.debug('Scheduled fee profile recount',entity.id);
											} );
										}
									} else {
										entity.membershipFeeInfo.membershipFee=9600;
										entity.membershipFeeInfo.membershipType="Extraliga nad 23r.";
									}
									if (willSave){
										peopleDao.save(entity,function(err,data){
											if (err){
												log.error(err);
											}
											log.info('Player fee profile updated ', entity.id );
										});
									}
								}
							});
						}



					}
				}
			});
		};

	}


	PlayerChangedHandler.prototype.handle = function(event) {
		log.info('handle called',event,PlayerChangedHandler.prototype.ctx);

		if ('event-player-created' === event.eventType){
			this.handlePlayerChange(event);
		}else if ('event-player-updated' === event.eventType){
			this.handlePlayerChange(event);
		}else if ('event-player-recount-fee-profile' === event.eventType){
			this.handleFeeRecount(event);
		}
	};

	PlayerChangedHandler.prototype.getType=function(){
		return ['event-player-created','event-player-updated','event-player-recount-fee-profile'];
	};

	module.exports = function( ctx) {
		return new PlayerChangedHandler(ctx );
	};
}());
