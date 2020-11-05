'use strict';

import { utilService } from '../../../../js/services/util-service.js';

export const emailService = {
    query,
    removeEmail,
    removeSelected,
    saveEmail,
    updateProperty,
    getNumOf,
    getEmailById,
    getEmptyEmail
};

var gEmails = _createEmails();
var gSents = [];

function query() {
    return Promise.resolve(gEmails);
}

function fetSends() {
    return Promise.resolve(gSents);
}

function removeEmail(emailId) {
    const idx = gEmails.findIndex(email => email.id === emailId);
    if (idx !== -1) gEmails.splice(idx, 1);
    utilService.saveToStorage('emailsDb', gEmails);
    return Promise.resolve();
}

function removeSelected() {
    const emails = gEmails.filter(email => email.isSelect);
    emails.forEach(currEmail => {
        const idx = gEmails.findIndex(email => currEmail.id === email.id);
        if (idx !== -1) gEmails.splice(idx, 1);
    });
    utilService.saveToStorage('emailsDb', gEmails);
    return Promise.resolve();
}

function saveEmail(email) {
    gSents.unshift(email);
    utilService.saveToStorage('sentsDb', gSents);
    return Promise.resolve(email);
}

function updateProperty(emailId, property) {
    const idx = gEmails.findIndex(email => email.id === emailId);
    gEmails[idx][property] = !gEmails[idx][property];
    if (property !== 'isSelect' && property !== 'isExpand') utilService.saveToStorage('emailsDb', gEmails);
    return Promise.resolve(gEmails[idx]);
}

function getNumOf(property) {
    const numOf = gEmails.reduce((acc, email) => {
        if (
            (property === 'unread' && !email.isRead) ||
            (property === 'select' && email.isSelect)
        ) acc++;
        return acc;
    }, 0);
    return Promise.resolve(numOf);
}

function getEmailById(emailId) {
    return Promise.resolve(gEmails.find(email => email.id === emailId));
}

function getEmptyEmail() {
    return _createEmail('', '');
}

function _createEmails() {
    let emails = utilService.loadFromStorage('emailsDb');
    if (!emails || !emails.length) {
        emails = [];
        emails.push(_createEmail('aaa', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minima at nihil dolores, error eum sequi ad quasi consequuntur atque vitae nam corrupti, exercitationem repudiandae tempora perferendis excepturi nisi illum necessitatibus! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minima at nihil dolores, error eum sequi ad quasi consequuntur atque vitae nam corrupti, exercitationem repudiandae tempora perferendis excepturi nisi illum necessitatibus!'));
        emails.push(_createEmail('bbb', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minima at nihil dolores, error eum sequi ad quasi consequuntur atque vitae nam corrupti, exercitationem repudiandae tempora perferendis excepturi nisi illum necessitatibus!'));
        emails.push(_createEmail('ccc', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minima at nihil dolores, error eum sequi ad quasi consequuntur atque vitae nam corrupti, exercitationem repudiandae tempora perferendis excepturi nisi illum necessitatibus!'));
        emails.push(_createEmail('ddd', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minima at nihil dolores, error eum sequi ad quasi consequuntur atque vitae nam corrupti, exercitationem repudiandae tempora perferendis excepturi nisi illum necessitatibus!'));
        emails.push(_createEmail('eee', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minima at nihil dolores, error eum sequi ad quasi consequuntur atque vitae nam corrupti, exercitationem repudiandae tempora perferendis excepturi nisi illum necessitatibus!'));
        emails.push(_createEmail('fff', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minima at nihil dolores, error eum sequi ad quasi consequuntur atque vitae nam corrupti, exercitationem repudiandae tempora perferendis excepturi nisi illum necessitatibus!'));
        emails.push(_createEmail('ggg', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minima at nihil dolores, error eum sequi ad quasi consequuntur atque vitae nam corrupti, exercitationem repudiandae tempora perferendis excepturi nisi illum necessitatibus!'));
        emails.push(_createEmail('hhh', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minima at nihil dolores, error eum sequi ad quasi consequuntur atque vitae nam corrupti, exercitationem repudiandae tempora perferendis excepturi nisi illum necessitatibus!'));
        emails.push(_createEmail('iii', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minima at nihil dolores, error eum sequi ad quasi consequuntur atque vitae nam corrupti, exercitationem repudiandae tempora perferendis excepturi nisi illum necessitatibus!'));
        emails.push(_createEmail('jjj', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minima at nihil dolores, error eum sequi ad quasi consequuntur atque vitae nam corrupti, exercitationem repudiandae tempora perferendis excepturi nisi illum necessitatibus!'));
        emails.push(_createEmail('kkk', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minima at nihil dolores, error eum sequi ad quasi consequuntur atque vitae nam corrupti, exercitationem repudiandae tempora perferendis excepturi nisi illum necessitatibus!'));
        emails[2].sendAt = 1604527472959;
        utilService.saveToStorage('emailsDb', emails);
    }
    return emails;
}

function _createEmail(subject, body) {
    return {
        id: utilService.makeId(),
        from: utilService.getName(),
        subject,
        body,
        isRead: Math.random() > 0.5,
        isStar: Math.random() > 0.5,
        isSelect: false,
        isExpand: false,
        sendAt: utilService.makeRandomDate()
    }
}