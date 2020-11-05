

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
        <iframe :src="videoUrlForDisplay"></iframe>    
    </section>
    `,
    computed: {
        videoUrlForDisplay() {
            var video_id = this.info.url.split('v=')[1];
            if (!video_id) return this.info.url
            var ampdPosition = video_id.indexOf('&');
            video_id = video_id.substring(0, ampdPosition);
            return `https://www.youtube.com/embed/${video_id}`
        }
    },
    created() {

    }
}