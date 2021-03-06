import homePage from './pages/home.cmp.js';
import aboutPage from './pages/about.cmp.js';
import emailApp from '../apps/email/js/pages/email-app.cmp.js';
import emailList from '../apps/email/js/cmps/email-list.cmp.js';
import emailDetails from '../apps/email/js/cmps/email-details.cmp.js';
import emailCompose from '../apps/email/js/cmps/email-compose.cmp.js';
import noteApp from '../apps/notes/js/pages/note-app.cmp.js';
import bookApp from '../apps/books/js/pages/book-app.cmp.js'
import bookDetail from '../apps/books/js/pages/book-detail.cmp.js'


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
        children: [
            {
                path: 'compose/:emailTitle?/:emailTxt?/:sendTo?',
                component: emailCompose
            },
            {
                path: 'details/:emailId',
                component: emailDetails
            },
            {
                path: ':directory',
                component: emailList
            }         
        ]
    },
    {
        path: '/note/:title?/:txt?',
        component: noteApp,
    },
    {
        path: '/book',
        component: bookApp
    },
    {
        path: '/book/:bookId',
        component: bookDetail
    },
]

export const myRouter = new VueRouter({ routes });