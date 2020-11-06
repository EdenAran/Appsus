


export default {
    template: `
    <section class="book-filter">
        <h3>filter By:</h3>
        <form @submit.prevent="emitFilter">
            <label>
                Title:
                <input type="text" v-model="filterBy.byName" placeholder="Enter Title">
            </label>
            <label>
                min price
                <input type="number" v-model.number="filterBy.fromPrice">
            </label>
            <label>
                max price
                <input type="number" v-model.number="filterBy.toPrice">
            </label>
            <div class="btns">
            <button>Apply Filter</button>
            <button type="button" @click="resetFilter">Reset Filter</button>
            </div>
        </form>
    </section>

    `,
    data() {
        return {
            filterBy: {
                byName: '',
                fromPrice: 0,
                toPrice: 9999
            }
        }
    },
    methods: {
        emitFilter() {
            this.$emit('filtered', JSON.parse(JSON.stringify(this.filterBy)))
        },
        resetFilter() {
            this.filterBy = { byName: '', fromPrice: 0, toPrice: 9999 }
            this.emitFilter()
        }
    }
}