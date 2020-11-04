import { emailService } from '../services/email.service.js';
import longText from '../../../../js/cmps/long-text.util-cmp.js';

export default {
    template: `
        <section class="email-details">
            <h2>Email Details</h2>
            <h3 v-if="email">Subject: {{email.subject}}</h3>
            <button @click="remove">Delete this email</button>
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
        remove() {
            emailService.removeEmail(this.email.id)
                .then(console.log('Deleted'));
        },
        back() {
            this.$router.push('/email/list');
        }
    },
    created() {
        this.loadEmail();
    },
    components: {
        longText
    }
};