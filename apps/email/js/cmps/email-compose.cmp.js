import { emailService } from '../services/email.service.js';

export default {
    template: `
        <section class="email-compose">
            <form v-if="newEmail" @submit.prevent="sendEmail">
                <input type="text" placeholder="To" v-model="newEmail.to" />
                <input type="text" placeholder="Subject" v-model="newEmail.subject" />
                <textarea v-model="newEmail.body"></textarea>
                <button>Send</button>
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
                    console.log('Email send successfully!');
                    // this.$router.push(`details/${email.id}`);
                })
                .catch(() => {
                    console.log('Failed to send email!');
                    this.$router.push('/email/sent');
                });
        },
        back() {
            this.$router.go(-1);
        }
    },
    created() {
        this.newEmail = emailService.getBlankEmail();
    }
};