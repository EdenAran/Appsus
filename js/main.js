import { myRouter } from './routes.js';
import appHeader from './cmps/app-header.cmp.js';


const options = {
    el: '#app',
    router: myRouter,
    template: `
    <section class="app">
        <header>
            <app-header />
        </header>
        <main>
            <router-view></router-view>
        </main>

    </section>
    `,
    components: {
        appHeader,
    }
}



const app = new Vue(options);

