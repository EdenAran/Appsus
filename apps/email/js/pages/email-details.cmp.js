import { emailService } from '../services/email.service.js';
import longText from '../../../../js/cmps/long-text.util-cmp.js';

export default {
    template: `
        <section class="email-details">
            <template v-if="email">
                <h3>Subject: {{email.subject}}</h3>
                <p>Body: {{email.body}}</p>
                <button @click="remove">Delete this email</button>
            </template>
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
            // this.$router.push('/email/list');
            this.$router.push('/email');
        }
    },
    created() {
        this.loadEmail();
    },
    components: {
        longText
    }
};