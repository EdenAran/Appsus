import { utilService } from '../../../../js/services/util.service.js';
import { noteService } from '../services/note.service.js';
import { eventBus } from '../../../../js/services/event-bus.service.js';


export default {
    template: `
        <section class="note-add " v-if="note">
            <form class="flex a-center s-between" @submit.prevent="saveNote">
                <input type="text" :placeholder="txtToShow" v-model="noteInput" />
                <i class="show-options fas fa-ellipsis-v" v-show="isSmallScreen" @click="toggleOptions"></i>
                    <div class="options flex s-between" v-show="!isSmallScreen || isShowOptions">
                        <i class="fas fa-font pointer" @click="getBlankNote('noteTxt')" :class="inputClass('noteTxt')"></i>
                        <i class="fas fa-image pointer" @click="getBlankNote('noteImg')" :class="inputClass('noteImg')"></i>
                        <i class="fab fa-youtube pointer" @click="getBlankNote('noteVideo')" :class="inputClass('noteVideo')"></i>
                        <i class="fas fa-list-ul pointer" @click="getBlankNote('noteTodos')" :class="inputClass('noteTodos')"></i>
                    </div>   
                <i class="add-btn far fa-plus-square" @click="saveNote"></i>
            </form>
        </section>
    `,
    data() {
        return {
            note: null,
            noteInput: '',
            isSmallScreen: false,
            isShowOptions: false
        }
    },
    methods: {
        getBlankNote(noteType) {
            noteService.getBlankNote(noteType)
                .then(note => {
                    this.note = utilService.deepCopy(note)
                })
        },
        saveNote() {
            if(!this.noteInfo){
                eventBus.$emit('show-msg', { type: 'fail', txt: 'You need to write something in the note...', path: null });
            }
            const inputField = this.saveInputTo();
            this.note.info[inputField] = this.noteInput;
            if (this.note.type === 'noteTodos') {
                const todos = this.noteInput.split(',')
                for (let i = 0; i < todos.length; i++) {
                    this.note.info.todos.push({ txt: todos[i], isDone: false, id: utilService.makeId })
                }
                console.log(this.note.info)
            }
            noteService.saveNote(this.note)
                .then(() => {
                    console.log('sending')
                    eventBus.$emit('show-msg', { type: 'success', txt: 'Note was successfully added', path: null });
                })
            this.getBlankNote(this.note.type)
            this.noteInput = '';
        },
        saveInputTo() {
            switch (this.note.type) {
                case 'noteTxt':
                    return 'txt'
                case 'noteImg':
                    return 'url'
                case 'noteTodos':
                    return 'input'
                case 'noteVideo':
                    return 'url'
            }
        },
        inputClass(type) {
            return { active: this.note.type === type }
        },
        handleResize() {
            if (window.innerWidth <= 840) this.isSmallScreen = true;
            else this.isSmallScreen = false
        },
        toggleOptions(){
            this.isShowOptions = !this.isShowOptions
        }
    },
    computed: {
        txtToShow() {
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
        noteService.getBlankNote('noteTxt')
            .then(note => {
                this.note = utilService.deepCopy(note)
            })
        window.addEventListener('resize', this.handleResize);
        this.handleResize();
    },
    destroyed() {
        window.removeEventListener('resize', this.handleResize);
    }
}