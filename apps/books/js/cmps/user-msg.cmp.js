import { eventBus } from "../../../../js/services/event-bus.service.js"

export default {
    template: `
        <section class="user-msg" v-if="msg" :class="msgClass">
            <h2>{{msg.type}} <button @click="closeMsg">x</button></h2>
            <p>{{msg.txt}}</p>

        </section>
    `,
    data() {
        return {
            msg: null,
            timer: null
        }
    },
    computed: {
        msgClass() {
            return { success: this.msg.type === 'Success', error: this.msg.type === "Error" }
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
            this.msg = msg
            if(this.timer) this.clearTimer()
            this.timer = setTimeout(() => {
                this.closeMsg()
            }, 3000);
        })

    }
}