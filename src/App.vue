<template>
  <div id="app">
    <transition name="slide" mode="out-in">
      <component v-on:activeComponent='activeComponent = $event' v-bind:is='activeComponent'></component>
    </transition>
  </div>
</template>

<script>
import Survey from './components/Survey';
import Menu from './components/Menu';
export default {
  components: {
    Menu: Menu,
    Survey: Survey,
  },
  data () {
    return {
      activeComponent: 'Menu',
    }
  }
}
</script>

<style scoped>
#app{
  overflow-x: hidden;
}

.slide-enter-active{
  animation: slide-in ease-in-out forwards 0.4s;
}

.slide-leave-active{
  animation: slide-out ease-in-out forwards 0.4s;
}

@keyframes slide-in{
  from{
    transform: translateX(1000px);
    opacity: 0;
  }
  to{
    transform: translateX(0px);
    opacity: 1;
  }
}

@keyframes slide-out{
  from{
    transform: translateX(0px);
    opacity: 1;
  }
  to{
    transform: translateX(-1000px);
    opacity: 0;
  }
}
</style>
