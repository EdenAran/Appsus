import { utilService } from '../../../../js/services/util.service.js';

export const noteService = {
    getBlankNote,
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
            todos: [],
            input: ''
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
    {
        type: 'noteAudio',
        isPinned: false,
        info: {
            title: 'My Audio',
            src: ''
        },
        style: {
            backgroundColor: '#fff5be'
        }
    },
    {
        type: 'noteMap',
        isPinned: false,
        info: {
            title: 'My Map',
            address: '',
            map: null
        },
        style: {
            backgroundColor: '#fff5be'
        }
    }
]
var gNotes = _createNotes();


function getBlankNote(noteType) {
    const note = gBlankNote.find(note => note.type === noteType);
    console.log('s')
    note.id = utilService.makeId();
    return Promise.resolve(note);
}

function saveNote(note) {
    const noteIdx = gNotes.findIndex(currNote => currNote.id === note.id);
    if (noteIdx === -1) gNotes.unshift(note);
    else gNotes.splice(noteIdx, 1, note);
    console.log(gNotes)
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
    if (!notes){
        notes = JSON.parse('[{"type":"noteTodos","isPinned":false,"info":{"title":"For later tonight","todos":[{"txt":"Cheetos","isDone":false},{"txt":" Bamba","isDone":false},{"txt":" CocaCola","isDone":false},{"txt":" The good stuff","isDone":false},{"txt":" Lighter","isDone":false},{"txt":" Papers","isDone":false},{"txt":" Ice Cream","isDone":false}],"input":"Cheetos, Bamba, CocaCola, The good stuff, Lighter, Papers, Ice Cream"},"style":{"backgroundColor":"#fff5be"},"id":"ERYUG9G8PiR"},{"type":"noteTodos","isPinned":true,"info":{"title":"Shopping List","todos":[{"txt":"Apples","isDone":false},{"txt":" Milk","isDone":false},{"txt":" Eggs","isDone":false},{"txt":" Cheese","isDone":false},{"txt":" Tomatoes","isDone":false},{"txt":" Poison","isDone":false},{"txt":" Rope","isDone":false},{"txt":" Knife","isDone":false}],"input":"Apples, Milk, Eggs, Cheese, Tomatoes, Poison, Rope, Knife"},"style":{"backgroundColor":"#ff7b7b"},"id":"uqxVSibjC1i"},{"type":"noteVideo","isPinned":true,"info":{"title":"My Video","url":"https://www.youtube.com/watch?v=kdNaU-VvQOY&ab_channel=YaronBiton"},"style":{"backgroundColor":"#fff5be"},"id":"D8Iq4SSuR6h"},{"type":"noteAudio","isPinned":false,"info":{"title":"Best Theme","src":"https://www.televisiontunes.com/uploads/audio/Pokemon.mp3"},"style":{"backgroundColor":"#bef7ff"},"id":"ETFGh8HdBdC"},{"type":"noteTxt","isPinned":false,"info":{"title":"My Note","txt":"So no one told you life was gonna be this way... CLAPCLAPCLAPCLAP"},"style":{"backgroundColor":"#ffbebe"},"id":"gVTdAR326tC"},{"type":"noteImg","isPinned":false,"info":{"title":"My Image","url":"https://www.readersdigest.ca/wp-content/uploads/2017/10/funny-photos-llama.jpg"},"style":{"backgroundColor":"#fff5be"},"id":"QF7VBwiufCk"},{"type":"noteImg","isPinned":true,"info":{"title":"Spirit Animal","url":"https://i.insider.com/5ebbfc9ffc593d729d60df73?width=1136&format=jpeg"},"style":{"backgroundColor":"#fefefe"},"id":"aIgSxI8jMG8"},{"type":"noteVideo","isPinned":false,"info":{"title":"My Video","url":"https://www.youtube.com/watch?v=oLDqCbv0FBQ&t=1s&ab_channel=YaronBiton"},"style":{"backgroundColor":"#c2beff"},"id":"4T4ydJruoyA"},{"type":"noteTodos","isPinned":false,"info":{"title":"What to do tonight","todos":[{"txt":"Take over the world","isDone":false,"id":"sENS9GxYEf7"},{"txt":"Take over the world","isDone":false,"id":"sKUXrXsJXkq"},{"txt":"Take over the world","isDone":false,"id":"7fa6lg8NvP6"},{"txt":"Take over the world","isDone":false,"id":"h8D2aajxSfl"},{"txt":"Take over the world","isDone":false,"id":"55gw2iFQd8j"},{"txt":"Take over the world","isDone":false,"id":"BDuojM1tOoQ"},{"txt":"Take over the world","isDone":false,"id":"fgSbWQNxmQE"},{"txt":"Take over the world","isDone":false,"id":"MV6WH1GYVbm"},{"txt":"Take over the world","isDone":false}],"input":"Make website, Publish it, ?, Profit!"},"style":{"backgroundColor":"#fff5be"},"id":"KXtRjTGrXL0"},{"type":"noteTodos","isPinned":true,"info":{"title":"Life Goals","todos":[{"txt":"Learn Js","isDone":true,"doneAt":1604786616758},{"txt":" Learn HTML","isDone":true,"doneAt":1604786617034},{"txt":" Learn Css","isDone":true,"doneAt":1604786617438},{"txt":" Find a job","isDone":false}],"input":"Learn Js, Learn HTML, Learn Css, Find a job"},"style":{"backgroundColor":"#c6ffbe"},"id":"Q4irkL1vmOu"}]')
    }
    return notes;
}


