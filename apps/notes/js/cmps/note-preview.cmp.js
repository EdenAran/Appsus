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
        <!-- <h3>{{note.info.title}}</h3> -->
        <component :is="note.type" :info="note.info"/>
        <!-- <template v-if="note.type === 'noteImg'">
            <img :src="note.info.url" alt="" >
            <i class="icon fas fa-image pointer"></i>
        </template>

        <template v-if="note.type === 'noteVideo'">
            <iframe :src="note.info.url"></iframe>
            <i class="icon fab fa-youtube"></i>
        </template>

        <template v-if="note.type === 'noteTxt'">
            <p>{{note.info.txt}}</p>
            <i class="icon fas fa-font pointer"></i>
        </template>

        <template v-if="note.type === 'noteTodos'">
            <ul>
                <li  v-for="todo in todosToDisplay">
                    {{todo.txt}}
                </li>
                <i class="icon fas fa-list-ul pointer"></i>
            </ul>
        </template> -->

        <note-controlls @delete="deleteNote" @changeBgc="changeBgc" @edit="emitEdit"/>

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
        emitEdit() {
            this.$emit('edit', this.note)
        }

    },
    computed: {
        noteStyle() {
            return {
                backgroundColor: this.note.style.backgroundColor
            }
        },
        todosToDisplay() {
            return this.note.info.todos.slice(0, 5)
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