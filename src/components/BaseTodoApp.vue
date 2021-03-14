<template>
  <div id="baseTodoApp">
    <AppProgressBar></AppProgressBar>
    <AppTaskForm></AppTaskForm>
    <AppTodoList></AppTodoList>
  </div>
</template>

<script>
import AppProgressBar from './Todo/AppProgressBar';
import AppTodoList from "./Todo/AppTodoList";
import AppTaskForm from "./Todo/AppTaskForm";
export default {
  components: {
    AppProgressBar: AppProgressBar,
    AppTaskForm: AppTaskForm,
    AppTodoList: AppTodoList,
  },
};
</script>


<style scoped>
#baseTodoApp {
  background-color: white;
}

.notification-slide-enter-active {
  animation: slide-left ease-in-out forwards 1s;
}

.notification-slide-leave-active {
  animation: slide-right ease-in-out forwards 0.4s;
}

@keyframes slide-left {
  from {
    transform: translateX(400px);
    opacity: 0;
  }
  to {
    transform: translateX(50px);
    opacity: 1;
  }
}

@keyframes slide-right {
  from {
    transform: translateX(0px);
    opacity: 0;
  }
  to {
    transform: translateX(400px);
    opacity: 1;
  }
}
</style>