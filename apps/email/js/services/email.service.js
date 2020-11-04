'use strict';

import { utilService } from '../../../../js/services/util-service.js';

export const emailService = {
    query,
    removeEmail,
    saveEmail,
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
        emails.push(_createEmail('aaa', 'aaa aaa aaa'));
        emails.push(_createEmail('bbb', 'bbb bbb bbb'));
        emails.push(_createEmail('ccc', 'ccc ccc ccc'));
        emails.push(_createEmail('ddd', 'ddd ddd ddd'));
        emails.push(_createEmail('eee', 'eee eee eee'));
        emails.push(_createEmail('fff', 'fff fff fff'));
        utilService.saveToStorage('emailsDb', emails);
    }
    return emails;
}

function _createEmail(subject, body) {
    return {
        id: utilService.makeId(),
        subject,
        body,
        isRead: Math.random() > 0.5,
        sendAt: utilService.makeRandomDate()
    }
}