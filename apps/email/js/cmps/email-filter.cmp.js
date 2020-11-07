import { eventBus } from '../../../../js/services/event-bus.service.js';
import { emailService } from '../services/email.service.js';

export default {
    template: `
        <section class="email-filter flex-col">

            <router-link class="comp-btn flex just-center al-center" to="/email/compose"><i class="fas fa-plus"></i> <span>Compose</span></router-link>
            <span class="filter-btn"><i class="fas fa-ellipsis-v" v-show="isSmallScreen" @click="toggleFilter"></i></span>
            <div class="filter-container" v-if="!isSmallScreen || isShowFilter">
                <hr>
                <router-link class="flex" to="/email/inbox"><i class="fas fa-inbox"></i><span>Inbox<span v-if="numOfInboxUnread"> ({{numOfInboxUnread}})</span></span></router-link>
                <router-link class="flex" to="/email/sent"><i class="fas fa-paper-plane"></i><span>Sent<span v-if="numOfSentUnread"> ({{numOfSentUnread}})</span></span></router-link>
                <hr>
                <div class="filter-by">
                    <h4>Filter by:</h4>
                    <section class="statusRead">
                        <div class="filter-opt flex flex-col" v-if="isFilter.read">
                            <i title="All" class="option fas fa-mail-bulk" @click="emitFilter('statusRead', 'all')"></i>
                            <i title="Marked" class="option fas fa-envelope-open" @click="emitFilter('statusRead', 'read')"></i>
                            <i title="Unmarked" class="option fas fa-envelope" @click="emitFilter('statusRead', 'unread')"></i>
                        </div> 
                        <i class="opt-btn fas fa-mail-bulk " @click="toggleOption('read')"><span>  Read</span></i>
                    </section>
                    <section class="starred">
                        <div class="filter-opt flex flex-col" v-if="isFilter.star">
                            <i title="All" class="option fas fa-star-half-alt" @click="emitFilter('starred', 'all')"></i>
                            <i title="Marked" class="option fas fa-star" @click="emitFilter('starred', 'favorite')"></i>
                            <i title="Unmarked" class="option far fa-star" @click="emitFilter('starred', 'unfavorite')"></i>
                        </div>
                        <i class="opt-btn fas fa-star-half-alt" @click="toggleOption('star')"><span>  Favorite</span></i>
                    </section>
                </div>
            </div>

        </section>
    `,
    data() {
        return {
            numOfInboxUnread: 0,
            numOfSentUnread: 0,
            isFilter: {
                star: false,
                read: false
            },
            isSmallScreen: false,
            isShowFilter: false
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
            this.closeOptions()
            this.$emit('filtered', key, val);
        },
        toggleOption(opt) {
            if (opt === 'star') this.isFilter.read = false;
            else this.isFilter.star = false;
            this.isFilter[opt] = !this.isFilter[opt]
        },
        closeOptions() {
            this.isFilter.read = false;
            this.isFilter.star = false;
        },
        handleResize() {
            if (window.innerWidth <= 840) this.isSmallScreen = true;
            else this.isSmallScreen = false
        },
        toggleFilter() {
            this.isShowFilter = !this.isShowFilter;
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
        window.addEventListener('resize', this.handleResize);
        this.handleResize();
    },
    destroyed() {
        window.removeEventListener('resize', this.handleResize);
    }
};