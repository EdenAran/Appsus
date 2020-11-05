import { emailService } from '../services/email.service.js';
import emailFilter from '../cmps/email-filter.cmp.js';
import emailPreview from './email-preview.cmp.js';
import emailStatus from './email-status.cmp.js';
import emailDetails from './email-details.cmp.js';

export default {
    template: `
        <section class="email-list">
            <email-filter @filtered="setFilter" />
            <email-status />
            <ul class="clean-list">
                <li v-for="email in emailsToShow" :key="email.id" class="pointer">
                    <email-preview v-if="!email.isExpand" :email="email" :isExpand="false" @click.native="updateProperty(email.id, 'isExpand')" />
                    <email-preview v-else :email="email" :isExpand="true" @click.native="updateProperty(email.id, 'isExpand')" />
                </li>
            </ul>
        </section>
    `,
    data() {
        return {
            emails: [],
            isExpand: false,
            filterBy: null,
            directory: null
        };
    },
    methods: {
        updateProperty(emailId, property) {
            emailService.updateProperty(emailId, property)
                .then();
        },
        setFilter(filterBy) {
            this.filterBy = filterBy;
        }
    },
    computed: {
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
    created() {
        emailService.query()
            .then(emails => {
                console.log('emails:', emails);
                this.emails = emails;
            });
        this.directory = this.$route.params.id;
    },
    components: {
        emailFilter,
        emailPreview,
        emailStatus,
        emailDetails
    }
}