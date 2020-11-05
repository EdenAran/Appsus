import emailCompose from '../cmps/email-compose.cmp.js';
import emailFilter from '../cmps/email-filter.cmp.js';
import emailList from '../cmps/email-list.cmp.js';

export default {
    template: `
        <section class="email-app">
            <header>
                <router-link to="/email/compose">Compose</router-link>
            </header>
            <main>
                <router-view></router-view>
            </main>
        </section>
    `,
    data() {
        return {
            isCompose: false
        };
    },
    components: {
        emailCompose,
        emailFilter,
        emailList
    }
};