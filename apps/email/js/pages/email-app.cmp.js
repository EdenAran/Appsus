import { emailService } from '../services/email.service.js';
import { eventBus } from '../../../../js/services/event-bus.service.js';
import emailCompose from '../cmps/email-compose.cmp.js';
import emailFilter from '../cmps/email-filter.cmp.js';
import emailList from '../cmps/email-list.cmp.js';
import emailHeader from '../cmps/email-header.js';

export default {
    template: `
        <section class="email-app">
            <header>
                <email-header @search="setFilter" />
            </header>
            <main>
                <email-filter @filtered="setFilter" />
                <router-view></router-view>
            </main>
        </section>
    `,
    methods: {
        setFilter(key, val) {
            emailService.setFilter(key, val);
            eventBus.$emit('filterChanged');
        }
    },
    components: {
        emailCompose,
        emailFilter,
        emailList,
        emailHeader
    }
};