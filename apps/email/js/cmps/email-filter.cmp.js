import { eventBus } from '../../../../js/services/event-bus.service.js';
import { emailService } from '../services/email.service.js';

export default {
    template: `
        <section class="email-filter flex-col">

            <router-link to="/email/compose"><i class="compose fas fa-plus"></i>Compose</router-link>

            <router-link to="/email/inbox"><i class="fas fa-inbox"></i>Inbox<span v-if="numOfInboxUnread"> ({{numOfInboxUnread}})</span></router-link>

            <router-link to="/email/sent"><i class="fas fa-paper-plane"></i>Sent<span v-if="numOfSentUnread"> ({{numOfSentUnread}})</span></router-link>

            <section class="statusRead">
                <button><i class="fas fa-mail-bulk"></i>Is Read</button>
                <i class="fas fa-mail-bulk" @click="emitFilter('statusRead', 'all')"></i>
                <i class="fas fa-envelope-open" @click="emitFilter('statusRead', 'read')"></i>
                <i class="fas fa-envelope" @click="emitFilter('statusRead', 'unread')"></i>
            </section>
            
            <section class="starred">
                <button><i class="fas fa-star-half-alt"></i>Is Favorite</button>
                <i class="fas fa-star-half-alt" @click="emitFilter('starred', 'all')"></i>
                <i class="fas fa-star" @click="emitFilter('starred', 'favorite')"></i>
                <i class="far fa-star" @click="emitFilter('starred', 'unfavorite')"></i>
            </section>

        </section>
    `,
    data() {
        return {
            numOfInboxUnread: 0,
            numOfSentUnread: 0
        };
    },
    methods: {
        loadNumOf() {
            const directory = this.$route.params.directory;
            if (directory === 'inbox') {
                emailService.getNumOf('unread', directory)
                    .then(num => this.numOfInboxUnread = num);
            } else if (directory === 'sent') {
                emailService.getNumOf('unread', directory)
                    .then(num => this.numOfSentUnread = num);
            }
        },
        emitFilter(key, val) {
            this.$emit('filtered', key, val);
        }
    },
    mounted() {
        eventBus.$on('unreadChanged', () => this.loadNumOf());
    },
    watch: {
        '$route.params.directory'() {
            this.loadNumOf();
        }
    },
    created() {
        emailService.getNumOf('unread', 'inbox')
            .then(num => this.numOfInboxUnread = num);
        emailService.getNumOf('unread', 'sent')
            .then(num => this.numOfSentUnread = num);
    }
};