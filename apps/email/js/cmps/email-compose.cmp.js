import { emailService } from '../services/email.service.js';

export default {
    template: `
        <section class="email-compose">
            <button @click="toggleIsShow">Compose</button>
            <form v-if="newEmail && isShow" @submit.prevent="sendEmail">
                <input type="text" placeholder="Email Subject" v-model="newEmail.subject" />
                <textarea v-model="newEmail.body" placeholder="Enter your email content..."></textarea>
                <button>Send</button>
            </form>
        </section>
    `,
    data() {
        return {
            newEmail: null,
            isShow: false
        };
    },
    methods: {
        toggleIsShow() {
            this.isShow = !this.isShow;
        },
        sendEmail() {
            this.toggleIsShow();
            emailService.saveEmail(this.newEmail)
                .then(email => {
                    console.log('Email send successfully!');
                    // this.$router.push(`/email/${email.id}`);
                })
                .catch(() => {
                    console.log('Failed to send email!');
                    this.$router.push('/email');
                });
        }
    },
    created() {
        this.newEmail = emailService.getEmptyEmail();
    }
};