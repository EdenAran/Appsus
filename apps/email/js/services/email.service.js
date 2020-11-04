'use strict';

import { utilService } from '../../../../js/services/util-service.js';

export const emailService = {
    query,
    removeEmail,
    saveEmail,
    getNumOfRead,
    getEmailById
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

function getNumOfRead() {
    const numOfRead = gEmails.reduce((acc, email) => {
        if (email.isRead) acc++;
        return acc;
    }, 0);
    return Promise.resolve(numOfRead);
}

function getEmailById(emailId) {
    return Promise.resolve(gEmails.find(email => email.id === emailId));
}

function _createEmails() {
    let emails = utilService.loadFromStorage('emailsDb');
    if (!emails || !emails.length) {
        emails = [];
        emails.push(_createEmail('', ''));
        utilService.saveToStorage('emailsDb', emails);
    }
    return emails;
}

function _createEmail(subject, body) {
    return {
        subject,
        body,
        isRead: Math.random() > 0.5,
        sendAt: utilService.makeRandomDate()
    }
}