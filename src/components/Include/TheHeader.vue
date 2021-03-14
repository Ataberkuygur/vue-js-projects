<template>
    <div id="theHeader" class="navbar navbar-expand-sm navbar-light bg-light"> 
        <div class="container">
            <router-link tag="a" to='/' class="navbar-brand text-white">Todo App</router-link>
            <button class="navbar-toggler" data-toggle='collapse' data-target='navbarCollapse'>
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarCollapse">
                <ul v-if="this.$store.state.userToken != null" class="navbar-nav ml-auto">
                    <li class="nav-item">
                        <router-link tag="a" to="/" class="nav-link">Todo List</router-link>
                    </li>
                    <li class="nav-item">
                        <a v-on:click='Logout' class="nav-link">Logout</a>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    methods: {
        Logout(){
            //Activation Logout Action
            this.$store.dispatch('LogoutAsync');
            //Refreshing Page
            location.reload();
        }
    }
}
</script>

<style scoped>
.navbar{
    background: url('../../assets/Background-Navbar.jpg');
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
}

.navbar-brand{
    font-weight: 600;
    font-size: 25px !important;
    letter-spacing: 0.6px;
    text-shadow: 3px 3px rgb(21, 82, 82);
}

.nav-link{
    cursor: pointer;
    color: rgb(199, 199, 199) !important;
    font-size: 17px;
}

.nav-link:hover{
    color: aliceblue !important;
}
</style>