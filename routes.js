"use strict";

const express = require("express");
const router = express.Router();

const accounts = require('./controllers/accounts.js');
const dashboard = require("./controllers/dashboard.js");
const about = require("./controllers/about.js");
const memberlist = require('./controllers/memberlist.js');
const trainerlist = require('./controllers/trainerlist.js');

router.get('/', accounts.index);
router.get('/login', accounts.login);
router.get('/signup', accounts.signup);
router.get('/logout', accounts.logout);
router.get('/settings', accounts.settings);
router.post('/register', accounts.register);
router.post('/authenticate', accounts.authenticate);
router.post('/updatemember', accounts.updateMember);


router.get("/about", about.index);

router.get('/settings', accounts.updateMember);

//router.get("/trainerlist", trainerlist.index);


router.get("/memberlist", memberlist.index);
router.get('/memberlist/:id', memberlist.index);
router.get('/memberlist/:id/deleteassessment/:assessmentid', memberlist.deleteAssessment);
router.post('/memberlist/:id/addassessment', memberlist.addAssessment);

router.get('/trainerlist/:id', trainerlist.index);
router.get('/dashboard', dashboard.index);
router.get('/trainerlist/deletememberlist/:id', trainerlist.deleteMemberlist);
router.get('/trainerlist/:id/deleteassessment/:assessmentid', trainerlist.deleteAssessment);
router.post('/trainerlist/:id/addcomment/:assessmentid', trainerlist.addComment);
//router.post('/dashboard/addmemberlist', dashboard.addMemberlist);

module.exports = router;
