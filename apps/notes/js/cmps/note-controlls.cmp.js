
export default {
    template: `
        <section class="note-controlls">
            <i class="fas fa-thumbtack" @click="emitPinned"></i>
            <i class="fas fa-palette" @click="toggleBgcSelect">
                <div v-show="showBgc" class="color-picker">
                    <button @click="emitChangeBgc('#fefefe')" class="color-option color-1"></button>
                    <button @click="emitChangeBgc('#fff5be')" class="color-option color-2"></button>
                    <button @click="emitChangeBgc('#ffbebe')" class="color-option color-3"></button>
                    <button @click="emitChangeBgc('#c6ffbe')" class="color-option color-4"></button>
                    <button @click="emitChangeBgc('#bef7ff')" class="color-option color-5"></button>
                    <button @click="emitChangeBgc('#c2beff')" class="color-option color-6"></button>
                    <button @click="emitChangeBgc('#ff7b7b')" class="color-option color-7"></button>
                </div>
            </i>
            <i class="fas fa-edit" @click="emitEdit"></i>
            <i class="fas fa-trash-alt" @click="emitDelete"></i>
            <i class="far fa-envelope"></i>
        </section>
    `,
    data() {
        return {
            showBgc: false
        }
    },
    methods: {
        emitDelete() {
            this.$emit('delete')
        },
        emitChangeBgc(bgColor) {
            this.$emit('changeBgc', bgColor)
        },
        emitEdit(){
            this.$emit('edit')
        },
        emitPinned(){
            this.$emit('pinned')
        },
        toggleBgcSelect() {
            this.showBgc = !this.showBgc;
        }
    }
}