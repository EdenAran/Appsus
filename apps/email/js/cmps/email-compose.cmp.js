import { emailService } from '../services/email.service.js';

export default {
    template: `
        <section class="email-compose">
            <h2>Email Compose</h2>
            <form @submit.prevent="sendEmail">
                <input type="text" placeholder="Email Subject" v-model="newEmail.subject" />
                <textarea v-model="newEmail.body">Enter your email content...</textarea>
                <button>Send</button>
            </form>
        </section>
    `,
    data() {
        return {
            newEmail: { subject: '', body: '' }
        };
    },
    methods: {
        sendEmail() {
            emailService.saveEmail(this.newEmail)
                .then(email => {
                    console.log('Email sent successfully!');
                    this.$router.push(`/email/${email.id}`);
                })
                .catch(() => {
                    console.log('Failed to send email!');
                    this.$router.push('/email');
                });
        }
    }
};