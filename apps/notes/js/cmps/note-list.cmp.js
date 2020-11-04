import notePreview from './note-preview.cmp.js';
import noteEdit from './note-edit.cmp.js';
import { noteService } from '../services/note.service.js';



export default {
    props: ['notes'],
    template: `
    <section class="note-list flex just-center wrap">
        <div v-for="note in notes" class="" >
            <note-preview :note="note" @edit="editNote" />
        </div>
        <note-edit v-if="noteToEdit" :note="noteToEdit"  @close="closeEdit"/>
    </section>
    `,
    data() {
        return {
            noteToEdit: null
        }
    },
    methods: {
        editNote(note){
            console.log(note);
            this.noteToEdit = note;
        },
        closeEdit(){
            this.noteToEdit = null;
        }
    },
    components: {
        notePreview,
        noteEdit
    }
}