<template>
  <div id="appTaskForm">
    <div
      class="row w-100 d-flex justify-content-center align-items-center"
    >
      <div
        class="task-title-form col-md-5 d-flex justify-content-center align-items-center"
      >
        <input
          v-model="taskTitle"
          v-on:keypress.enter="addTask"
          id="task-title-input"
          class="form-control p-3"
          type="text"
        />
      </div>
      <transition name="fade-grow" mode="out-in" appear>
        <div
          v-if="this.taskTitle != ''"
          id="task-create-form"
          class="task-create-form col-md-12 d-flex justify-content-center mt-2"
        >
          <button v-on:click="addTask" class="btn task-create-button pb-2">
            +
          </button> 
        </div>
      </transition>
        </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      //Task Title Data
      taskTitle: "",
      //Task Default Status Data
      taskDone: false,
    };
  },
  methods: {
    addTask() {
      //Sending Task To Object in State of Store
      this.$store.state.newTask = {
        title: this.taskTitle,
        done: this.taskDone,
      };
      //Activating Adding Task Action
      this.$store.dispatch("addTaskAsync");
      //After Sending Data, Removing Text in The Task Title Input
      document.getElementById('task-title-input').value = '';
      this.taskTitle = ''
    },
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Open+Sans&display=swap");

#appTaskForm {
  background-color: white !important;
}

#task-title-input {
  width: 300px;
  padding: 5px;
  border: 1px solid rgb(28, 149, 158);
  border-radius: 50px;
  color: black !important;
  font-family: "Open Sans", sans-serif;
  transition: all 0.2s;
}

#task-title-input:focus,
#task-title-input:active,
#task-title-input:visited {
  width: 500px;
  padding: 25px;
  background-color: rgb(28, 149, 158);
  color: white !important;
  font-size: 18px;
  transition: all 0.4s;
}

.task-create-button {
  background-color: #d46e66;
  color: white !important;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 45px;
  border-radius: 18px;
  font-size: 20px;
}

.task-create-button:hover {
  box-shadow: 0px 0px 10px 5px #c97873;
  transition: all 0.3s;
}


/* Animasyonlar */


.fade-grow-enter-active {
  animation: fade-grow-in ease-in-out forwards 0.3s;
}

.fade-grow-leave-active {
  animation: fade-grow-out ease-in-out forwards 0.3s;
}

@keyframes fade-grow-in {
  from {
    opacity: 0;
    width: 0px;
    height: 0px;
  }
  to {
    opacity: 1;
    width: 40px;
    height: 45px;
  }
}

@keyframes fade-grow-out {
  from {
    opacity: 1;
    width: 40px;
    height: 45px;
  }
  to {
    opacity: 0;
    width: 0px;
    height: 0px;
  }
}
</style>