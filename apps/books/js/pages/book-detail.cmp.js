import reviewAdd from '../cmps/review-add.cmp.js';
import reviewPreview from '../cmps/review-preview.cmp.js';
import { bookService } from '../services/book.service.js';
import { eventBus } from '../services/event-bus.service.js'


export default {
    template: `
    <section class="book-detail" v-if="book">
        <h2 class="title">{{book.title}}</h2>
        <span class="nav-btn prev" @click="changeBook(-1)"><i class="fas fa-chevron-left"></i></span>
        <span class="nav-btn next" @click="changeBook(1)"><i class="fas fa-chevron-right"></i></span>
        <div class="details-container"> 

            <div class="img-container">
                <img :src="book.thumbnail" alt="">
                <h5 class="sale" v-if="isOnSale">ON SALE!</h5>
                <div class="tags">
                    <h5 v-show="bookAge" class="tag age-tag">{{bookAge}}</h5>
                    <h5 v-show="bookLength" class="tag length-tag">{{bookLength}}</h5>
                </div>
            </div>
            <button class="return-btn" @click="returnToBooks">Return</button>
            <div class="details">
                <h5 class = "price">Price <span :class ="previewPrice">{{this.book.listPrice.amount}}{{currIcon}}</span></h5>
                <ul>
                    <h4>Author:</h4>
                    <li v-for="author in book.authors">{{author}}</li>
                </ul>
                <ul>
                    <h4>Categories</h4>
                    <li v-for="category in book.categories">{{category}}</li>
                </ul>
            </div>
        </div>
        <button @click="toggleDesc">{{showBtnTxt}}</button>
        <div class="desc-container">
            <p class="desc" v-if="hideText">{{textForPreview}}</p>
            <p v-else> {{book.description}}</p>
        </div>
        <review-add :bookId="book.id" v-if="addingReview" @added="addReview" @canceled="closeReview" @delete="deleteReview(id)"/>
        <button @click="addingReview = true">Add Review</button>
        <div class="reviews" v-if="book.reviews.length">
                <li v-for="review in book.reviews" :key="review.id">
                    <review-preview @delete="deleteReview" :review="review" />
                </li>
        </div>
    </section>

    `,
    data() {
        return {
            book: null,
            hideText: true,
            addingReview: false
        }
    },
    computed: {
        bookLength() {
            const pages = this.book.pageCount;
            return (pages < 100) ? 'Light Reading' : (pages > 200 && pages < 500) ? 'Medium Reading' : 'Long reading'
        },
        bookAge() {
            const age = (new Date()).getFullYear() - this.book.publishedDate;
            return (age < 1) ? 'New!' : (age > 10) ? 'Veteran Book' : '';
        },
        previewPrice() {
            return { expensive: this.book.listPrice.amount > 150, cheap: this.book.listPrice.amount < 20 }
        },
        isOnSale() {
            return this.book.listPrice.isOnSale;
        },
        textForPreview() {
            return this.book.description.slice(0, 80) + '...'
        },
        showBtnTxt() {
            return (this.hideText) ? 'Show More' : 'Show Less'
        },
        currIcon() {
            switch (this.book.listPrice.currencyCode) {
                case 'ILS':
                    return '₪';
                case 'EUR':
                    return '€';
                case 'USD':
                    return '$';
                default:
                    return book.listPrice.currencyCode
            }
        }
    },
    methods: {
        returnToBooks() {
            this.$router.push(`/book`)
        },
        toggleDesc() {
            this.hideText = !this.hideText;
        },
        addReview(bookId) {
            bookService.getBookById(bookId)
                .then(book => {
                    this.book = book
                    this.closeReview();
                })
        },
        closeReview() {
            this.addingReview = false;
        },
        deleteReview(reviewId) {
            const idx = this.book.reviews.findIndex(review => review.id === reviewId)
            this.book.reviews.splice(idx, 1)
            bookService.saveBooks();
            eventBus.$emit('show-msg', { txt: 'Review has been deleted', type: 'Success' })
        },
        changeBook(diff) {
            const nextId = bookService.getNextBookId(this.book.id, diff);
            this.$router.push(`/book/${nextId}`);
            this.hideText = true;
        }
    },
    watch: {
        '$route.params.bookId'(newId) {
            bookService.getBookById(newId)
                .then(book => this.book = book)
        }
    },
    created() {
        const bookId = this.$route.params.bookId;
        bookService.getBookById(bookId)
            .then(book => this.book = book)
    },
    components: {
        reviewAdd,
        reviewPreview
    }
}