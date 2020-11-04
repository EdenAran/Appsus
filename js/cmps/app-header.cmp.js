export default {
    template:`
    
    <section class="main-header flex s-between al-center">
       <h1>
           <router-link to="/">Logo</router-link>
       </h1>
        <nav class="main-nav">
            <router-link to="/">Home</router-link>
            <router-link to="/about">About</router-link>
            <router-link to="/note">Notes</router-link>
            <router-link to="/email/list">Emails</router-link>
            <!-- <router-link to="/email">Emails</router-link> -->
        </nav>
    </section>
    `,
}