import { emailService } from '../services/email.service.js';
import { eventBus } from '../../../../js/services/event-bus.service.js';
import longText from '../../../../js/cmps/long-text.util-cmp.js';

export default {
    props: ['email'],
    template: `
        <section class="email-preview flex s-between" :class="{ unread: !email.isRead }" @click="showDetails">
            <div class="marks">
                <i :class="isSelectIcon" @click="toggleSelectIcon"></i>
                <i :class="isStarIcon" @click="updateProperty('isStar')"></i>
            </div>
            <table>
                <tr>
                    <td class="email-from"><h3>{{email.from}}</h3></td>
                    <td class="email-text">
                        <h3><span class="email-subject">{{email.subject}}</span> - <span class="email-body">{{bodyToDisplay}}</span></h3>
                    </td>
                    <td class="email-send-at"><h3>{{sendAtToDisplay}}</h3></td>
                </tr>
            </table>
            <div class="actions">
                <i class="fas fa-expand"></i>
                <i class="fas fa-trash" @click="removeEmail"></i>
                <i :class="isReadIcon" @click="updateProperty('isRead')"></i>
            </div>
        </section>
    `,
    data() {
        return {
            isSelect: false
        };
    },
    computed: {
        isReadIcon() {
            return this.email.isRead ? 'fas fa-envelope-open' : 'fas fa-envelope';
        },
        isStarIcon() {
            return this.email.isStar ? 'star fas fa-star' : 'far fa-star';
        },
        isSelectIcon() {
            return this.isSelect ? 'fas fa-check-square' : 'far fa-square';
        },
        bodyToDisplay() {
            if (this.email.body.length > 55) return `${this.email.body.substr(0, 55)}...`;
            return this.email.body;
        },
        sendAtToDisplay() {
            const d = new Date(this.email.sendAt);
            if (d.getFullYear() === new Date().getFullYear() && d.getMonth() === new Date().getMonth() && d.getDate() === new Date().getDate()) {
                const hours = (d.getHours() < 10) ? `0${d.getHours()}` : `${d.getHours()}`;
                const minutes = (d.getMinutes() < 10) ? `0${d.getMinutes()}` : `${d.getMinutes()}`;
                const ampm = (d.getHours() >= 12) ? "PM" : "AM";
                return `${hours}:${minutes} ${ampm}`;
            } else {
                const month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
                return `${month[d.getMonth()]} ${d.getDate()}`;
            }
        }
    },
    methods: {
        toggleSelectIcon() {
            this.isSelect = !this.isSelect;
        },
        showDetails() {
            // this.$router.push(`/email/${this.email.id}`);
        },
        updateProperty(property) {
            emailService.updateProperty(this.email.id, property)
                .then(email => {
                    console.log(`The "${email.id}" email update was successful`);
                    if (property === 'isRead') eventBus.$emit('unreadChanged');
                });
        },
        removeEmail() {
            emailService.removeEmail(this.email.id)
                .then(() => console.log('Email deleted successfully'));
        }
    },
    components: {
        longText
    }
};