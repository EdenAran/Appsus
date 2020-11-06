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
        emails.push(_createInboxEmail('aaa', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minima at nihil dolores, error eum sequi ad quasi consequuntur atque vitae nam corrupti, exercitationem repudiandae tempora perferendis excepturi nisi illum necessitatibus! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minima at nihil dolores, error eum sequi ad quasi consequuntur atque vitae nam corrupti, exercitationem repudiandae tempora perferendis excepturi nisi illum necessitatibus!'));
        emails.push(_createInboxEmail('bbb', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minima at nihil dolores, error eum sequi ad quasi consequuntur atque vitae nam corrupti, exercitationem repudiandae tempora perferendis excepturi nisi illum necessitatibus!'));
        emails.push(_createInboxEmail('ccc', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minima at nihil dolores, error eum sequi ad quasi consequuntur atque vitae nam corrupti, exercitationem repudiandae tempora perferendis excepturi nisi illum necessitatibus!'));
        emails.push(_createInboxEmail('ddd', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minima at nihil dolores, error eum sequi ad quasi consequuntur atque vitae nam corrupti, exercitationem repudiandae tempora perferendis excepturi nisi illum necessitatibus!'));
        emails.push(_createInboxEmail('eee', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minima at nihil dolores, error eum sequi ad quasi consequuntur atque vitae nam corrupti, exercitationem repudiandae tempora perferendis excepturi nisi illum necessitatibus!'));
        emails.push(_createInboxEmail('fff', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minima at nihil dolores, error eum sequi ad quasi consequuntur atque vitae nam corrupti, exercitationem repudiandae tempora perferendis excepturi nisi illum necessitatibus!'));
        emails.push(_createInboxEmail('ggg', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minima at nihil dolores, error eum sequi ad quasi consequuntur atque vitae nam corrupti, exercitationem repudiandae tempora perferendis excepturi nisi illum necessitatibus!'));
        emails.push(_createInboxEmail('hhh', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minima at nihil dolores, error eum sequi ad quasi consequuntur atque vitae nam corrupti, exercitationem repudiandae tempora perferendis excepturi nisi illum necessitatibus!'));
        emails.push(_createInboxEmail('iii', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minima at nihil dolores, error eum sequi ad quasi consequuntur atque vitae nam corrupti, exercitationem repudiandae tempora perferendis excepturi nisi illum necessitatibus!'));
        emails.push(_createInboxEmail('jjj', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minima at nihil dolores, error eum sequi ad quasi consequuntur atque vitae nam corrupti, exercitationem repudiandae tempora perferendis excepturi nisi illum necessitatibus!'));
        emails.push(_createInboxEmail('kkk', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minima at nihil dolores, error eum sequi ad quasi consequuntur atque vitae nam corrupti, exercitationem repudiandae tempora perferendis excepturi nisi illum necessitatibus!'));
        emails[2].sendAt = 1604621303560;
        utilService.saveToStorage('inboxDb', emails);
    }
    return emails;
}

function _createSentEmails() {
    let emails = utilService.loadFromStorage('sentsDb');
    if (!emails || !emails.length) {
        emails = [];
        emails.push(_createSentEmail('aaa', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minima at nihil dolores, error eum sequi ad quasi consequuntur atque vitae nam corrupti, exercitationem repudiandae tempora perferendis excepturi nisi illum necessitatibus! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minima at nihil dolores, error eum sequi ad quasi consequuntur atque vitae nam corrupti, exercitationem repudiandae tempora perferendis excepturi nisi illum necessitatibus!'));
        emails.push(_createSentEmail('bbb', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minima at nihil dolores, error eum sequi ad quasi consequuntur atque vitae nam corrupti, exercitationem repudiandae tempora perferendis excepturi nisi illum necessitatibus!'));
        emails.push(_createSentEmail('ccc', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minima at nihil dolores, error eum sequi ad quasi consequuntur atque vitae nam corrupti, exercitationem repudiandae tempora perferendis excepturi nisi illum necessitatibus!'));
        emails.push(_createSentEmail('ddd', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minima at nihil dolores, error eum sequi ad quasi consequuntur atque vitae nam corrupti, exercitationem repudiandae tempora perferendis excepturi nisi illum necessitatibus!'));
        emails.push(_createSentEmail('kkk', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minima at nihil dolores, error eum sequi ad quasi consequuntur atque vitae nam corrupti, exercitationem repudiandae tempora perferendis excepturi nisi illum necessitatibus!'));
        emails[2].sendAt = 1604527472959;
        utilService.saveToStorage('sentsDb', emails);
    }
    return emails;
}

function _createInboxEmail(subject, body) {
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

function _createSentEmail(subject, body) {
    return {
        id: utilService.makeId(),
        to: '',
        subject,
        body,
        isRead: Math.random() > 0.5,
        isStar: Math.random() > 0.5,
        isSelect: false,
        isExpand: false,
        sendAt: Date.now()
    }
}