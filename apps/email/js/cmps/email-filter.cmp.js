export default {
    template: `
        <section class="email-filter">
            <h2>Email Filter</h2>
            <form @submit.prevent="emitFilter">
                <input type="text" placeholder="Email Subject" v-model="filterBy.byTxt" />
                <select v-model="filerBy.byRead">
                    <option value="all">All</option>
                    <option value="read">Read</option>
                    <option value="unread">Unread</option>
                </select>
                <button>Filter</button>
            </form>
        </section>
    `,
    data() {
        return {
            filterBy: { byTxt: '', byRead: 'all' }
        };
    },
    methods: {
        emitFilter() {
            this.$emit('filtered', JSON.parse(JSON.stringify(this.filterBy)));
        }
    }
};