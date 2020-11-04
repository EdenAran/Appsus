import { noteService } from '../services/note.service.js';
import noteHeader from '../cmps/note-header.cmp.js';
import noteList from '../cmps/note-list.cmp.js';
import addNote from '../cmps/add-note.cmp.js';


export default {
    template: `
    <section class="note-app">
        <header>
            <note-header />
        </header>
        <main>
            <add-note />
            <note-list :notes="notesToShow" />
        </main>
    </section>
    `,
    data() {
        return {
            notes: null,
        }
    },
    computed:{
        notesToShow(){
            return this.notes;
        }
    },
    created() {
        noteService.query()
            .then(notes => this.notes = notes)
    },
    components: {
        noteHeader,
        noteList,
        addNote
    }
}