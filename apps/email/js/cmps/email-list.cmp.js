import { emailService } from '../services/email.service.js';
import emailPreview from './email-preview.cmp.js';
import emailStatus from './email-status.cmp.js';
import emailDetails from './email-details.cmp.js';

export default {
    props: ['emails'],
    template: `
        <section class="email-list">
            <email-status />
            <ul class="clean-list">
                <li v-for="email in emails" :key="email.id">
                    <email-preview v-if="!email.isClick" :email="email" @click="updateProperty(email.id, 'isClick')" />
                    <email-details v-else :email="email" @click="updateProperty(email.id, 'isClick')" />
                </li>
            </ul>
        </section>
    `,
    data() {
        return {
            isClick: false
        };
    },
    methods: {
        updateProperty(emailId, property) {
            emailService.updateProperty(emailId, property)
                .then();
        },
    },
    components: {
        emailPreview,
        emailStatus,
        emailDetails
    }
}