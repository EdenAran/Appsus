import { bookService } from '../services/book.service.js'
import bookFilter from '../cmps/book-filter.cmp.js'
import bookList from '../cmps/book-list.cmp.js'
import bookAdd from '../cmps/book-add.cmp.js'


export default {
    template: `
    <section class="car-app">
        <h1 class="main-title">Miss Books</h1>
        <book-add />
        <book-filter @filtered="setFilter"/>
        <book-list :books="booksToShow" @bookClick="selectBook" />
    </section>
    `,
    data() {
        return {
            books: null,
            filterBy: null,
            selectedBookId: '',
            isBookSelected: false,
        }
    },
    computed: {
        booksToShow() {
            if (!this.filterBy) return this.books;
            const txt = this.filterBy.byName.toLowerCase();
            return this.books.filter(book => {
                return book.title.toLowerCase().includes(txt) &&
                    book.listPrice.amount > this.filterBy.fromPrice &&
                    book.listPrice.amount < this.filterBy.toPrice
            })
        },
    },
    methods: {
        selectBook(bookId) {
            this.$router.push(`/book/${bookId}`)
        },
        setFilter(filterBy) {
            this.filterBy = filterBy;
        }
    },
    created(){
        bookService.query()
            .then(books => this.books = books)
    },
    components: {
        bookFilter,
        bookList,
        bookAdd
    }
}