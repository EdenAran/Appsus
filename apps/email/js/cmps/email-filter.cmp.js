export default {
    template: `
        <section class="email-filter flex just-center a-center">
            <form @submit.prevent="emitFilter">
                <i class="fas fa-search"></i>
                <input type="text" placeholder="Search mail" v-model="filterBy.byTxt" />
                <select v-model="filterBy.byRead">
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
            this.filterBy = { byTxt: '', byRead: 'all' };
        }
    }
};