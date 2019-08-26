'use strict';
const logger = require('../utils/logger');
const _ = require('lodash');
const JsonStore = require('./json-store');

const trainers = {
	store: new JsonStore('./models/trainers.json', {
		trainerCollection: []
	}),
	collection: 'trainerCollection',

	getTrainerByEmail(email) {
		return this.store.findOneBy(this.collection, {
			email: email
		});
	},

};

module.exports = trainers;