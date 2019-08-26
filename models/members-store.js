'use strict';
const logger = require('../utils/logger');
const _ = require('lodash');
const JsonStore = require('./json-store');

const membersStore = {

	store: new JsonStore('./models/members-store.json', {
		memberCollection: []
	}),
	collection: 'memberCollection',

	getAllMemberLists() {
		return this.store.findAll(this.collection);
	},

	removeAssessment(id, assessmentId) {
		const memberassessments = this.getMemberlist(id);
		const assessments = memberassessments.assessments;
		_.remove(assessments, {
			id: assessmentId
		});
		this.store.save();
	},

	getMemberByEmail(email) {
		return this.store.findOneBy(this.collection, {
			email: email
		});
	},
	getMemberById(id) {
		return this.store.findOneBy(this.collection, {
			id: id
		});
	},

	getHeight(id) {
		return this.store.findOneBy(this.collection, {
			height: height
		});
	},

	getStartingWeight(startingWeight) {
		return this.store.findOneBy(this.collection, {
			startingWeight: startingWeight
		});
	},

	getWeight(Weight) {
		return this.store.findOneBy(this.collection, {
			weight: weight
		});
	},


	getBmi(id) {
		const memberassessment = this.getMemberlist(id);
		// const assessment = _.find()(memberassessment.assessments, { id: id});
		const assess = memberassessment.assessments;
		//const assessm =assess.slice(-1).pop();

		logger.info("BMI" + assess);
		for (let i = 0; i < assess.length; i++) {
			const sheight = memberassessment.height;
			//slice(-1).pop()
			const sweight = assess[assess.length - 1].weight;

			const bmiVal = sweight / (sheight * sheight);
			const roundOff = Math.round(bmiVal * 100.0) / 100.0;
			const bmi = roundOff;
			return bmi;
		}

	},

	getWeightClass(id) {
		const bmi = this.getBmi(id);
		if (bmi < 18.5) {
			const weightClass = "UnderWeight";
			return weightClass;

		} else if (bmi >= 18.5 && bmi < 24.9) {
			const weightClass = "Normal Weight";
			return weightClass;
		} else if (bmi >= 25 && bmi < 29.9) {
			const weightClass = "OverWeight";
			return weightClass;
		} else {
			const weightClass = "Obese";
			return weightClass;
		}
	},

	isIdealBodyWeight(id) {
		const member = this.getMemberlist(id);
		const fiveFeet = 1.2;

		const assess = member.assessments;
		const mweight = 50 + 2.3 * (member.height - fiveFeet);
		const fweight = 45 + 2.3 * (member.height - fiveFeet);
		for (let i = 0; i < assess.length; i++) {
			if (member.gender === ("M")) {
				mweight;

			} else {
				fweight;
			}


			if (mweight > assess[assess.length - 1].weight || fweight > assess[assess.length - 1].weight) {
				const c = "green thumbs up icon";
				return c;

			} else {
				const c = "red thumbs down icon";
				return c;
			}
		}


	},


	addAssessment(id, assessment) {
		const memberassessment = this.getMemberlist(id);

		logger.info(memberassessment);
		//logger.info(assessments);
		memberassessment.assessments.push(assessment);
		//this.getTrend(memberassessment, assessment.weight);
		this.store.save();

	},


	getMemberlist(id) {
		return this.store.findOneBy(this.collection, {
			id: id
		});
	},


	removeMemberlist(id) {
		const memberlist = this.getMemberlist(id);
		this.store.remove(this.collection, memberlist);
		this.store.save();
	},

	getPassword(password) {
		return this.store.findOneBy(this.collection, {
			password: password
		});
	},


	addMemberlist(memberlist) {

		this.store.add(this.collection, memberlist);
		this.store.save();
	},

	setName(id, name) {
		const member = this.getMemberlist(id);
		this.store.add(member.name = name);
		this.store.save();
	},

	setGender(id, gender) {
		const member = this.getMemberlist(id);
		this.store.add(member.gender = gender);
		this.store.save();
	},


	setPassword(id, password) {
		const member = this.getMemberlist(id);
		this.store.add(member.password = password);
		this.store.save();
	},

	setTrend(id, trend) {
		const member = this.getMemberlist(id);
		this.store.add(member.password = password);
		this.store.save();
	},

	setAddress(id, address) {
		const member = this.getMemberlist(id);
		this.store.add(member.address = address);
		this.store.save();
	},

	setHeight(id, height) {
		const member = this.getMemberlist(id);
		this.store.add(member.height = height);
		this.store.save();
	},

	setStartingWeight(id, startingWeight) {
		const member = this.getMemberlist(id);
		this.store.add(member.startingWeight = startingWeight);
		this.store.save();
	},

	// Helper


	//   var i = 1;
	getTrend(id, weight) {
		const memberassessment = this.getMemberlist(id);
		const assess = memberassessment.assessments;
		if (assess.length >= 1) {
			for (let i = assess.length; i <= assess.length; i++) {

				if (assess[i - 1].weight > weight) {
					let color = "ui green tag label";
					return color;
				} else {
					let color = "ui red tag label";
					return color;
				}

			}
		}

	},

	timestamp() {
		var now = new Date();
		return ((now.getMonth() + 1) + '/' + (now.getDate()) + '/' + now.getFullYear() + " " + now.getHours() + ':' +
			((now.getMinutes() < 10) ? ("0" + now.getMinutes()) : (now.getMinutes())) + ':' + ((now.getSeconds() < 10) ? ("0" + now
				.getSeconds()) : (now.getSeconds())));
	},

	getAssessment(id) {
		return this.store.findyOneBy(this.collection, {
			id: id
		});
	},

	setComment(id, assessmentId, comment) {
		const members = this.getMemberlist(id);
		//const assess = member.assessments;
		const member = _.find(members.assessments, {
			id: assessmentId
		});
		//const assess = member.assessments;

		this.store.add(member.comment = comment);
		this.store.save();

	},


};


module.exports = membersStore;