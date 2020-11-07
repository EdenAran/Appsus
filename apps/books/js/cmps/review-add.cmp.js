import { bookService } from "../services/book.service.js";
import { eventBus } from '../../../../js/services/event-bus.service.js'

export default {
    props: ['bookId'],
    template: `
        <section class="review-add" v-if="review">
                <form @submit.prevent="addReview">
                    <h3>Add a review</h3>
                    <label>
                        Full Name:
                        <input type="text" name="fullname" ref="nameInput" v-model:value="review.fullName">
                    </label>
                    <label class="rating">
                        Rate: 
                        <span v-for="idx in 5" @click="updateRating(idx)"><i :class="starClass(idx)"></i></span>
                    </label>
                    <label>
                        Read At:
                        <input type="date" name="readAt" v-model:value="review.readAt">
                    </label>
                    <label for="moreInfo">
                        Anything to add?
                    </label>
                    <textarea name="moreInfo" cols="50" rows="10" v-model:value="review.moreInfo"></textarea>
                    <div class="btns">
                        <input type="submit" value="Add Review">
                        <button type="button" @click="cancelAdd">Cancel</button>
                    </div>
                </form>
        </section>
    `,
    data() {
        return {
            review: null,
        }
    },
    computed:{
        goodRatingStars(){
            return this.review.rating;
        },
        badRatingStars(){
            return 5 - this.review.rating;
        }
        
    },
    methods: {
        addReview() {
            bookService.addReview(this.review, this.bookId)
            this.$emit('added', this.bookId);
            this.review = null;
            eventBus.$emit('show-msg', { txt: 'Review has been added', type: 'Success' })
        },
        cancelAdd() {
            this.$emit('canceled')
            this.review = null;
        },
        updateRating(num) {
            this.review.rating = num;
        },
        starClass(idx){
            return {'fas fa-star checked' : idx <= this.review.rating, 'far fa-star' : idx > this.review.rating}
        }
        
    },
    mounted() {
        this.$refs.nameInput.focus();
    },
    created() {
        this.review = bookService.getNewReview()
    }
}