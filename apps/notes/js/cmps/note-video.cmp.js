

export default {
    props: ['info', 'isEdit'],
    template: `
    <section class="note-video">
        <template v-if="!isEdit">
            <h3>{{info.title}}</h3>
            <i class="icon fab fa-youtube pointer"></i>
        </template>
        <template v-else>
            <input class="title" type="text" v-model="info.title">
            <input type="text" v-model="info.url">
        </template>
        <iframe :src="info.url" referrerpolicy="no-referrer"></iframe>
    
    </section>
    `
}