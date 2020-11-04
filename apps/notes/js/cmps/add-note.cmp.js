import { noteService } from '../services/note.service.js';


export default {
    template: `
    <section class="add-note " v-if="note">
    <form class="flex a-center s-between" @submit.prevent="saveNote">
        <input type="text" :placeholder="textToShow" v-model="noteInput" />
        <div class="options flex s-evenly">
            <i class="fas fa-font pointer" @click="getBlankNote('Txt')"></i>
            <i class="fas fa-image pointer" @click="getBlankNote('Img')"></i>
            <i class="fab fa-youtube pointer" @click="getBlankNote('Video')"></i>
            <i class="fas fa-list-ul pointer" @click="getBlankNote('Todos')"></i>
        </div>
    </form>
    </section>
    `,
    data() {
        return {
            note: null,
            noteInput: ''
        }
    },
    methods: {
        getBlankNote(noteType) {
            noteService.getBlankNoteInfo('note' + noteType)
                .then(note => {
                    this.note = note
                })
        },
        saveNote(){
            const inputField = this.saveInputTo();
            this.note.info[inputField] = this.noteInput;
            noteService.saveNote(this.note)
            this.noteInput = '';
        },
        saveInputTo(){
            switch(this.note.type) {
                case 'noteTxt':
                    return 'txt'
                case 'noteImg':
                    return 'url'
                case 'noteTodos':
                    return 'input'
                case 'noteVideo':
                    return 'url'
            }
        }
    },
    computed: {
        textToShow() {
            switch (this.note.type) {
                case 'noteTxt':
                    return 'What\'s on your mind...'
                case 'noteImg':
                    return 'Enter image URL...'
                case 'noteTodos':
                    return 'Enter comma seperated list...'
                case 'noteVideo':
                    return 'Enter video URL...'
            }
        }
    },
    created() {
        noteService.getBlankNoteInfo('noteTxt')
            .then(note => {
                this.note = note
            })
    }
}