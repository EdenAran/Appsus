import homePage from './pages/home.cmp.js';
import aboutPage from './pages/about.cmp.js';
import noteApp from '../apps/notes/js/pages/note-app.cmp.js'


const routes = [
    {
        path: '/',
        component: homePage
    },
    {
        path: '/about',
        component: aboutPage
    },
    // {
    //     path: '/email',
    //     component: emailApp
    // },
    {
        path: '/note',
        component: noteApp
    },
//     {
//         path: '/book',
//         component: bookApp
//     },
]

export const myRouter = new VueRouter({ routes });