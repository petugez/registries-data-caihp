(function() {
	'use strict';

	var log = require(process.cwd() + '/build/server/logging.js').getLogger('handlers/RequisitionChangedHandler.js');
	var objectTools = require(process.cwd() + '/build/server/ObjectTools.js');
	var universalDaoModule = require(process.cwd() + '/build/server/UniversalDao.js');
	var dateUtils = require(process.cwd()+'/build/server/DateUtils.js').DateUtils;
	var QueryFilter = require(process.cwd()+'/build/server/QueryFilter.js');

	function RequisitionChangedHandler(ctx) {
		this.ctx=ctx;
		var self=this;

		var requisitionsDao = new universalDaoModule.UniversalDao(
			this.ctx.mongoDriver,
			{collectionName: 'requisitions'}
		);


		this.handleRequisitionCreated=function(event){

			var entity = event.entity;
			entity.baseData.setupDate=dateUtils.nowToReverse();
			entity.baseData.status='created';
			entity.baseData.applicant={registry:'people',oid:event.user.id};

			entity.baseData.assignedTo={registry:'people',oid:event.user.id};

			requisitionsDao.save(entity,function(err,data){
				if (err) {
					log.error(err);
					return;
				}
				log.debug('requisitions created: event handled');
			});

		};

		this.handleRequisitionModified=function(){
			var entity = event.entity;


		};
	}

	RequisitionChangedHandler.prototype.handle = function(event) {
		log.info('handle called',event,RequisitionChangedHandler.prototype.ctx);

		if ('event-requisition-created' === event.eventType){
			this.handleRequisitionCreated(event);
		}else if ('event-requisition-updated' === event.eventType){
			this.handleRequisitionModified(event);
		}
	};

	RequisitionChangedHandler.prototype.getType=function(){
		return ["event-requisition-created","event-requisition-updated"];
	};

	module.exports = function( ctx) {
		return new RequisitionChangedHandler(ctx );
	};
}());
