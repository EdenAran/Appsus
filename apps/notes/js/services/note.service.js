import { utilService } from '../../../../js/services/util-service.js'

export const noteService = {
    getBlankNoteInfo,
    saveNote,
    getNotes
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
            title: 'My Image',
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
            title: 'My Todos',
            input:'',
            todos: [
                { txt: '', doneAt: null },
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
            title: 'My Video',
            url: ''
        },
        style: {
            backgroundColor: '#fff'
        }
    },
]
var gNotes = _createNotes();

function getBlankNoteInfo(noteType) {
    return Promise.resolve(gBlankNote.find(note => note.type === noteType));
}

function saveNote(note) {
    gNotes.unshift(note);
    utilService.saveToStorage(STORAGE_KEY, gNotes);
    console.log(gNotes)
}

function getNotes(){
    return Promise.resolve(gNotes)
}


function _createNotes() {
    var notes = utilService.loadFromStorage(STORAGE_KEY);
    if (!notes) notes = [];
    return notes;
}

