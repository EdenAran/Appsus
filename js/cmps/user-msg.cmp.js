import { eventBus } from '../services/event-bus.service.js'

export default {
    template: `
        <section class="msgClass" v-if="msg">
            <h2>{{titleToShow}}</h2>
            <p>{{txtToShow}}</p>
            <i class="close-btn far fa-times-circle" @click="closeMsg"></i>
        </section>
    `,
    data() {
        return {
            msg: null,
            timer: ''
        }
    },
    computed: {
        titleToShow() {
            switch (this.msg.type) {
                case 'success':
                    return 'Great Success'
                case 'fail':
                    return 'We Failed...'
            }
        },
        txtToShow() {
            return this.msg.txt
        }
    },
    methods: {
        clearTimer() {
            clearTimeout(this.timer)
        },
        closeMsg() {
            this.clearTimer();
            this.msg = null;
        }
    },
    created() {
        eventBus.$on('show-msg', msg => {
            this.msg = msg
            if (this.timer) this.clearTimer()
            this.timer = setTimeout(() => {
                this.closeMsg()
            }, 3000);
        })

    }
}