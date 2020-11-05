import noteTxt from './note-txt.cmp.js'
import noteImg from './note-img.cmp.js'
import noteTodos from './note-todos.cmp.js'
import noteVideo from './note-video.cmp.js'
import noteControlls from './note-controlls.cmp.js'
import { noteService } from '../services/note.service.js'

export default {
    props:['note'],
    template:`
        <section class="note-edit" :style="noteStyle">
            <form @submit.prevent="saveEdit">
                <component :is="note.type" :info="note.info" :isEdit="true" @addTodo="addTodo"/>
                <button class="pointer" >Save and Close</button>
            </form>
        </section>
    `,
    methods:{
        saveEdit(){
            noteService.saveNote(this.note)
            this.emitClose();
        },
        emitClose(){
            this.$emit('close')
        },
        addTodo(){
            this.note.info.todos.unshift({ txt: '', isDone: false });
        }
    },
    computed:{
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
        noteControlls,
    }
}