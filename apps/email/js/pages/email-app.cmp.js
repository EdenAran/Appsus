import { emailService } from '../services/email.service.js';
import emailCompose from '../cmps/email-compose.cmp.js';
import emailFilter from '../cmps/email-filter.cmp.js';
import emailList from '../cmps/email-list.cmp.js';

export default {
    template: `
        <section class="email-app">
            <button @click="isCompose = true">Compose</button>
            <email-filter @filtered="setFilter" />
            <email-list v-if="!isCompose" :emails="emailsToShow" />
            <email-compose v-else @send="isCompose = false" @back="isCompose = false" />
        </section>
    `,
    data() {
        return {
            emails: [],
            filterBy: null,
            isCompose: false
        };
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
    methods: {
        setFilter(filterBy) {
            this.filterBy = filterBy;
        }
    },
    created() {
        emailService.query()
            .then(emails => {
                console.log('emails:', emails)
                this.emails = emails
            });
    },
    components: {
        emailCompose,
        emailFilter,
        emailList
    }
};