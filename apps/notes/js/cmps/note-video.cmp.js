

export default {
    props:['info'],
    template:`
    <section class="vid-note">
        <h3>{{info.title}}</h3>
        <iframe :src="info.url" referrerpolicy="no-referrer"></iframe>
    </section>
    `,
    created(){
        console.log('s')
    }
}