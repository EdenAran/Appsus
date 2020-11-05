

export default {
    props: ['info', 'isEdit'],
    template: `
        <section class="note-txt">
            <template v-if="!isEdit">
                <h3>{{info.title}}</h3>
                <pre>{{info.txt}}</pre>
                <i class="icon fas fa-font pointer"></i>
            </template>
            <template v-else>
                <input ref="title" class="title" type="text" v-model="info.title">
                <textarea name="" v-model="info.txt" cols="30" rows="10"></textarea>
            </template>
        </section>
    `,
    mounted() {
        if (this.isEdit) setTimeout(()=>{
            this.$refs.title.focus()
            this.$refs.title.select()
        },0);
    }
}