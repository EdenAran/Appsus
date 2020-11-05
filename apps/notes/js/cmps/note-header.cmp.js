

export default {
    template: `
    <section class="note-header flex al-center s-between">
        <h3>Notes</h3>
        <input type="text" class="note-search" placeholder="Search notes..." v-model="searchTerm" @input="emitSearch">
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