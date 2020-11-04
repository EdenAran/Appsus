import { emailService } from '../services/email.service.js';

export default {
    template: `
        <section class="email-status">
            <h3 v-if="numOfUnread">Num of unread: {{numOfUnread}}</h3>
        </section>
    `,
    data() {
        return {
            numOfUnread: null
        };
    },
    created() {
        emailService.getNumOfUnread()
            .then(num => this.numOfUnread = num);
    }
};