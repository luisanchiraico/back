'use strict'

const express = require('express');
const api = express.Router();
const controller = require('../controllers/mailer.controller');

//LESSONS
api.post('/lessons/for-calendar', controller.sendEmailForLesson);
api.post('/lessons/for-schedule', controller.sendEmailForSchedule);
api.post('/lessons/for-waiting-list',controller.sendWaitingListMail);

//ONLINE LESSONS
api.post('/online-lessons/:userId/:videoId', controller.sendEmailForOnlineLesson);
api.post('/live-lessons/:userId/:liveId', controller.sendEmailForLiveLesson);
//SESSIONS
api.post('/sessions/all-sessions', controller.spendAllSessionsEmail);
api.post('/sessions/less-persent', controller.lessSessionsThatThePercentage);

module.exports = api;