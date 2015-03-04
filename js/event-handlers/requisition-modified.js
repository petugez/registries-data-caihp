(function() {
	'use strict';

	var log = require(process.cwd() + '/build/server/logging.js').getLogger('handlers/RequisitionChangedHandler.js');
	var objectTools = require(process.cwd() + '/build/server/ObjectTools.js');
	var universalDaoModule = require(process.cwd() + '/build/server/UniversalDao.js');
	var dateUtils = require(process.cwd()+'/build/server/DateUtils.js').DateUtils;
	var QueryFilter = require(process.cwd()+'/build/server/QueryFilter.js');

	var nodemailer = module.parent.require('nodemailer');
	var renderModule =  module.parent.require('./renderService.js');
	var transport = nodemailer.createTransport('Sendmail');

	function RequisitionChangedHandler(ctx) {
		this.ctx=ctx;
		var self=this;
		var renderService = new renderModule.RenderService();

		var requisitionsDao = new universalDaoModule.UniversalDao(
			this.ctx.mongoDriver,
			{collectionName: 'requisitions'}
		);

		var userDao = new universalDaoModule.UniversalDao(
			this.ctx.mongoDriver,
			{collectionName: 'people'}
		);

		this.handleRequisitionCreated=function(event){

			var entity = event.entity;
			var solverAddress=this.ctx.config.mails.requisitionSolverAddress;

			entity.baseData.setupDate=dateUtils.nowToReverse();
			entity.baseData.status='created';
			entity.baseData.applicant={registry:'people',oid:event.user.id};


				var qf=QueryFilter.create();
				qf.addCriterium("systemCredentials.login.email","eq",solverAddress);

				userDao.find(qf, function(err, data) {
					if (err){
						log.error(err);
						return;
					}

					// assign to and send mail.
					if (data.length==1){
						var solver=data[0];
						entity.baseData.assignedTo={registry:'people',oid:solver.id};
						self.sendRequisitionCreated(solverAddress,self.ctx.config.webserverPublicUrl,event.user.baseData.name+' '+event.user.baseData.surName,entity.baseData.subject,self.ctx.config.serviceUrl+'/requisitions/'+entity.id);

					}

					requisitionsDao.save(entity,function(err,data){
						if (err) {
							log.error(err);
							return;
						}
						log.debug('requisitions created: event handled');
					});

				});

		};


		this.handleRequisitionModified=function(event){

			var entity = event.entity;
			// var solverAddress=this.ctx.config.mails.requisitionSolverAddress;

			entity.baseData.applicant={registry:'people',oid:event.user.id};
			var solverAddress=self.ctx.config.mails.requisitionSolverAddress;


				var qf=QueryFilter.create();
				qf.addCriterium("systemCredentials.login.email","eq",solverAddress);

				userDao.find(qf, function(err, data) {
					if (err){
						log.error(err);
						return;
					}

					// assign to and send mail.
					if (data.length==1){
						var solver=data[0];
						entity.baseData.assignedTo={registry:'people',oid:data.id};
						self.sendRequisitionModified(solverAddress,self.ctx.config.webserverPublicUrl,event.user.baseData.name+' '+event.user.baseData.surName,entity.baseData.subject,self.ctx.config.serviceUrl+'/requisitions/'+entity.id);
						userDao.get(entity.baseData.applicant.oid,function(err,applicant){
							if (err){
								log.error(err);
								return;
							}
							self.sendRequisitionModified(applicant.systemCredentials.login.email,self.ctx.config.webserverPublicUrl,event.user.baseData.name+' '+event.user.baseData.surName,entity.baseData.subject,self.ctx.config.serviceUrl+'/requisitions/'+entity.id);
						});
					}
				});

		}


		this.sendRequisitionCreated=function(email,serviceUrl,applicant,subject,requisitionUri){

			var mailOptions = {
				from : 'websupport@unionsoft.sk',
				to : email,
				subject : '['+serviceUrl+'] Nová žiadosť',
				html : renderService.render(renderModule.templates.REQUISITION_CREATED_HTML,{applicant:applicant,subject:subject,serviceUrl:serviceUrl,requisitionUri:requisitionUri})
			};

			log.verbose('Sending mail ', mailOptions);

			transport.sendMail(mailOptions);


		};
		this.sendRequisitionModified=function(email,serviceUrl,modifier,subject,requisitionUri){

			var mailOptions = {
				from : 'websupport@unionsoft.sk',
				to : email,
				subject : '['+serviceUrl+'] Upravená žiadosť',
				html : renderService.render(renderModule.templates.REQUISITION_UPDATED_HTML,{modifier:modifier,subject:subject,serviceUrl:serviceUrl,requisitionUri:requisitionUri})
			};

			log.verbose('Sending mail ', mailOptions);

			transport.sendMail(mailOptions);


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
