

export default {
    props: ['info', 'isEdit'],
    template: `
        <section class="note-audio">
            <template v-if="!isEdit">
                <h3>{{info.title}}</h3>
                <i v-if="!isEdit" class="icon fas fa-music"></i>
            </template>
            <template v-else>
                <input ref="title" class="title" type="text" v-model="info.title">
                <input type="text" v-model="info.src">
            </template>
            <audio style="width:100%" class="audio" controls :src="info.src"></audio>
        </section>
    `,
    mounted() {
        if (this.isEdit) setTimeout(()=>{
            this.$refs.title.focus()
            this.$refs.title.select()
        },0);
    }
}