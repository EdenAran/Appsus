import { emailService } from '../services/email.service.js';
import { eventBus } from '../../../../js/services/event-bus.service.js';
import emailPreview from './email-preview.cmp.js';
import emailStatus from './email-select.cmp.js';

export default {
    template: `
        <section class="email-list">
            <email-status :directory="directory" />
            <ul class="clean-list">
                <li v-for="email in emailsToShow" :key="email.id" class="pointer">
                    <email-preview v-if="!email.isExpand" :email="email" :directory="directory" :isExpand="false" @click.native="updateProperty(email.id, 'isExpand')" />
                    <email-preview v-else :email="email" :directory="directory" :isExpand="true" :isDetails="false" @click.native="updateProperty(email.id, 'isExpand')" />
                </li>
            </ul>
        </section>
    `,
    data() {
        return {
            emails: [],
            isExpand: false,
            filter: null,
            directory: null
        };
    },
    methods: {
        loadData() {
            this.directory = this.$route.params.directory;
            emailService.query(this.directory)
                .then(emails => {
                    // console.log('emails:', emails);
                    this.emails = emails;
                });
            this.filter = emailService.getFilter();
        },
        updateProperty(emailId, property) {
            emailService.updateProperty(emailId, property, this.directory)
                .then();
        }
    },
    computed: {
        emailsToShow() {
            if (!this.filter) return this.emails;
            const filterTxt = this.filter.searchTerm.toLowerCase();
            const readStatus = this.filter.statusRead;
            const starred = this.filter.starred;
            return this.emails.filter(email => {
                return email.subject.toLowerCase().includes(filterTxt) &&
                    (
                        ((readStatus === 'all' || readStatus === 'read') && email.isRead) ||
                        ((readStatus === 'all' || readStatus === 'unread') && !email.isRead)
                    ) &&
                    (
                        ((starred === 'all' || starred === 'favorite') && email.isStar) ||
                        ((starred === 'all' || starred === 'unfavorite') && !email.isStar)
                    )
            });
        }
    },
    created() {
        this.loadData();
    },
    mounted() {
        eventBus.$on('filterChanged', () => this.loadData());
    },
    watch: {
        '$route.params.directory'() {
            this.loadData();
        }
    },
    components: {
        emailPreview,
        emailStatus
    }
}