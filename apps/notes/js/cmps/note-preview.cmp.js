import textNote from './text-note.cmp.js'
import imgNote from './img-note.cmp.js'
import todosNote from './todos-note.cmp.js'
import vidNote from './vid-note.cmp.js'

export default {
    props: ['noteInfo','type'],
    template: `
    <section class="note-preview pointer">
        <text-note :info="noteInfo" v-if="type === 'noteTxt'"></text-note>
        <img-note :info="noteInfo" v-if="type === 'noteImg'"></img-note>
        <todos-note :info="noteInfo" v-if="type === 'noteTodos'"></todos-note>
        <vid-note :info="noteInfo" v-if="type === 'noteVid'"></vid-note>
    </section>
    `,
    components: {
        textNote,
        imgNote,
        todosNote,
        vidNote
    }
}