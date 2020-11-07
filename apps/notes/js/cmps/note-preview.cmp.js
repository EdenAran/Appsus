import noteTxt from './note-txt.cmp.js'
import noteImg from './note-img.cmp.js'
import noteTodos from './note-todos.cmp.js'
import noteVideo from './note-video.cmp.js'
import noteAudio from './note-audio.cmp.js'
import noteMap from './note-map.cmp.js'
import noteControlls from './note-controlls.cmp.js'
import { noteService } from '../services/note.service.js'
import { eventBus } from '../../../../js/services/event-bus.service.js';


export default {
    props: ['note'],
    template: `
        <section class="note-preview" :style="noteStyle">
            <i class="pinIcon fas fa-thumbtack" v-if="note.isPinned"></i>
            <component :is="note.type" :info="note.info" :isEdit="false" />
            <note-controlls @delete="deleteNote" @changeBgc="changeBgc" @edit="emitEdit" @pinned="togglePinNote" @send="sendAsEmail"/>
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
            if(this.note.type ==='noteMap') this.note.info.map = null;
            noteService.deleteNote(this.note.id)
            .then(() => {
                eventBus.$emit('show-msg', { type: 'success', txt: 'Note was successfully deleted', path: null })
            })
            .catch(err => {
                eventBus.$emit('show-msg', { type: 'fail', txt: 'Unable to delete note:\n' + err, path: null })
            })
    },
        togglePinNote() {
            this.note.isPinned = !this.note.isPinned;
            if(this.note.type ==='noteMap') this.note.info.map = null;
            noteService.saveNote(this.note)
        },
        sendAsEmail() {
            const title = this.note.info.title;
            var txt;
            switch (this.note.type) {
                case 'noteTxt':
                    txt = this.note.info.txt;
                    break;
                case 'noteTodos':
                    txt = this.note.info.todos.reduce((acc, todo) => {
                        acc += todo.txt;
                        acc += (todo.isDone) ? ' DONE' + '%0D%0A' : '%0D%0A';
                        return acc;
                    }, '');
                    break;
                case 'noteImg':
                case 'noteVideo':
                    txt = this.note.info.url.replace(/\//g, '%2F').replace(/,/g, '%2C');
                    txt = 'The url is: %0D%0A' + txt;
                    break;
            }
            this.$router.push(`/email/compose/${title}/${txt}`);
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
        noteAudio,
        noteMap,
        noteControlls,
    }
}