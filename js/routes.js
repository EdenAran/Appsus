import homePage from './pages/home.cmp.js';
import aboutPage from './pages/about.cmp.js';
import emailApp from '../apps/email/js/pages/email-app.cmp.js';
// import emailList from '../apps/email/js/cmps/email-list.cmp.js';
// import emailDetails from '../apps/email/js/cmps/email-details.cmp.js';
// import emailCompose from '../apps/email/js/cmps/email-compose.cmp.js';
import noteApp from '../apps/notes/js/pages/note-app.cmp.js';


const routes = [
    {
        path: '/',
        component: homePage
    },
    {
        path: '/about',
        component: aboutPage
    },
    {
        path: '/email',
        component: emailApp,
        // children: [
        //     {
        //         path: 'list',
        //         component: emailList
        //     },
        //     {
        //         path: ':emailId',
        //         component: emailDetails
        //     }
        // ]
    },
    // {
    //     path: '/email/:emailId',
    //     component: emailDetails
    // },
    {
        path: '/note',
        component: noteApp
    }
]

export const myRouter = new VueRouter({ routes });