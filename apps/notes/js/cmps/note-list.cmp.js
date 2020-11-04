import notePreview from './note-preview.cmp.js'


export default {
    props: ['notes'],
    template: `
    <section class="note-list flex just-center wrap">
        <div v-for="note in notes" class="">
            <note-preview :noteInfo="note.info" :type="note.type"/>
        </div>
    </section>
    `,
    components: {
        notePreview
    }
}