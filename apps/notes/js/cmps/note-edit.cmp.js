import noteTxt from './note-txt.cmp.js'
import noteImg from './note-img.cmp.js'
import noteTodos from './note-todos.cmp.js'
import noteVideo from './note-video.cmp.js'
import noteAudio from './note-audio.cmp.js'
import noteMap from './note-map.cmp.js'
import noteControlls from './note-controlls.cmp.js'
import { noteService } from '../services/note.service.js'
import { eventBus } from '../../../../js/services/event-bus.service.js';
import {utilService} from '../../../../js/services/util.service.js'


export default {
    props: ['note'],
    template: `
        <section ref="noteEdit" class="note-edit" :style="noteStyle">
            <form  @submit.prevent="saveEdit">
                <component :is="note.type" :info="note.info" :isEdit="true" @addTodo="addTodo" @deleteLine="deleteLine"/>
                <button class="pointer save-btn" >Save and Close</button>
            </form>
        </section>
    `,
    methods: {
        saveEdit() {
            if(this.note.type ==='noteMap') this.note.info.map = null;
            noteService.saveNote(this.note)
                .then(() => {
                    this.emitClose();
                    eventBus.$emit('show-msg', { type: 'success', txt: 'Note was successfully edited', path: null })
                })
                .catch(err => {
                    eventBus.$emit('show-msg', { type: 'fail', txt: 'Unable to save note:\n' + err, path: null })
                })
        },
        emitClose() {
            this.$emit('close')
        },
        addTodo() {
            this.note.info.todos.unshift({ txt: '', isDone: false, id: utilService.makeId() });
        },
        deleteLine(idx) {
            this.note.info.todos.splice(idx, 1)
        }
    },
    computed: {
        todosToDisplay() {
            return this.note.info.todos
        },
        noteStyle() {
            return {
                backgroundColor: this.note.style.backgroundColor
            }
        },
    },
    components: {
        noteTxt,
        noteImg,
        noteTodos,
        noteVideo,
        noteAudio,
        noteMap,
        noteControlls,
    },
    mounted() {
        this.$refs.noteEdit.scrollIntoView({ behavior: "smooth", block: "end" });
    },
}