'use strict';

export default {
    template: `
        <section class="email-filter">
            <h2>Email Filter</h2>
            <form @submit.prevent="setFilter">
                <input type="text" placeholder="Email Subject" v-model="filterBy.byTxt" />
                <!-- <input type="checkbox" value="" v-model="filterBy.byRead"> -->
                <button>Filter</button>
            </form>
        </section>
    `,
    data() {
        return {
            filterBy: {byTxt: '', byRead: 'all'}
        };
    },
    methods: {
        setFilter() {
            this.$emit('filtered', JSON.parse(JSON.stringify(this.filterBy)));
        }
    }
};