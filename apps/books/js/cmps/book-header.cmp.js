

export default {
    template: `
    <section class="note-header flex al-center s-between">
        <h3>Books</h3>
        <div class="search">
            <input type="text" class="note-search" placeholder="Search books..." v-model="searchTerm" @input="emitSearch">
            <i class="fas fa-search" @click="emitSearch"></i>
        </div>
    </section>
    `,
    data(){
        return{
            searchTerm: ''
        }
    },
    methods: {
        emitSearch() {
            this.$emit('search', this.searchTerm)
        }
    },
}