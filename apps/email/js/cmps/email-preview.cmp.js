import { emailService } from '../services/email.service.js';
import { eventBus } from '../../../../js/services/event-bus.service.js';

export default {
    props: ['email', 'directory', 'isExpand', 'isDetails'],
    template: `
        <section class="email-preview flex s-between" :class="{ unread: !email.isRead }">
            <div class="marks">
                <i :class="isSelectIcon" v-if="!isDetails" @click.stop="updateProperty('isSelect')"></i>
                <i :class="isStarIcon" @click.stop="updateProperty('isStar')"></i>
            </div>
            <section class="email-info flex">
                <template class="email-content" :class="{flex: !isExpand, 'flex-col': isExpand}">
                    <div v-if="email.from" class="email-from"><h3>{{email.from}}</h3></div>
                    <div v-else class="email-from"><h3>{{email.to}}</h3></div>
                    <div class="email-txt" v-if="!isDetails">
                        <h3><span class="email-subject">{{email.subject}}</span> - <span class="email-body">{{bodyToDisplay}}</span></h3>
                    </div>
                </template>
                <div class="email-send-at"><h3>{{sendAtToDisplay}}</h3></div>
            </section>
            <div class="actions">
                <i class="fas fa-expand" v-if="!isDetails" @click.stop="expand"></i>
                <i class="fas fa-trash" v-if="!isDetails" @click.stop="removeEmail"></i>
                <i :class="isReadIcon" @click.stop="updateProperty('isRead')"></i>
                <i class="fas fa-sticky-note" @click.stop="sendToNote"></i>
            </div>
        </section>
    `,
    computed: {
        isReadIcon() {
            return this.email.isRead ? 'fas fa-envelope-open' : 'fas fa-envelope';
        },
        isStarIcon() {
            return this.email.isStar ? 'fas fa-star' : 'far fa-star';
        },
        isSelectIcon() {
            return this.email.isSelect ? 'fas fa-check-square' : 'far fa-square';
        },
        bodyToDisplay() {
            if (!this.isExpand && this.email.body.length > 55) return `${this.email.body.substr(0, 55)}...`;
            else if (this.isExpand && this.email.body.length > 250) return `${this.email.body.substr(0, 250)}...`;
            return this.email.body;
        },
        sendAtToDisplay() {
            const d = new Date(this.email.sendAt);
            if (d.getFullYear() === new Date().getFullYear() && d.getMonth() === new Date().getMonth() && d.getDate() === new Date().getDate()) {
                const hours = (`${d.getHours()}`).padStart(2, 0);
                const minutes = (`${d.getMinutes()}`).padStart(2, 0);
                const ampm = (d.getHours() >= 12) ? 'PM' : 'AM';
                return `${hours}:${minutes} ${ampm}`;
            } else {
                const month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
                return `${month[d.getMonth()]} ${d.getDate()}`;
            }
        }
    },
    methods: {
        expand() {
            this.$router.push(`details/${this.email.id}`);
        },
        updateProperty(property) {
            emailService.updateProperty(this.email.id, property, this.directory)
                .then(email => {
                    console.log(`The "${email.id}" email update was successful`);
                    if (property === 'isRead') eventBus.$emit('unreadChanged', this.directory);
                    if (property === 'isSelect') eventBus.$emit('selectChanged', this.directory);
                });
        },
        removeEmail() {
            emailService.removeEmail(this.email.id, this.directory)
                .then(() => {
                    eventBus.$emit('unreadChanged', 'selectChanged', this.directory);
                    console.log('Email deleted successfully');
                });
        },
        sendToNote() {
            const title = this.email.subject;
            const txt = this.email.body;
            this.$router.push(`/note/${title}/${txt}`);
        }
    }
};