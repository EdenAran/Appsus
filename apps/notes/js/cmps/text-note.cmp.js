

export default {
    props: ['info'],
    template: `
    <section class="text-note flex just-center al-center">
        <p>{{info.txt}}</p>
        <i class="fas fa-font pointer"></i>
    </section>
    `
}