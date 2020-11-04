import notePreview from './note-preview.cmp.js'
import { noteService } from '../services/note.service.js'


export default {
    props: ['notes'],
    template: `
    <section class="note-list flex just-center wrap">
        <div v-for="note in notes" class="">
            <note-preview :noteInfo="note.info" :type="note.type" @delete="deleteNote(note.id)"/>
        </div>
    </section>
    `,
    methods: {
        deleteNote(id) {
            noteService.deleteNote(id);
        }
    },
    components: {
        notePreview
    }
}