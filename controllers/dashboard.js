"use strict";

const uuid = require('uuid');

const accounts = require('./accounts.js');
const logger = require("../utils/logger");
const membersStore = require('../models/members-store');

const dashboard = {
	index(request, response) {
		logger.info("dashboard rendering");
		const memberlistId = request.params.id;
		const loggedInUser = membersStore.getMemberlist(memberlistId);
		//     const loggedInUser = accounts.getCurrentUser(request);
		const viewData = {
			name: 'Play-Gym Dashboard',
			memberlist: membersStore.getAllMemberLists(),

		};
		logger.info('about to render', membersStore.getAllMemberLists());
		response.render("dashboard", viewData);
	},


};

module.exports = dashboard;
