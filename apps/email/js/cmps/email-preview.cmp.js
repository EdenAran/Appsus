import longText from '../../../../js/cmps/long-text.util-cmp.js';

export default {
    props: ['email'],
    template: `
        <section class="email-preview">
            <h2>Email Preview</h2>
            <h3>Subject: {{email.subject}}</h3>
            <router-link :to="'/email/' + email.id">Details</router-link>
        </section>
    `,
    components: {
        longText
    }
};