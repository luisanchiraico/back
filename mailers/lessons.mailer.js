const services = require('../services');
const config = require('../bin/config');
const sg = require('sendgrid')(config.environment.SEND_GRID.key);
const headers = {
    'cache-control': 'no-cache',
    'content-type': 'application/json',
    'authorization': 'Bearer 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'
};

async function scheduleSendEmail(userId, lessonRecordId, lang) {
    if (config.environment.SEND_GRID.active) {
        let dataReservationOfScheduleEmail = await services.lessons.dataScheduleEmail(userId, lessonRecordId);
        if (!!dataReservationOfScheduleEmail.length) {
            // for (var p of rows) {
                // services.mailer.getEmailAdmin(dataReservationOfScheduleEmail[0].establishmentId).then(function(resp) {
                //     let bcc = [];
                //     for (let i of resp) {
                //         bcc.push({ email: i.email })
                //     }
                    buildBodyAndSend(JSON.stringify(dataReservationOfScheduleEmail[0]), services.mailer.getLang(lang));
                    services.log.addMailerLogs(dataReservationOfScheduleEmail[0].userEstablishmentId, config.constants.TYPE_EMAIL.LESSON);
                    return true;
                    //support.addLogs(dataReservationOfScheduleEmail[0].userEstablishmentId, config.constants.TYPE_EMAIL.LESSON);
                // }).catch(function(err) {
                //     buildBodyAndSend(JSON.stringify(dataReservationOfScheduleEmail[0]), services.mailer.getLang(lang));
                //     return false;
                // })
            // }
            // return true;
        } else {
            return false;
        }
    }
}

async function lessonSendEmail (userId, lang) {
    if (config.environment.SEND_GRID.active) {
        let dataReservationEmail = await services.lessons.getDataOfReservationEmail(userId);
        if (!!dataReservationEmail.length) {
            // for (var p of rows) {
                // services.mailer.getEmailAdmin(rows[0].establishmentId).then(function(resp) {
                    // let bcc = [];
                    // for (let i of resp) {
                    //     bcc.push({ email: i.email })
                    // }
                    buildBodyAndSend(JSON.stringify(dataReservationEmail[0]), services.mailer.getLang(lang));
                    //support.addLogs(p.userEstablishmentId, config.constants.TYPE_EMAIL.LESSON);
                    services.log.addMailerLogs(dataReservationEmail[0].userEstablishmentId, config.constants.TYPE_EMAIL.LESSON);
                    return true;
                // }).catch(function(err) {
                //     console.error(err)
                //     buildBodyAndSend(JSON.stringify(p), services.mailer.getLang(lang));
                //     return false;
                // })
            // }
            // return true;
        } else {
            return false;
        }
    }
}

async function waitingListSendEmail (data) {
    if (config.environment.SEND_GRID.active) {
        let lang;
        const membershipId = data.membershipId;
        const lessonRecordId = data.lessonRecordId;
        let dataWaitingListEmail = await services.lessons.getDataOfWaitingListEmail(membershipId,lessonRecordId);
        if (!!dataWaitingListEmail.length) {
                    buildBodyAndSend(JSON.stringify(dataWaitingListEmail[0]), services.mailer.getLang(lang));
                    services.log.addMailerLogs(dataWaitingListEmail[0].userEstablishmentId, config.constants.AUTOMATIC_EMAIL_TYPE.WAITING_LIST);
                    return true;
        } else {
            return false;
        }
    }
}

async function onlinelessonSendEmail (userId,videoId , lang) {
    if (config.environment.SEND_GRID.active) {
        let dataReservationEmail = await services.lessons.getDataOfOnlineLessonEmail(userId,videoId)
        if (!!dataReservationEmail.length) {
            buildBodyAndSend(JSON.stringify(dataReservationEmail[0]), services.mailer.getLang(lang));
            services.log.addMailerLogs(dataReservationEmail[0].userEstablishmentId, config.constants.TYPE_EMAIL.LESSON);
            return true;
        } else {
            return false;
        }
    }
}

async function livelessonSendEmail (userId, liveId , lang) {
    if (config.environment.SEND_GRID.active) {
        let dataReservationEmail = await services.lessons.getDataOfLiveLessonEmail(userId,liveId)
        if (!!dataReservationEmail.length) {
            buildBodyAndSend(JSON.stringify(dataReservationEmail[0]), services.mailer.getLang(lang));
            services.log.addMailerLogs(dataReservationEmail[0].userEstablishmentId, config.constants.TYPE_EMAIL.LESSON);
            return true;
        } else {
            return false;
        }
    }
}

function buildBodyAndSend(bodyIn, lang) {
    bodyIn = JSON.parse(bodyIn);
    // services.mailer.getTemplateId(bodyIn.establishmentId, config.constants.TYPE_EMAIL.LESSON)
    //     .then(function(templateId) {
            var isTemplate = bodyIn.template;
            if (isTemplate == null) {
                console.error("Mensaje de Clase Reserva - Inactivo" + bodyIn.establishmentName);
            } else {
                services.mailer.addLogs(bodyIn.userEstablishmentId, config.constants.TYPE_EMAIL.LESSON);
                isTemplate = isTemplate.replace("$gym", bodyIn.establishmentName);
                isTemplate = isTemplate.replace("$nombre", bodyIn.fullName);
                isTemplate = isTemplate.replace("$plan", bodyIn.planName);
                isTemplate = isTemplate.replace("$precio", bodyIn.plansPrice + "");
                isTemplate = isTemplate.replace("$inicio", bodyIn.startDate);
                isTemplate = isTemplate.replace("$fin", bodyIn.endDate);
                isTemplate = isTemplate.replace("$disciplina", bodyIn.disciplineName);
                isTemplate = isTemplate.replace("$hora", bodyIn.hourLesson);
                isTemplate = isTemplate.replace("$fecha", bodyIn.dateLesson);

                var body = {
                    personalizations: [{
                        to: [{
                            email: bodyIn.email
                        }],
                        subject: lang.lang['CONFIRM_LESSON'],
                    }],
                    from: {
                        email: 'no-reply@fitcoconnect.com',
                        name: bodyIn.establishmentName
                    },
                    content: [{
                        type: 'text/html',
                        value: isTemplate
                    }],

                };

                var request = sg.emptyRequest({
                    method: 'POST',
                    path: 'https://api.sendgrid.com/v3/mail/send',
                    body: body,
                    headers: headers
                });

                // With callback
                sg.API(request, function(error, response) {
                    if (error) {
                        console.error(error.response.body);
                    }
                });

            }
        // })
        // .catch(function(err) {
        //     console.error(err);
        // })
}




module.exports = {
    scheduleSendEmail,
    lessonSendEmail,
    waitingListSendEmail,
    onlinelessonSendEmail,
    livelessonSendEmail
}