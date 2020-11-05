import noteTxt from './note-txt.cmp.js'
import noteImg from './note-img.cmp.js'
import noteTodos from './note-todos.cmp.js'
import noteVideo from './note-video.cmp.js'
import noteControlls from './note-controlls.cmp.js'
import { noteService } from '../services/note.service.js'


export default {
    props: ['note'],
    template: `
        <section class="note-preview" :style="noteStyle">
            <i class="pinIcon fas fa-thumbtack" v-if="note.isPinned" @click="togglePinNote"></i>
            <component :is="note.type" :info="note.info" :isEdit="false" />
            <note-controlls @delete="deleteNote" @changeBgc="changeBgc" @edit="emitEdit" @pinned="togglePinNote"/>
        </section>
    `,
    data() {
        return {
        }
    },
    methods: {
        changeBgc(color) {
            this.note.style.backgroundColor = color
            noteService.saveNote(this.note)
        },
        deleteNote() {
            noteService.deleteNote(this.note.id);
        },
        togglePinNote(){
            this.note.isPinned = !this.note.isPinned;
        },
        emitEdit() {
            this.$emit('edit', this.note);
        }

    },
    computed: {
        noteStyle() {
            return {
                backgroundColor: this.note.style.backgroundColor
            }
        },
        todosToDisplay() {
            return this.note.info.todos.slice(0, 5);
        },
    },
    components: {
        noteTxt,
        noteImg,
        noteTodos,
        noteVideo,
        noteControlls,
    }
}