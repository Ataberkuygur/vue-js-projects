<template>
  <div id="app">
    <TheHeader></TheHeader>
    <transition name='fade' mode="out-in" appear>
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
//Importing Components
import TheHeader from './components/Include/TheHeader.vue';
import BaseTodoApp from "./components/BaseTodoApp";
export default {
  components: {
    TheHeader: TheHeader,
    BaseTodoApp: BaseTodoApp,
  },
  created(){
    //Do Dot Delete Token When Page Refreshed
    this.$store.dispatch('stayAllTime')
    //If token is none, bring the Create User Page
    if (this.$store.state.userToken == null){
      this.$router.push('/create-user')
    }
  },
  computed:{
    //Get User Token
    token(){
      return this.$store.state.userToken;
    }
  }
};
</script>

<style >
@import url('https://fonts.googleapis.com/css2?family=Open+Sans&display=swap');
#app{
  background-color: #198a79;
  min-height: 600px;
  font-family: 'Open Sans', sans-serif;
}


.fade-enter-active{
    animation: fade-in ease-in-out forwards 0.4s;
}

.fade-leave-active{
    animation: fade-out ease-in-out forwards 0.4s;
}

@keyframes fade-in{
    from{
        opacity: 0;
    }
    to{
        opacity: 1;
    }
}

@keyframes fade-out{
    from{
        opacity: 1;
    }
    to{
        opacity: 0;
    }
}
</style>
