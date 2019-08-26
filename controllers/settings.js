"use strict";

const logger = require("../utils/logger");


const settings = {
	index(request, response) {
		logger.info("about rendering");
		const viewData = {
			title: "Settings"
		};
		response.render('settings', viewData);
	}
};

module.exports = settings;