'use strict';

import { utilService } from '../../../../js/services/util.service.js';

export const emailService = {
    query,
    removeEmail,
    removeSelected,
    saveEmail,
    updateProperty,
    updatePropertySelected,
    getNumOf,
    selectAll,
    getEmailById,
    findDirectory,
    getBlankEmail,
    setFilter,
    getFilter
};

var gEmails = _createInboxEmails();
var gSents = _createSentEmails();
var gFilter = {
    searchTerm: '',
    statusRead: 'all',
    starred: 'all'
};

function query(directory) {
    if (directory === 'inbox') return Promise.resolve(gEmails);
    else if (directory === 'sent') return Promise.resolve(gSents);
}

function removeEmail(emailId, directory) {
    let emails;
    let storageKey;
    if (directory === 'inbox') {
        emails = gEmails;
        storageKey = 'inboxDb';
    }
    else if (directory === 'sent') {
        emails = gSents;
        storageKey = 'sentsDb';
    }
    const idx = emails.findIndex(email => email.id === emailId);
    if (idx !== -1) emails.splice(idx, 1);
    utilService.saveToStorage(storageKey, emails);
    return Promise.resolve();
}

function removeSelected(directory) {
    let emails;
    let storageKey;
    if (directory === 'inbox') {
        emails = gEmails;
        storageKey = 'inboxDb';
    }
    else if (directory === 'sent') {
        emails = gSents;
        storageKey = 'sentsDb';
    }
    const filterEmails = emails.filter(email => email.isSelect);
    filterEmails.forEach(currEmail => {
        const idx = emails.findIndex(email => currEmail.id === email.id);
        if (idx !== -1) emails.splice(idx, 1);
    });
    utilService.saveToStorage(storageKey, emails);
    return Promise.resolve();
}

function saveEmail(email) {
    if (email) gSents.unshift(email);
    utilService.saveToStorage('sentsDb', gSents);
    return Promise.resolve(email);
}

function updatePropertySelected(property, directory) {
    const emails = (directory === 'inbox') ? gEmails : gSents;
    const emailsToUpdate = emails.filter(email => email.isSelect);
    emailsToUpdate.forEach(email => {
        email.isSelect = false;
        updateProperty(email.id, property, directory);
    });
    return Promise.resolve();
}

function updateProperty(emailId, property, directory) {
    let emails;
    let storageKey;
    if (directory === 'inbox') {
        emails = gEmails;
        storageKey = 'inboxDb';
    }
    else if (directory === 'sent') {
        emails = gSents;
        storageKey = 'sentsDb';
    }
    const idx = emails.findIndex(email => email.id === emailId);
    emails[idx][property] = !emails[idx][property];
    if (property !== 'isSelect' && property !== 'isExpand') utilService.saveToStorage(storageKey, emails);
    return Promise.resolve(emails[idx]);
}

function getNumOf(property, directory) {
    const emails = (directory === 'inbox') ? gEmails : gSents;
    const numOf = emails.reduce((acc, email) => {
        if (
            (property === 'unread' && !email.isRead) ||
            (property === 'select' && email.isSelect)
        ) acc++;
        return acc;
    }, 0);
    return Promise.resolve(numOf);
}

function selectAll(directory) {
    if (directory === 'inbox') {
        const isAllSelected = gEmails.every(email => email.isSelect);
        if (isAllSelected) gEmails.forEach(email => email.isSelect = false);
        else gEmails.forEach(email => email.isSelect = true);
        return Promise.resolve();
    } else if (directory === 'sent') {
        const isAllSelected = gSents.every(email => email.isSelect);
        if (isAllSelected) gSents.forEach(email => email.isSelect = false);
        else gSents.forEach(email => email.isSelect = true);
        return Promise.resolve();
    } else return Promise.reject();
}

function getEmailById(emailId) {
    const res = findDirectory(emailId);
    if (res.directory === 'inbox') return Promise.resolve(gEmails[res.idx]);
    if (res.directory === 'sent') return Promise.resolve(gSents[res.idx]);
    return Promise.reject('Email not found');
}

function findDirectory(emailId) {
    let idx = gEmails.findIndex(email => email.id === emailId);
    if (idx !== -1) return { directory: 'inbox', idx };
    idx = gSents.findIndex(email => email.id === emailId);
    if (idx !== -1) return { directory: 'sent', idx };
    return { directory: '', idx: -1 };
}

function setFilter(key, val) {
    gFilter[key] = val;
}

function getFilter() {
    return gFilter;
}

function getBlankEmail() {
    return _createSentEmail('', '');
}

function _createInboxEmails() {
    let emails = utilService.loadFromStorage('inboxDb');
    if (!emails || !emails.length) {
        emails = [];
        emails.push(_createInboxEmail('Ariella from the Lottery', 'You won the last lottery for 8,000,000', 'Congratulations! We are happy and excited to inform you that you won the last lottery in the amount of 8,000,000 NIS !! Payment by immediate check or bank transfer *, only after confirmation of winning by the control department upon submission of the form for the correctness of the participation card and verification of the winning.'));
        emails.push(_createInboxEmail('Harvard University', 'We are happy to inform you that you have been accepted into our ranks', 'Surprise, surprise! You have indeed been accepted and you are welcome to coordinate registration details with our nice secretary: Lori'));
        emails.push(_createInboxEmail('Assaf Margalit', 'You are champions !!', 'Having submitted such an impressive sprint, I am happy to inform you that you are invited to a job interview for Mister Bit'));
        emails.push(_createInboxEmail('Yaron Biton', 'I invite you to enter my YouTube channel', 'I regularly upload educational children\'s stories, which are told with great pleasure!'));
        emails.push(_createInboxEmail('PayPal', 'Unusual activity has been detected in your PayPal account', 'Important - Unusual activity has been detected in your PayPal account'));
        emails.push(_createInboxEmail('GA-DE Online', 'A benefit of once in November!', '40% discount on all our mascaras - for weekends only!'));
        emails.push(_createInboxEmail('HOT', 'Details of your monthly account', 'This message (including any attachments) is intended only for the use of the individual or entity to which it is addressed and may contain materials protected by copyright or information that is non-public, proprietary, privileged, confidential, and exempt from disclosure under applicable law or agreement. If you are not the intended recipient, you are hereby notified that any use, dissemination, distribution, or copying of this communication is strictly prohibited. If you have received this communication by error, notify the sender immediately and delete this message immediately. Thank you.'));
        emails[2].sendAt = 1604794677771;
        emails[3].sendAt = 1604794677771;
        utilService.saveToStorage('inboxDb', emails);
    }
    return emails;
}

function _createSentEmails() {
    let emails = utilService.loadFromStorage('sentsDb');
    if (!emails || !emails.length) {
        emails = [];
        emails.push(_createSentEmail('All of the family', 'Grandma\'s birthday - final date', 'This coming Thursday, at 6 p.m. pay attention! Everyone (including you, Michal) shows up at the appointed time with Dad and Mom. See you at celebrations!'));
        emails.push(_createSentEmail('Daniel', 'I found an old on-key disk, and you must see what was in it !!', 'There are things that will not be forgotten, and will always float one day ............ Next time you will learn what not to take pictures !!'));
        emails.push(_createSentEmail('Ortal the band', 'Audition for Big Brother', 'Attached is the video you requested to make. I would of course be very happy to be accepted, I am a fascinating person and I will be a very profitable tenant for you.'));
        emails[0].sendAt = 1604794677771;
        emails[1].sendAt = new Date(2020, 3, 26);
        emails[2].sendAt = new Date(2020, 1, 14);
        utilService.saveToStorage('sentsDb', emails);
    }
    return emails;
}

function _createInboxEmail(from = utilService.getName(), subject, body) {
    return {
        id: utilService.makeId(),
        from,
        subject,
        body,
        isRead: Math.random() > 0.5,
        isStar: Math.random() > 0.5,
        isSelect: false,
        isExpand: false,
        sendAt: utilService.makeRandomDate()
    }
}

function _createSentEmail(to = '', subject, body) {
    return {
        id: utilService.makeId(),
        to,
        subject,
        body,
        isRead: Math.random() > 0.5,
        isStar: Math.random() > 0.5,
        isSelect: false,
        isExpand: false,
        sendAt: Date.now()
    }
}