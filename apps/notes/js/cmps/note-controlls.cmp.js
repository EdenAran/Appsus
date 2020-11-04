
export default {
    template: `
        <section class="note-controlls">
            <i class="fas fa-thumbtack"></i>
            <i class="fas fa-check"></i>
            <i class="fas fa-palette" @click="toggleBgcSelect"></i>
            <i class="fas fa-edit"></i>
            <i class="fas fa-trash-alt" @click="emitDelete"></i>
            <div v-show="showBgc" class="color-picker">
                    <button class="color-option color-1"></button>
                    <button class="color-option color-2"></button>
                    <button class="color-option color-3"></button>
                    <button class="color-option color-4"></button>
                    <button class="color-option color-5"></button>
                    <button class="color-option color-6"></button>
                    <button class="color-option color-7"></button>
            </div>
        </section>
    `,
    data() {
        return {
            showBgc:false
        }
    },
    methods: {
        emitDelete() {
            this.$emit('delete')
        },
        emitChangeBgc() {
            this.$emit('changeBgc')
        },
        toggleBgcSelect(){
            this.showBgc = !this.showBgc;
        }
    }
}