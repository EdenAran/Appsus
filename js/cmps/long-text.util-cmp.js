export default {
    props: ['txt'],
    template: `
        <section class="long-txt">
            <p>{{txtToShow}}</p>
            <button v-if="this.txt.length > 100" @click="toggleDesc">{{btnTxt}}</button>
        </section>
    `,
    data() {
        return {
            isExpended: false
        };
    },
    methods: {
        toggleDesc() {
            this.isExpended = !this.isExpended;
        }
    },
    computed: {
        txtToShow() {
            if (!this.isExpended && this.txt.length > 100) return this.txt.substr(0, 100) + '...';
            return this.txt;
        },
        btnTxt() {
            return this.isExpended ? 'Less' : 'More';
        }
    }
};