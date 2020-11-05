import { noteService } from '../services/note.service.js'


export default {
    props:['note'],
    template:`
        <section class="note-edit">
            <input type="text" v-model:value="note.info.title">
            <ul v-if="note.type === 'noteTodos'">
                <li  v-for="todo in todosToDisplay">
                    <input type="text" v-model:value="todo.txt">
                </li>
            </ul>
            <button @click="saveEdit">Save and Close</button>
        </section>
    `,
    methods:{
        saveEdit(){
            noteService.saveNote(this.note)
            this.emitClose();
        },
        emitClose(){
            this.$emit('close')
        }
    },
    computed:{
        todosToDisplay() {
            return this.note.info.todos.slice(0,5)
        },
    }
}