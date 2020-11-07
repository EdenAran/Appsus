import { bookService } from '../services/book.service.js'
import bookFilter from '../cmps/book-filter.cmp.js'
import bookList from '../cmps/book-list.cmp.js'
import bookAdd from '../cmps/book-add.cmp.js'
import bookHeader from '../cmps/book-header.cmp.js'


export default {
    template: `
    <section class="book-app">
        <header>
            <book-header @search="updateFilter"/>
        </header>
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
        },
        updateFilter(searchTerm) {
            if (!this.filterBy) this.filterBy = { byName: '', fromPrice: 0, toPrice: 9999 }
            this.filterBy.byName = searchTerm.toLowerCase();
        },
    },
    created() {
        bookService.query()
            .then(books => this.books = books)
    },
    components: {
        bookFilter,
        bookList,
        bookAdd,
        bookHeader
    }
}