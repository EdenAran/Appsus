'use strict';

import { utilService } from '../../../../js/services/util-service.js';

export const emailService = {
    query,
    removeEmail,
    saveEmail,
    updateProperty,
    getNumOfUnread,
    getEmailById,
    getEmptyEmail
};

const gEmails = _createEmails();

function query() {
    return Promise.resolve(gEmails);
}

function removeEmail(emailId) {
    const idx = gEmails.findIndex(email => email.id === emailId);
    if (idx !== -1) gEmails.splice(idx, 1);
    utilService.saveToStorage('emailsDb', gEmails);
    return Promise.resolve();
}

function saveEmail(email) {
    const emailIdx = gEmails.findIndex(currEmail => currEmail.id === email.id);
    if (emailIdx === -1) gEmails.unshift(email);
    else gEmails.splice(emailIdx, 1, email);
    utilService.saveToStorage('emailsDb', gEmails);
    return Promise.resolve(email);
}

function updateProperty(emailId, property) {
    const idx = gEmails.findIndex(email => email.id === emailId);
    gEmails[idx][property] = !gEmails[idx][property];
    utilService.saveToStorage('emailsDb', gEmails);
    return Promise.resolve(gEmails[idx]);
}

function getNumOfUnread() {
    const numOfUnread = gEmails.reduce((acc, email) => {
        if (!email.isRead) acc++;
        return acc;
    }, 0);
    return Promise.resolve(numOfUnread);
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
        emails.push(_createEmail('aaa', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minima at nihil dolores, error eum sequi ad quasi consequuntur atque vitae nam corrupti, exercitationem repudiandae tempora perferendis excepturi nisi illum necessitatibus!'));
        emails.push(_createEmail('bbb', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minima at nihil dolores, error eum sequi ad quasi consequuntur atque vitae nam corrupti, exercitationem repudiandae tempora perferendis excepturi nisi illum necessitatibus!'));
        emails.push(_createEmail('ccc', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minima at nihil dolores, error eum sequi ad quasi consequuntur atque vitae nam corrupti, exercitationem repudiandae tempora perferendis excepturi nisi illum necessitatibus!'));
        emails.push(_createEmail('ddd', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minima at nihil dolores, error eum sequi ad quasi consequuntur atque vitae nam corrupti, exercitationem repudiandae tempora perferendis excepturi nisi illum necessitatibus!'));
        emails.push(_createEmail('eee', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minima at nihil dolores, error eum sequi ad quasi consequuntur atque vitae nam corrupti, exercitationem repudiandae tempora perferendis excepturi nisi illum necessitatibus!'));
        emails.push(_createEmail('fff', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minima at nihil dolores, error eum sequi ad quasi consequuntur atque vitae nam corrupti, exercitationem repudiandae tempora perferendis excepturi nisi illum necessitatibus!'));
        emails[emails.length - 1].sendAt = 1604527472959;
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
        sendAt: utilService.makeRandomDate()
    }
}