import { emailService } from '../services/email.service.js';
import { eventBus } from '../../../../js/services/event-bus.service.js';
import emailPreview from './email-preview.cmp.js'

export default {
    template: `
        <section v-if="email" class="email-details">
            <email-preview v-if="email" :email="email" :directory="directory" :isExpand="false" :isDetails="true" />
            <div class="info-container">
                <h3>Subject: <input type="text" v-model="email.subject"></h3>
                <textarea v-model="email.body"></textarea>            
            </div>
            <div class="bigger">
                <i class="fas fa-trash" @click="remove"></i>
                <i class="fas fa-compress" @click="compress"></i>
            </div>
        </section>
    `,
    data() {
        return {
            email: null,
            directory: ''
        };
    },
    methods: {
        loadEmail() {
            emailService.getEmailById(this.$route.params.emailId)
                .then(email => this.email = email);
        },
        remove() {
            emailService.removeEmail(this.email.id, this.directory)
                .then(() => {
                    eventBus.$emit('unreadChanged', 'selectChanged');
                    console.log('Email deleted successfully');
                    this.$router.push('/email/inbox');
                });
        },
        compress() {
            if (this.directory === 'inbox') this.$router.push('/email/inbox');
            else this.$router.push('/email/sent');
        }
    },
    created() {
        this.directory = emailService.findDirectory(this.$route.params.emailId).directory;
        this.loadEmail();
    },
    components: {
        emailPreview
    }
};