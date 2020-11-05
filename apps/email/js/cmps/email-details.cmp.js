import { emailService } from '../services/email.service.js';
import { eventBus } from '../../../../js/services/event-bus.service.js';
// import longText from '../../../../js/cmps/long-text.util-cmp.js';

export default {
    props: ['email'],
    template: `
        <section v-if="email" class="email-details">
            <h3>Subject: {{email.subject}}</h3>
            <p>Body: {{email.body}}</p>
            <i class="fas fa-trash" @click="remove"></i>
            <i class="fas fa-expand" @click="emitExpand"></i>
        </section>
    `,
    // data() {
    //     return {
    //         email: null
    //     };
    // },
    methods: {
        // loadEmail() {
        // emailService.getEmailById(this.$route.params.emailId)
        // emailService.getEmailById(this.email)
        //     .then(email => this.email = email);
        // },
        remove() {
            emailService.removeEmail(this.email.id)
                .then(() => {
                    eventBus.$emit('unreadChanged', 'selectChanged');
                    console.log('Deleted');
                });
        },
        emitExpand() {
            // this.$router.push('/email/list');
            // this.$router.push('/email');
            this.$emit('expand');
        }
    },
    // created() {
    //     this.loadEmail();
    // },
    // components: {
    // longText
    // }
};