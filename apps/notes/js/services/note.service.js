import { utilService } from '../../../../js/services/util-service.js'

export const noteService = {
    getBlankNoteInfo,
    saveNote
}

const STORAGE_KEY = 'notes'

var gBlankNote = [
    {
        type: 'noteTxt',
        isPinned: false,
        info: {
            txt: ''
        },
        style: {
            backgroundColor: '#fff'
        }
    },
    {
        type: 'noteImg',
        isPinned: false,
        info: {
            title: '',
            url: ''
        },
        style: {
            backgroundColor: '#fff'
        }
    },
    {
        type: 'noteTodos',
        isPinned: false,
        info: {
            title: '',
            todos: [
                { txt: '', doneAt: null },
                { txt: '', doneAt: null }
            ]
        },
        style: {
            backgroundColor: '#fff'
        }
    },
    {
        type: 'noteVideo',
        isPinned: false,
        info: {
            title: '',
            url: ''
        },
        style: {
            backgroundColor: '#fff'
        }
    },
]
var gNotes = getNotes();

function getBlankNoteInfo(noteType) {
    console.log(noteType)
    return Promise.resolve(gBlankNote.find(note => note.type === noteType));
}

function saveNote(note) {
    gNotes.unshift(note);
    utilService.saveToStorage(STORAGE_KEY, gNotes);
}

function getNotes() {
    var notes = utilService.loadFromStorage(STORAGE_KEY);
    if (!notes) notes = [];
    return notes;
}