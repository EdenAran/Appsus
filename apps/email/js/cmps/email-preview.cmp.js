import longText from '../../../../js/cmps/long-text.util-cmp.js';

export default {
    props: ['email'],
    template: `
        <section class="email-preview flex" @click="showDetails">
            <i :class="isReadIcon"></i>
            <h3>Subject: {{email.subject}}</h3>
        </section>
    `,
    computed: {
        isReadIcon() {
            return this.email.isRead ? 'fas fa-envelope-open' : 'fas fa-envelope';
        }
    },
    methods: {
        showDetails() {
            this.$router.push(`/email/${this.email.id}`);
        }
    },
    components: {
        longText
    }
};