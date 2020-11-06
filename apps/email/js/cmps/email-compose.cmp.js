import { emailService } from '../services/email.service.js';
import { eventBus } from '../../../../js/services/event-bus.service.js'

export default {
    template: `
        <section class="email-compose">
            <form v-if="newEmail" class=" flex-col" @submit.prevent="sendEmail">
                <h3 class="flex al-center">New Message</h3>
                <input type="text" placeholder="To" v-model="newEmail.to" />
                <input type="text" placeholder="Subject" v-model="newEmail.subject" />
                <textarea v-model="newEmail.body"></textarea>
                <button class="pointer">Send</button>
            </form>            
            <i class="fas fa-trash" @click="back"></i>
        </section>
    `,
    data() {
        return {
            newEmail: null
        };
    },
    methods: {
        sendEmail() {
            emailService.saveEmail(this.newEmail)
                .then(email => {
                    eventBus.$emit('show-msg', { type: 'success', txt: 'Email was successfully sent!', path: null });
                    this.$router.push(`details/${email.id}`);
                })
                .catch(() => {
                    eventBus.$emit('show-msg', { type: 'fail', txt: 'Failed to send email!', path: null });
                    this.$router.push('/email/sent');
                });
        },
        back() {
            this.$router.go(-1);
        }
    },
    created() {
        this.newEmail = emailService.getBlankEmail();
    },
    watch: {
        '$route.params'(emailInfo) {
            this.newEmail.subject = emailInfo.emailTitle;
            this.newEmail.body = emailInfo.emailTxt;
        }
    }
};