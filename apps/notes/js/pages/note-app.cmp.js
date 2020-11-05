import { noteService } from '../services/note.service.js';
import noteHeader from '../cmps/note-header.cmp.js';
import noteList from '../cmps/note-list.cmp.js';
import addNote from '../cmps/add-note.cmp.js';


export default {
    template: `
        <section class="note-app">
            <header>
                <note-header @search="updateFilter"/>
            </header>
            <main>
                <add-note />
                <note-list :notes="notesToShow" />
            </main>
        </section>
    `,
    data() {
        return {
            sentData: null,
            notes: null,
            filterBy: ''
        }
    },
    watch: {
        '$route.params'(noteInfo) {
            const title = noteInfo.title;
            const txt = noteInfo.txt;
            noteService.getBlankNote('noteTxt')
                .then(note => {
                    note.info.title = title;
                    note.info.txt = txt;
                    noteService.saveNote(note)
                })
        }
    },
    computed: {
        notesToShow() {
            if (!this.filterBy) return this.notes;
            return this.notes.filter(note => note.info.title.toLowerCase().includes(this.filterBy));
        }
    },
    methods: {
        updateFilter(searchTerm) {
            this.filterBy = searchTerm.toLowerCase();
        },
    },
    created() {
        noteService.query()
            .then(notes => this.notes = notes)
        // const noteData = this.$route.params;
        // console.log(noteData)  //add support for income mail
    },
    components: {
        noteHeader,
        noteList,
        addNote
    }
}