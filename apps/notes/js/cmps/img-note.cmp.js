

export default {
    props:['info'],
    template:`
    <section class="img-note">
        <h3>{{info.title}}</h3>
        <img :src="info.url" alt="">
    </section>
    `,
    data(){
        return{

        }
    }
}