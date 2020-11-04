import { noteService } from '../services/note.service.js'


export default {
    template: `
    <section class="add-note flex a-center s-between" v-if="note">
        <input type="text" :placeholder="textToShow">
        <div class="options flex s-evenly">
            <i class="fas fa-font" @click="getBlankNote('Txt')"></i>
            <i class="fas fa-image" @click="getBlankNote('Img')"></i>
            <i class="fab fa-youtube" @click="getBlankNote('Video')"></i>
            <i class="fas fa-list-ul" @click="getBlankNote('Todos')"></i>
        </div>
    </section>
    `,
    data() {
        return {
            note: null
        }
    },
    methods: {
        getBlankNote(noteType) {
            noteService.getBlankNoteInfo('note' + noteType)
                .then(note => {
                    this.note = note
                })
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