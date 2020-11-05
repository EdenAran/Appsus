

export default {
    props: ['info'],
    template: `
    <section class="text-note">
        <h3>{{info.title}}</h3>
        <p>{{info.txt}}</p>
        <i class="fas fa-font pointer"></i>
        
    </section>
    `
}