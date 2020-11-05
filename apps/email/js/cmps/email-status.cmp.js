import { eventBus } from '../../../../js/services/event-bus.service.js';
import { emailService } from '../services/email.service.js';

export default {
    template: `
        <section class="email-status">
            <h3 v-if="numOfUnread">inbox ({{numOfUnread}})</h3>
        </section>
    `,
    data() {
        return {
            numOfUnread: null
        };
    },
    methods: {
        loadNumOfUnread() {
            emailService.getNumOfUnread()
                .then(num => this.numOfUnread = num);
        }
    },
    mounted() {
        eventBus.$on('unreadChanged', () => this.loadNumOfUnread());
    },
    created() {
        this.loadNumOfUnread();
    }
};