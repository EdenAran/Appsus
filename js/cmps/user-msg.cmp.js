import { eventBus } from '../services/event-bus.service.js'

export default {
    template: `
        <section :class="['user-msg', msgClass]" v-if="msg">
            <h2>{{titleToShow}}</h2>
            <p>{{txtToShow}}</p>
            <i class="close-btn far fa-times-circle" @click="closeMsg"></i>
        </section>
    `,
    data() {
        return {
            msg: null,
            timer:''
        }
    },
    computed: {
        titleToShow() {
            switch (this.msg.type) {
                case 'success':
                    return 'Great Success'
            }
        },
        txtToShow() {
            return this.msg.txt
        },
        msgClass() {
            return { success: this.msg.type === 'success' }
        }
    },
    methods:{
        clearTimer(){
            clearTimeout(this.timer)
        },
        closeMsg(){
            this.clearTimer();
            this.msg = null;
        }
    },
    created() {
        eventBus.$on('show-msg', msg => {
            console.log('created!')
            this.msg = msg
            if (this.timer) this.clearTimer()
            this.timer = setTimeout(() => {
                this.closeMsg()
            }, 3000);
        })

    }
}