'use strict'

const services = require('../services');
const mailerLesson = require('../mailers/lessons.mailer');
const mailerSession = require('../mailers/sessions.mailer');
const config = require('../bin/config');

function sendEmailForSchedule (req, res, next) {
    const userId = req.body.userId;
    const lessonRecordId = req.body.lessonRecordId;
    const lang = req.body.lang ? req.body.lang : 'es';
    mailerLesson.scheduleSendEmail(userId, lessonRecordId, lang).then(result => {
        res.status(200);
        return res.json({
            msg: 'GLOBAL.OK',
            title: 'GLOBAL.EXITO'
        });
    })
    .catch(err => {
        console.error(err)
        res.status(400);
        res.json({
            msg: 'GLOBAL.ERROR',
            title: 'GLOBAL.ERROR_TITULO'
        });
    })
}

function sendEmailForLesson (req, res, next) {
    const userId = req.body.userId;
    const lessonRecordId = req.body.lessonRecordId;
    const lang = req.body.lang || 'es';
    mailerLesson.lessonSendEmail(userId, lessonRecordId, lang).then(result => {
        res.status(200);
        return res.json({
            msg: 'GLOBAL.OK',
            title: 'GLOBAL.EXITO'
        });
    })
    .catch(err => {
        console.error(err)
        res.status(400);
        res.json({
            msg: 'GLOBAL.ERROR',
            title: 'GLOBAL.ERROR_TITULO'
        });
    })
}

function sendEmailForOnlineLesson(req,res){
    const { userId , videoId } = req.params;
    const lang = req.body.lang || 'es';
    if(!userId || !videoId ){
        return res.status(400).json({
            msg: 'GLOBAL.ERROR',
            title: 'GLOBAL.ERROR_TITULO'
        })
    }
    mailerLesson.onlinelessonSendEmail(userId,videoId,lang).then(result=>{
        res.status(200);
        return res.json({
            msg: 'GLOBAL.OK',
            title: 'GLOBAL.EXITO'
        });
    }).catch(err => {
        console.error(err)
        res.status(400);
        res.json({
            msg: 'GLOBAL.ERROR',
            title: 'GLOBAL.ERROR_TITULO'
        });
    })
}

function sendEmailForLiveLesson(req,res){
    const { userId , liveId } = req.params;
    const lang = req.body.lang || 'es';
    if(!userId || !liveId ){
        return res.status(400).json({
            msg: 'GLOBAL.ERROR',
            title: 'GLOBAL.ERROR_TITULO'
        })
    }
    mailerLesson.livelessonSendEmail(userId,liveId,lang).then(result=>{
        res.status(200);
        return res.json({
            msg: 'GLOBAL.OK',
            title: 'GLOBAL.EXITO'
        });
    }).catch(err => {
        console.error(err)
        res.status(400);
        res.json({
            msg: 'GLOBAL.ERROR',
            title: 'GLOBAL.ERROR_TITULO'
        });
    })
}

function spendAllSessionsEmail (req, res, next) {
    mailerSession.spendAllSessionsEmail(req.body).then(result => {
        res.status(200);
        return res.json({
            msg: 'GLOBAL.OK',
            title: 'GLOBAL.EXITO'
        });
    })
    .catch(err => {
        res.status(400);
        res.json({
            msg: 'GLOBAL.ERROR',
            title: 'GLOBAL.ERROR_TITULO'
        });
    })
}

function lessSessionsThatThePercentage (req, res, next) {
    mailerSession.lessSessionsThatThePercentage(req.body).then(result => {
        res.status(200);
        return res.json({
            msg: 'GLOBAL.OK',
            title: 'GLOBAL.EXITO'
        });
    })
    .catch(err => {
        res.status(400);
        res.json({
            msg: 'GLOBAL.ERROR',
            title: 'GLOBAL.ERROR_TITULO'
        });
    })
}

function sendWaitingListMail (req, res, next) {
    mailerLesson.waitingListSendEmail(req.body).then(result => {
        res.status(200);
        return res.json({
            msg: 'GLOBAL.OK',
            title: 'GLOBAL.EXITO'
        });
    })
    .catch(err => {
        console.error(err)
        res.status(400);
        res.json({
            msg: 'GLOBAL.ERROR',
            title: 'GLOBAL.ERROR_TITULO'
        });
    })
}

module.exports = {
    sendEmailForSchedule,
    sendEmailForLesson,
    spendAllSessionsEmail,
    lessSessionsThatThePercentage,
    sendWaitingListMail,
    sendEmailForOnlineLesson,
    sendEmailForLiveLesson
}