import { emailService } from '../services/email.service.js';
import { eventBus } from '../../../../js/services/event-bus.service.js';
import emailPreview from './email-preview.cmp.js';
import emailListTitles from './email-list-titles.cmp.js';
import emailStatus from './email-select.cmp.js';

export default {
    template: `
        <section class="email-list">
            <email-status :directory="directory" />
            <email-list-titles @sorted="setSort" />
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
            directory: null,
            sort: { sortBy: '', isDesc: false }
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
        },
        setSort(sortBy) {
            if (this.sort.sortBy === sortBy) this.sort.isDesc = !this.sort.isDesc;
            else this.sort.isDesc = false;
            this.sort.sortBy = sortBy;
        }
    },
    computed: {
        emailsToShow() {
            if (!this.filter) return this.emails;
            const filterTxt = this.filter.searchTerm.toLowerCase();
            const readStatus = this.filter.statusRead;
            const starred = this.filter.starred;
            const filterEmails = this.emails.filter(email => {
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
            let sortEmails = filterEmails;
            if (this.sort.sortBy) {
                sortEmails = filterEmails.sort((a, b) => {
                    const x = (typeof a[this.sort.sortBy] === 'string') ? a[this.sort.sortBy].toLowerCase() : a[this.sort.sortBy];
                    const y = (typeof b[this.sort.sortBy] === 'string') ? b[this.sort.sortBy].toLowerCase() : b[this.sort.sortBy];
                    const mult = (this.sort.isDesc) ? -1 : 1;
                    return (x < y) ? (-1 * mult) : (x > y) ? mult : 0;
                });
            }
            return sortEmails;
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
        emailListTitles,
        emailPreview,
        emailStatus
    }
}