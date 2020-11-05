

export default {
    props: ['info', 'isEdit'],
    template: `
    <section class="note-text">
        <template v-if="!isEdit">
            <h3>{{info.title}}</h3>
            <p>{{info.txt}}</p>
            <i class="icon fas fa-font pointer"></i>
        </template>
        <template v-else>
            <input class="title" type="text" v-model="info.title">
            <textarea name="" v-model="info.txt" cols="30" rows="10"></textarea>
        </template>
    </section>
    `,
    data() {
        return {

        }
    }
}