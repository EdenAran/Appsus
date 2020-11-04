'use strict';

import { emailService } from '../services/email.service.js';
import emailFilter from '../cmps/amail-filter.cmp.js';
import emailList from '../cmps/amail-list.cmp.js';

export default {
    template: `
        <section class="email-app">
            <h2>Email App</h2>
            <email-filter />
            <email-list v-if="emails.length" :emails="emailsToShow" />
        </section>
    `,
    data() {
        return {
            emails: []
        };
    },
    computed: {
        emailsToShow() {
            return this.emails;
        }
    },
    crested() {
        emailService.query()
            .then(emails => this.emails = emails);
    },
    components: {
        emailFilter,
        emailList
    }
};