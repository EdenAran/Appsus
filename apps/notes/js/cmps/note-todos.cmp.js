

export default {
    props: ['info', 'isEdit'],
    template: `
        <section class="note-todos">
            <ul>
                <template v-if="!isEdit">
                    <h3>{{info.title}}</h3>
                    <li v-for="(todo, idx) in this.info.todos" v-if="!isTodoDone(idx)" :key="todo.id">
                    {{todo.txt}}
                    </li>
                    <li class="done" v-for="(todo, idx) in this.info.todos" v-if="isTodoDone(idx)" :key="todo.id">
                        {{todo.txt}}
                    </li>
                    <i class="icon fas fa-list-ul pointer"></i>
                </template>
                <template v-else>
                    <input ref="title" class="title" type="text" v-model="info.title">
                    <i class="far fa-plus-square" @click="emitAddTodo"></i>
                    <li v-for="(todo, idx) in this.info.todos" v-if="!isTodoDone(idx)" :key="todo.id">
                        <i class="fas fa-trash" @click="emitDeleteLine(idx)"></i>
                        <i class="far fa-check-square" @click="markDoneTodo(idx)"></i>
                        <input type="text" v-model="todo.txt">
                    </li>
                    <hr>
                    <li class="done" v-for="(todo, idx) in this.info.todos" v-if="isTodoDone(idx)" :key="todo.id">
                        <i class="fas fa-trash" @click="emitDeleteLine(idx)"></i>
                        <i class="fas fa-check-square" @click="toggleIsDone(idx)"></i>
                        <input type="text" v-model="todo.txt">
                        <span class="doneAt">{{doneDateToDisplay(idx)}}</span>
                    </li>
                </template>    
            </ul>
        </section>
    `,
    methods: {
        toggleIsDone(idx) {
            this.info.todos[idx].isDone = !this.info.todos[idx].isDone;
        },
        isTodoDone(idx) {
            return this.info.todos[idx].isDone
        },
        doneDateToDisplay(idx) {
            const d = new Date(this.info.todos[idx].doneAt);
            if (d.getFullYear() === new Date().getFullYear() && d.getMonth() === new Date().getMonth() && d.getDate() === new Date().getDate()) {
                const hours = (`${d.getHours()}`).padStart(2, 0);
                const minutes = (`${d.getMinutes()}`).padStart(2, 0);
                const ampm = (d.getHours() >= 12) ? 'PM' : 'AM';


                return `${hours}:${minutes} ${ampm}`;
            } else {
                const month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
                return `${month[d.getMonth()]} ${d.getDate()}`;
            }
        },
        markDoneTodo(idx) {
            this.info.todos[idx].doneAt = Date.now();
            this.toggleIsDone(idx)
        },
        emitAddTodo() {
            this.$emit('addTodo')
        },
        emitDeleteLine(idx) {
            this.$emit('deleteLine', idx)
        }
    },
    mounted() {
        if (this.isEdit) setTimeout(() => {
            this.$refs.title.focus()
            this.$refs.title.select()
        }, 0);
    }
}