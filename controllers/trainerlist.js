'use strict';

const uuid = require('uuid');
const logger = require('../utils/logger');
const memberStore = require('../models/members-store');

const accounts = require('./accounts.js');

const trainerlist = {

	index(request, response) {

		const memberlistId = request.params.id;
		const loggedInUser = accounts.getCurrentUser(request);

		const viewData = {
			title: 'Trainerlist',
			trainerlist: memberStore.getMemberlist(memberlistId),
			bmi: memberStore.getBmi(memberlistId),
			weightClass: memberStore.getWeightClass(memberlistId),
			idealBodyWeight: memberStore.isIdealBodyWeight(memberlistId),
			date: memberStore.timestamp(),
			//comment: memberStore.editComment(memberlistId, request.body.comment),


		};
		// logger.info("BMI" + bmi);
		response.render('trainerlist', viewData);
	},

	deleteMemberlist(request, response) {
		const memberlistId = request.params.id;
		logger.debug(`Deleting Memberlist ${memberlistId}`);
		memberStore.removeMemberlist(memberlistId);
		response.redirect('/dashboard');
	},

	deleteAssessment(request, response) {
		const memberlistId = request.params.id;
		const assessmentId = request.params.assessmentid;
		logger.debug('Deleting Assessment ${assessmentId} from memberlist ${memberlistId}');
		memberStore.removeAssessment(memberlistId, assessmentId);
		response.redirect('/trainerlist/' + memberlistId);
	},

	addComment(request, response) {
		const memberlistId = request.params.id;
		const assessmentid = request.params.assessmentid;
		const comment = request.body.comment;
		memberStore.setComment(memberlistId, assessmentid, comment);
		response.redirect('/trainerlist/' + memberlistId);

	},

};


module.exports = trainerlist;