import emailPreview from './email-preview.cmp.js';
import emailStatus from './email-status.cmp.js';

export default {
    props: ['emails'],
    template: `
        <section class="email-list">
            <email-status />
            <ul class="clean-list">
                <li v-for="email in emails" :key="email.id">
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