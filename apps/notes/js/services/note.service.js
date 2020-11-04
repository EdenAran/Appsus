import { utilService } from '../../../../js/services/util-service.js'

export const noteService = {
    getBlankNoteInfo,
    saveNote,
    query,
    deleteNote,
    getNoteById
}

const STORAGE_KEY = 'notes'

var gBlankNote = [
    {
        type: 'noteTxt',
        isPinned: false,
        info: {
            title: 'My Note',
            txt: ''
        },
        style: {
            backgroundColor: '#fff5be'
        }
    },
    {
        type: 'noteImg',
        isPinned: false,
        info: {
            title: 'My Image',
            url: ''
        },
        style: {
            backgroundColor: '#fff5be'
        }
    },
    {
        type: 'noteTodos',
        isPinned: false,
        info: {
            title: 'My Todos',
            input: '',
            todos: [
                { txt: '', doneAt: null },
            ]
        },
        style: {
            backgroundColor: '#fff5be'
        }
    },
    {
        type: 'noteVideo',
        isPinned: false,
        info: {
            title: 'My Video',
            url: ''
        },
        style: {
            backgroundColor: '#fff5be'
        }
    },
]
var gNotes = _createNotes();

function getBlankNoteInfo(noteType) {
    const note = gBlankNote.find(note => note.type === noteType);
    note.id = utilService.makeId();
    return Promise.resolve(note);
}

function saveNote(note) {
    const noteIdx = gNotes.findIndex(currNote => currNote.id === note.id);
    if (noteIdx === -1) gNotes.unshift(note);
    else gNotes.splice(noteIdx, 1, note);
    utilService.saveToStorage(STORAGE_KEY, gNotes);
    return Promise.resolve();
}

function query() {
    return Promise.resolve(gNotes);
}

function getNoteById(id) {
    const note = gNotes.find(note => note.id === id)
    if (!note) return Promise.reject(`Couldn't find note with id ${id}`)
    return Promise.resolve(note)
}



function deleteNote(id) {
    const idx = gNotes.findIndex(note => note.id === id);
    if (idx !== -1) gNotes.splice(idx, 1);
    utilService.saveToStorage(STORAGE_KEY, gNotes);
    return Promise.resolve('Note deleted');
}

function _createNotes() {
    var notes = utilService.loadFromStorage(STORAGE_KEY);
    if (!notes) notes = [];
    return notes;
}

