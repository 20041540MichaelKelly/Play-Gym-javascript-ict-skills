'use strict';
//const dashboard = require ('./dashboard.js');
const logger = require('../utils/logger');
const uuid = require('uuid');
const memberstore = require('../models/members-store');
const trainers = require('../models/trainers');

const accounts = {

	index(request, response) {
		const viewData = {
			title: 'Login or Signup',
		};
		response.render('index', viewData);
	},

	login(request, response) {
		const viewData = {
			title: 'Login to the Service',
		};
		response.render('login', viewData);
	},

	logout(request, response) {
		response.cookie('memberlist', '');
		response.redirect('/');
	},

	signup(request, response) {
		const viewData = {
			title: 'Login to the Service',
		};
		response.render('signup', viewData);
	},

	settings(request, response) {
		const viewData = {
			title: 'settings Service',
		};
		response.render('settings', viewData);
	},

	register(request, response) {
		const member = {
			id: uuid(),
			name: request.body.name,
			gender: request.body.gender,
			email: request.body.email,
			password: request.body.password,
			address: request.body.address,
			height: request.body.height,
			startingWeight: request.body.startingWeight,
			assessments: [],
		};
		memberstore.addMemberlist(member);
		logger.info(`registering ${member.email}`);
		response.redirect('/login');
	},

	updateMember(request, response) {
		const loggedIn = accounts.getCurrentUser(request);
		//const member = loggedIn.name;

		loggedIn.name = request.body.name;
		loggedIn.gender = request.body.gender;
		loggedIn.password = request.body.password;
		loggedIn.address = request.body.address;
		loggedIn.height = request.body.height;
		loggedIn.startingWeight = request.body.startingWeight;

		memberstore.setName(loggedIn.id, loggedIn.name);

		memberstore.setGender(loggedIn.id, loggedIn.gender);
		memberstore.setPassword(loggedIn.id, loggedIn.password);
		memberstore.setAddress(loggedIn.id, loggedIn.address);
		memberstore.setHeight(loggedIn.id, loggedIn.height);
		memberstore.setStartingWeight(loggedIn.id, loggedIn.startingWeight);

		response.redirect('/memberlist/' + loggedIn.id);
	},

	authenticate(request, response) {

		const member = memberstore.getMemberByEmail(request.body.email);
		const trainer = trainers.getTrainerByEmail(request.body.email);
		const password = request.body.password;
		// const userList = user.getUserById(request.body.id);
		if (member && (member.password === (password))) {
			response.cookie('memberlist', member.email);

			//const memberlis= memberstore.getUserMemberlists(memberlistId)
			logger.info('logging in ' + member.email);
			response.redirect('/memberlist/' + member.id)
			//response.redirect('/memberlist/' + member.id )
		} else if (trainer && (trainer.password === (password))) {
			// if(trainer.email === 'marge@simpson.com' ||trainer.email === 'homer@simpson.com') {
			response.redirect('/dashboard')

		} else {
			response.redirect('/login');
		}
	},

	getCurrentUser(request) {
		const memberEmail = request.cookies.memberlist;
		return memberstore.getMemberByEmail(memberEmail);
	},


};

module.exports = accounts;