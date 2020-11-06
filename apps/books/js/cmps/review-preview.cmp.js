export default{
    props:['review'],
    template:`
        <section class="review-preview">
            <h3>{{review.fullName}}</h3>
            <div class="review-details">
                <p>Rating:</p><span v-for="idx in 5" @click="updateRating(idx)"><i :class="starClass(idx)"></i></span>
                <p>Read At: {{dateToShow}}</p>
            </div>
            <p class="review-info">{{review.moreInfo}}</p>
            <button class="delete-review" @click="emitDelete(review.id)">x</button>
        </section>
    `,
    computed:{
        dateToShow(){
            return this.review.readAt.split('').reverse().join('')
        }
    },
    methods:{
        emitDelete(id){
            this.$emit('delete', id)
        },
        starClass(idx){
            console.log(idx <= this.review.rating)
            return {'fas fa-star checked' : idx <= this.review.rating, 'far fa-star' : idx > this.review.rating}
        }
    },
}