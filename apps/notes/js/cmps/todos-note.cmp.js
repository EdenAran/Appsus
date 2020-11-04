

export default {
    props:['info'],
    template:`
    <section class="todos-note">
        <h3>{{info.title}}</h3>
        <ul>
            <li v-for="todo in todosToDisplay.slice(0,5)">
                {{todo}}
            </li>
            <i class="fas fa-list-ul pointer"></i>
        </ul>
    </section>
    `,
    data(){
        return{
            todo: null
        }
    },
    computed:{
        todosToDisplay(){
            console.log('this.info.input.split(','):', this.info.input.split(','))
            return this.info.input.split(',')
        }
    },
    methods:{

    },
    created(){
        this
    }
}