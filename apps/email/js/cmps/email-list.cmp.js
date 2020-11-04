import emailPreview from './email-preview.cmp.js';
import emailStatus from './email-status.cmp.js';

export default {
    props: ['emails'],
    template: `
        <section class="email-list">
            <h2>Email List</h2>
            <email-status />
            <ul v-for="email in emails" :key="email.id">
                <li>
                    <email-preview :email="email" />
                </li>
            </ul>
        </section>
    `,
    components: {
        emailPreview,
        emailStatus
    }
}