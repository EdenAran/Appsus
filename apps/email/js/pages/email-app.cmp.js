import { emailService } from '../services/email.service.js';
import emailCompose from '../cmps/email-compose.cmp.js';
import emailFilter from '../cmps/email-filter.cmp.js';
import emailList from '../cmps/email-list.cmp.js';

export default {
    template: `
        <section class="email-app">
            <h2>Email App</h2>
            <email-compose />
            <email-filter @filtered="setFilter" />
            <email-list v-if="emails.length" :emails="emailsToShow" />
        </section>
    `,
    data() {
        return {
            emails: [],
            filterBy: null
        };
    },
    computed: {
        emailsToShow() {
            return this.emails;
        }
    },
    methods: {
        setFilter(filterBy) {
            this.filterBy = filterBy;
        }
    },
    crested() {
        emailService.query()
            .then(emails => this.emails = emails);
    },
    components: {
        emailCompose,
        emailFilter,
        emailList
    }
};