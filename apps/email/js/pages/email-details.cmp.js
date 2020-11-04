import { emailService } from '../services/email.service.js';
import longText from '../../../../cmps/long-text.util-cmp.js';

export default {
    template: `
        <section class="email-details">
            <h2>Email Details</h2>
            <h3 v-if="email">Subject: {{email.Subject}}</h3>
            <button @click="delete">Delete this email</button>
            <button @click="back">Back To The List</button>
        </section>
    `,
    data() {
        return {
            email: null
        };
    },
    methods: {
        loadEmail() {
            emailService.getEmailById(this.$route.params.emailId)
                .then(email => this.email = email);
        },
        delete() {
            emailService.removeEmail(this.email.id)
                .then(console.log('Deleted'));
        },
        back() {
            this.router.push('/email');
        }
    },
    created() {
        this.loadEmail();
    },
    components: {
        longText
    }
};