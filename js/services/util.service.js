'use strict';

export const utilService = {
    makeId,
    makeLorem,
    makeRandomDate,
    getName,
    getRandomIntInclusive,
    saveToStorage,
    loadFromStorage,
    deepCopy
};

function makeId(length = 11) {
    let txt = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return txt;
}

function makeLorem(size = 20) {
    const words = ['The sky', 'above', 'the port', 'was', 'the color of television', 'tuned', 'to', 'a dead channel', 'All', 'this happened', 'more or less', 'I', 'had', 'the story', 'bit by bit', 'from various people', 'and', 'as generally', 'happens', 'in such cases', 'each time', 'it', 'was', 'a different story', 'It', 'was', 'a pleasure', 'to', 'burn'];
    let txt = '';
    while (size > 0) {
        size--;
        txt += words[Math.floor(Math.random() * words.length)] + ' ';
    }
    return txt;
}

function makeRandomDate() {
    const start = new Date(2020, 0, 1);
    const end = new Date();
    return (new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()))).getTime();
}

function getName() {
    const names = ['Bonnie Joyner', 'Vicky Kaspar', 'Dung Bert', 'Kingi Lenz', 'Kerrissa Burkhardt', 'Mairan Erica', 'Gautam Bradley', 'Mitchell Osborne', 'Rene Mergel', 'Jayashree Najanick'];
    return names[getRandomIntInclusive(0, 9)];
}

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function saveToStorage(key, val) {
    val.forEach(val => {if(val.type ==='noteMap') val.info.map = null})
    localStorage.setItem(key, JSON.stringify(val));
}

function loadFromStorage(key) {
    const val = localStorage.getItem(key);
    return JSON.parse(val);
}

function deepCopy(inObject) {
    let outObject, value, key;
    if (typeof inObject !== "object" || inObject === null) return inObject;
    outObject = Array.isArray(inObject) ? [] : {};
    for (key in inObject) {
        value = inObject[key];
        outObject[key] = deepCopy(value);
    }
    return outObject;
}
