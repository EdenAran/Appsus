import { emailService } from '../../services/email.service.js';

export default {
    template: `
        <section class="email-status">
            <h3 v-if="numOfRead || numOfRead === 0">Num of read: {{numOfRead}}</h3>
        </section>
    `,
    data() {
        return {
            numOfRead: null
        };
    },
    created() {
        emailService.getNumOfRead()
            .then(num => this.numOfRead = num);
    }
};

