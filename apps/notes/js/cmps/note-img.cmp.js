

export default {
    props: ['info', 'isEdit'],
    template: `
        <section class="note-img">
            <template v-if="!isEdit">
                <h3>{{info.title}}</h3>
                <i v-if="!isEdit" class="icon fas fa-image pointer"></i>
            </template>
            <template v-else>
                <input ref="title" class="title" type="text" v-model="info.title">
                <input type="text" v-model="info.url">
            </template>
            <img :src="info.url" alt="">       
        </section>
    `,
    mounted() {
        if (this.isEdit) setTimeout(()=>{
            this.$refs.title.focus()
            this.$refs.title.select()
        },0);
    }
}