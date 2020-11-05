import { eventBus } from '../../../../js/services/event-bus.service.js';
import { emailService } from '../services/email.service.js';

export default {
    template: `
        <section class="email-status">
            <h3 v-if="numOfUnread">inbox ({{numOfUnread}})</h3>
            <h3 v-if="numOfSelect">
                <i class="fas fa-trash" @click="removeAll"></i>
            </h3>
        </section>
    `,
    data() {
        return {
            numOfUnread: 0,
            numOfSelect: 0
        };
    },
    methods: {
        loadNumOf() {
            emailService.getNumOf('unread')
                .then(num => this.numOfUnread = num);
            emailService.getNumOf('select')
                .then(num => this.numOfSelect = num);
        },
        removeAll() {
            emailService.removeAll()
                .then(() => {
                    eventBus.$on('selectChanged', () => this.loadNumOf());
                    console.log('All selected emails have been successfully deleted!');
                });
        }
    },
    mounted() {
        eventBus.$on('unreadChanged', () => this.loadNumOf());
        eventBus.$on('selectChanged', () => this.loadNumOf());
    },
    created() {
        this.loadNumOf();
    }
};