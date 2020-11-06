export default {
    template: `
        <section class="email-header flex al-center s-between">
            <h3>Emails</h3>
            <div class="search">
                <input type="text" class="email-search" placeholder="Search email..." v-model="searchTerm" @input="emitSearch" />
                <i class="fas fa-search" @click="emitSearch"></i>
            </div>
        </section>
    `,
    data() {
        return {
            searchTerm: ''
        };
    },
    methods: {
        emitSearch() {
            this.$emit('search', 'searchTerm', this.searchTerm);
        }
    }
};