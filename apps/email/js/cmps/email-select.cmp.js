import { eventBus } from '../../../../js/services/event-bus.service.js';
import { emailService } from '../services/email.service.js';

export default {
    props: ['directory'],
    template: `
        <section class="email-status flex">
            <i :class="isSelectIcon" @click="selectAll"></i>
            <h3 v-if="numOfSelect">
                ({{numOfSelect}})
                <i class="fas fa-trash" @click="removeSelected"></i>
                <i class="fas fa-star-half-alt" @click="updatePropertySelected('isStar')"></i>
                <i class="fas fa-mail-bulk" @click="updatePropertySelected('isRead')"></i>
            </h3>
        </section>
    `,
    data() {
        return {
            directoryForChange: '',
            numOfSelect: 0
        };
    },
    computed: {
        isSelectIcon() {
            return this.numOfSelect ? 'fas fa-check-square' : 'far fa-square';
        }
    },
    methods: {
        selectAll() {
            emailService.selectAll(this.directoryForChange)
                .then(this.loadNumOf());
        },
        loadNumOf() {
            emailService.getNumOf('select', this.directoryForChange)
                .then(num => this.numOfSelect = num);
        },
        removeSelected() {
            emailService.removeSelected(this.directoryForChange)
                .then(() => {
                    this.loadNumOf();
                    console.log('All selected emails have been successfully deleted!');
                });
        },
        updatePropertySelected(property) {
            emailService.updatePropertySelected(property, this.directoryForChange)
                .then(() => {
                    this.loadNumOf();
                    console.log('All selected emails have been successfully updated!');
                });
        }
    },
    mounted() {
        eventBus.$on('selectChanged', () => this.loadNumOf());
    },
    created() {
        this.directoryForChange = this.$route.params.directory;
        this.loadNumOf();
    },
    watch: {
        '$route.params.directory'() {
            this.directoryForChange = this.$route.params.directory;
            this.loadNumOf();
        }
    }
};