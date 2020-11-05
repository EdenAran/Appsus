export default {
    template: `
    
    <section class="main-header flex s-between al-center">
        <h1>
           <router-link to="/">Logo</router-link>
        </h1>
        <i class="toggle-menu fas fa-bars" :class="toggleClass" @click="toggleMenu"></i>
        <nav class="main-nav flex" :class="menuClass">
            <router-link to="/"  v-show="showMenu">Home</router-link>
            <router-link to="/about"  v-show="showMenu">About</router-link>
            <a class="app-nav-container pointer" @click="toggleShowApps"  v-show="showMenu">Apps
                <div class="app-nav" v-show="showApps" >
                    <router-link @click.native.stop="closeMenus" to="/note" ><i class="far fa-sticky-note"></i></router-link>
                    <router-link @click.native.stop="closeMenus" to="/email/inbox" ><i class="far fa-envelope"></i></router-link>
                </div>
            </a>
            <!-- <router-link to="/email/list">Emails</router-link> -->
        </nav>
    </section>
    `,
    data() {
        return {
            showApps: false,
            showMenu: false
        }
    },
    methods: {
        toggleShowApps() {
            this.showApps = !this.showApps;
        },
        toggleMenu() {
            this.showMenu = !this.showMenu;
            console.log(this.showMenu)
            console.log(this.showApps)
            if(this.showApps) {
                console.log('this.showApps:', this.showApps)
                this.showApps = false;}
        },
        closeMenus() {
            this.showApps = false;
            this.showMenu = false;
        }
    },
    computed: {
        toggleClass() {
            return { open: this.showMenu };
        },
        menuClass() {
            return { shrink: !this.showMenu };
        }
    }
}