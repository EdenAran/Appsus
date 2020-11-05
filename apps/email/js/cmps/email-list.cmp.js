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
                    <email-preview v-if="!email.isExpand" :email="email" :isExpand="false" @expand="updateProperty(email.id, 'isExpand')" />
                    <email-preview v-else :email="email" :isExpand="true" @expand="updateProperty(email.id, 'isExpand')" />
                    <!-- <email-details v-else :email="email" :isExpand="true" @expand="updateProperty(email.id, 'isExpand')" /> -->
                </li>
            </ul>
        </section>
    `,
    data() {
        return {
            emails: [],
            isExpand: false,
            directory: null
        };
    },
    methods: {
        updateProperty(emailId, property) {
            emailService.updateProperty(emailId, property)
                .then();
        },
    },
    computed:{
        emailsToShow() {
            if (!this.filterBy) return this.emails;
            const filterTxt = this.filterBy.byTxt.toLowerCase();
            const readStatus = this.filterBy.byRead;
            return this.emails.filter(email => {
                return email.subject.toLowerCase().includes(filterTxt) &&
                    (
                        ((readStatus === 'all' || readStatus === 'read') && email.isRead) ||
                        ((readStatus === 'all' || readStatus === 'unread') && !email.isRead)
                    )
            });
        }
    },
    components: {
        emailPreview,
        emailStatus,
        emailDetails
    },
    created() {
        emailService.query()
            .then(emails => {
                console.log('emails:', emails)
                this.emails = emails
            });
        // this.$route.params
    },

}