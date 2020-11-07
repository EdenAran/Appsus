export default {
    props:['book'],
    template: `
    <section class="book-preview">
        <h3>{{book.title}}</h3>
        <img :src="book.thumbnail" alt="">
        <h5>{{book.listPrice.amount}} {{currIcon}}</h5>
    </section>
    `,
    computed: {
        currIcon(){
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
    }
}