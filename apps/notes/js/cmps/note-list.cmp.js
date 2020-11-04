import notePreview from './note-preview.cmp.js'
import { noteService } from '../services/note.service.js'


export default {
    props: ['notes'],
    template: `
    <section class="note-list flex just-center wrap">
        <div v-for="note in notes" class="">
            <note-preview :noteInfo="note.info" :type="note.type" :bgColor="note.style.backgroundColor" :id="note.id"
                    @delete="deleteNote(note.id)" @changeBgc="changeBgc"/>
        </div>
    </section>
    `,
    methods: {
        deleteNote(id) {
            noteService.deleteNote(id);
        },
        changeBgc(color, id) {
            console.log(id)
            noteService.getNoteById(id)
                .then(note => {
                    note.style.backgroundColor = color
                    noteService.saveNote(note)
                })
        }
    },
    components: {
        notePreview
    }
}