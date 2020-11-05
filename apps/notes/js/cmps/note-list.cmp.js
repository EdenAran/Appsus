import notePreview from './note-preview.cmp.js';
import noteEdit from './note-edit.cmp.js';



export default {
    props: ['notes'],
    template: `
        <section class="note-list flex just-center wrap" v-if="notes">
        <!-- <section class="note-list" v-if="notes"> -->
            <template v-if="havePinned">
                <note-preview v-for="note in notes" :note="note" :key="note.id" v-if="note.isPinned" @edit="editNote" />
            </template>
            <template v-else>
                <note-preview v-for="note in notes" :note="note" @edit="editNote" :key="note.id" />
            </template>
            <note-edit v-if="noteToEdit" :note="noteToEdit"  @close="closeEdit"/>
        </section>
    `,
    data() {
        return {
            noteToEdit: null
        }
    },
    computed:{
        havePinned(){
            return this.notes.some(note => {
                note.isPinned})
        }
    },
    methods: {
        editNote(note){
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