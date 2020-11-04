'use strict';

import { emailService } from '../services/email.service.js';
import emailFilter from '../cmps/amail-filter.cmp.js';
import emailFilter from '../cmps/amail-filter.cmp.js';

export default {
    template: `
        <section class="email-app">
            <h1>Email App</h1>
            <email-filter />
        </section>
    `,
    data() {
        return {
            emails: null
        };
    },
    crested() {
        emailService.query()
            .then(emails => this.emails = emails);
    }
};