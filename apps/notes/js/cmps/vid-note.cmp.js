

export default {
    props:['info'],
    template:`
    <section class="vid-note">
        <h3>{{info.title}}</h3>
        <video>
            <source :src="info.url">
        </video>
    </section>
    `,
    created(){
        console.log('s')
    }
}