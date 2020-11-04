import emailPreview from './email-preview.cmp.js';

export default {
    props: ['emails'],
    template: `
        <section class="email-list">
            <h2>Email List</h2>
            <email-status />
            <ul v-for="email in emails" :key="email.id">
                <email-preview :email="email" />
            </ul>
        </section>
    `,
    components: {
        emailPreview
    }
}