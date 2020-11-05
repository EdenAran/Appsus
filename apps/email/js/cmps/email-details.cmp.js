import { emailService } from '../services/email.service.js';
import { eventBus } from '../../../../js/services/event-bus.service.js';

export default {
    template: `
        <section v-if="email" class="email-details">
            <h3>Subject: {{email.subject}}</h3>
            <p>Body: {{email.body}}</p>
            <i class="fas fa-trash" @click="remove"></i>
            <i class="fas fa-compress" @click="compress"></i>
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
                .then(() => {
                    eventBus.$emit('unreadChanged', 'selectChanged');
                    console.log('Deleted');
                });
        },
        compress() {
            this.$router.push('/email/inbox');
        }
    },
    created() {
        this.loadEmail();
    }
};