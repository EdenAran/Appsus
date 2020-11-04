import noteHeader from '../cmps/note-header.component.js'
import noteContainer from '../cmps/note-container.component.js'
import addNote from '../cmps/add-note.component.js'


export default {
    template: `
    <section class="note-app">
        <header>
            <note-header />
        </header>
        <main>
            <add-note />
            <note-container />
        </main>
    </section>
    `,
    components: {
        noteHeader,
        noteContainer,
        addNote
    }

}