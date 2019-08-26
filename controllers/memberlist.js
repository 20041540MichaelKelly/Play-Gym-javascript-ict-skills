'use strict';

const uuid = require('uuid');
const logger = require('../utils/logger');
const memberStore = require('../models/members-store');

const accounts = require('./accounts.js');
const color = "";
const memberlist = {

	index(request, response) {

		const memberlistId = request.params.id;
		const loggedInUser = accounts.getCurrentUser(request);

		const viewData = {
			title: 'Memberlist',
			memberlist: memberStore.getMemberlist(loggedInUser.id),
			bmi: memberStore.getBmi(loggedInUser.id),
			weightClass: memberStore.getWeightClass(loggedInUser.id),
			idealBodyWeight: memberStore.isIdealBodyWeight(loggedInUser.id),
			//getTrend: memberStore.getTrend( loggedInUser.id),
			// date: 3000, //memberStore.timestamp(),


		};
		// logger.info("BMI" + bmi);
		response.render('memberlist', viewData);
	},


	deleteAssessment(request, response) {
		const memberlistId = request.params.id;
		const assessmentId = request.params.assessmentid;
		logger.debug('Deleting Assessment ${assessmentId} from memberlist ${memberlistId}');
		memberStore.removeAssessment(memberlistId, assessmentId);
		response.redirect('/memberlist/' + memberlistId);
	},
	addAssessment(request, response) {
		const memberlistId = request.params.id;
		const memberlist = memberStore.getMemberlist(memberlistId);
		const newAssessment = {
			id: uuid(),
			weight: request.body.weight,
			chest: request.body.chest,
			thigh: request.body.thigh,
			upperArm: request.body.upperArm,
			waist: request.body.waist,
			hips: request.body.hips,
			trend: memberStore.getTrend(memberlistId, request.body.weight),
			date: memberStore.timestamp(),

		};
		logger.info(memberlistId);
		logger.info(newAssessment);
		memberStore.addAssessment(memberlistId, newAssessment);

		response.redirect('/memberlist/' + memberlistId);
	},


};


module.exports = memberlist;