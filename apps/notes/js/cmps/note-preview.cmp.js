import textNote from './text-note.cmp.js'
import imgNote from './img-note.cmp.js'
import todosNote from './todos-note.cmp.js'
import vidNote from './vid-note.cmp.js'
import noteControlls from './note-controlls.cmp.js'

export default {
    props: ['id','noteInfo','type','bgColor'],
    template: `
    <section class="note-preview" :style="noteStyle">
        <text-note :info="noteInfo" v-if="type === 'noteTxt'"></text-note>
        <img-note :info="noteInfo" v-if="type === 'noteImg'"></img-note>
        <todos-note :info="noteInfo" v-if="type === 'noteTodos'"></todos-note>
        <vid-note :info="noteInfo" v-if="type === 'noteVideo'"></vid-note>
        <note-controlls @delete="emitDelete" @changeBgc="emitChangeBgc"/>
    </section>
    `,
    data(){
        return{

        }
    },
    methods:{
        emitDelete(){
            this.$emit('delete')
        },
        emitChangeBgc(color){
            this.$emit('changeBgc', color, this.id)
        }
    },
    computed:{
        noteStyle(){
            return{
                backgroundColor: this.bgColor
            }
        }
    },
    components: {
        textNote,
        imgNote,
        todosNote,
        vidNote,
        noteControlls
    }
}