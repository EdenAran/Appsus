import bookPreview from './book-preview.cmp.js'

export default {
    props:['books'],
    template: `
    <section class="book-list">
        <ul>
            <li v-for="book in books" :key="book.id" >
                <book-preview :book="book" @click.native="emitBookClick(book.id)"/>
            </li>
        </ul>
    </section>
    `,
    data() {
        return {
        }
    },
    computed: {
    },
    methods: {
        emitBookClick(bookId){
            this.$emit('bookClick', bookId)
        }
    },
    components:{
        bookPreview
    }
}