export default {
    template: `
        <section class="email-list-titles flex s-between">
            <div class="marks">
                <i class="fas fa-check-square opacity-none"></i>
                <i class="fas fa-star opacity-none"></i>
            </div>
            <section class="email-info flex">
                <template class="email-content" >
                    <div v-if="directory === 'inbox'" class="email-from"><h3 @click="emitSort('from')">From</h3></div>
                    <div v-else class="email-from"><h3 @click="emitSort('from')">To</h3></div>
                    <div class="email-txt">
                        <h3><span class="email-subject"></span>  <span class="email-body"></span></h3>
                    </div>
                </template>
                <div class="email-send-at"><h3 @click="emitSort('sendAt')">At</h3></div>
            </section>
            <div class="actions">
                <i class="opacity-none fas fa-expand"></i>
                <i class="opacity-none fas fa-trash"></i>
                <i class="opacity-none fas fa-envelope-open"></i>
                <i class="opacity-none fas fa-sticky-note"></i>
            </div>
        </section>
    `,
    data() {
        return {
            directory: ''
        };
    },
    methods: {
        emitSort(sortBy) {
            this.$emit('sorted', sortBy);
        }
    },
    created() {
            this.directory = this.$route.params.directory;
    }
};