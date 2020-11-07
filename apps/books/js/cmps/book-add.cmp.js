import { bookService } from '../services/book.service.js';
import { eventBus } from '../../../../js/services/event-bus.service.js';

export default {
	template: `
    <section class="book-add">
		<img src="../../../assets/img/push-pin.png" />
    <h3>Add a book</h3>
    <input type="text" v-model:value="searchTerm" @input="booksFromSearch">
    <ul v-if="options" class="search-options">
        <template v-for="option in options.slice(0,5)">
            <li >
                {{option.volumeInfo.title}}
                <button class="add" @click="addBook(option)">+</button>
            </li>
            <li class="seperator"></li>
        </template>
    </ul>
    </section>
    `,
	data() {
		return {
			options: null,
			searchTerm: '',
		};
	},
	methods: {
		booksFromSearch() {
			if (!this.searchTerm) {
				this.options = null;
				return;
			}
			bookService.getBooksFromGoogle(this.searchTerm).then((books) => {
				this.options = books.items;
			});
		},
		addBook(book) {
			if (bookService.checkIfBookExists(book.id)) {
				eventBus.$emit('show-msg', { type: 'Error', txt: 'We already have this book' });
				return;
			}
			bookService.addGoogleBook(book);
			this.options = null;
			this.searchTerm = '';
		},
	},
	computed: {},
};
