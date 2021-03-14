<template>
    <div id="appTodoList">
            <div
      v-bind:key='key'
      v-for="(task, key) in taskList"
      class="row w-100 d-flex justify-content-center align-items-center pt-3"
    >
      <div class="row w-100 d-flex justify-content-center align-items-center">
      <transition name='slide' mode="out-in" appear>
        <div class="task col-md-7">
          <div class="row p-3">
            <div class="task-title-collapse w-50 d-flex justify-content-start align-items-center">
              <div class="task-title">{{ task.title }}</div>
            </div>
            <div class="task-info-collapse w-50 d-flex justify-content-between align-items-center">
              <div v-on:click="changeTaskStatus(task, key)" class="task-status d-flex justify-content-center align-items-center">
              <transition name='zoom-fade' mode="out-in" appear>
                <span class="tick" v-if="task.done">
                  <div class="left"></div>
                  <div class="right"></div> 
                </span>
              </transition>
              </div>
              <button
                v-on:click="removeTask(key)"
                class="btn task-delete-button"
              >
                Sil
              </button>
            </div>
          </div>
        </div>
      </transition>
      </div>
      </div>
    </div>
</template>


<script>
import AppTaskForm from './AppTaskForm';
export default {
  data(){
    return{
      newUserKey: '',
    }
  },
  components:{
    AppTaskForm: AppTaskForm,
  },
  created(){
    this.newUserKey = this.$store.state.newUserKey
  },
  computed: {
    taskList() {
        return this.$store.getters.getTaskList;
      },
    
    },
  methods: {
    changeTaskStatus(task, key) {
      //Defining Task Status as Variable
      let taskDone = task.done;
      //Changing Variable - If it's true convert to false, if it is false convert to true
      if (taskDone == true) {
        taskDone = false;
      } else {
        taskDone = true;
      }
      //Defining Task Status and Key to Varible Which In State from Store
      this.$store.state.taskDoneAndKey = taskDone + "," + key;
      //Activating Changing Task Status Action
      this.$store.dispatch("changeTaskStatusAsync");
    },
    removeTask(key) {
      //Sending Key Of Task That Will Remove
      this.$store.state.willRemoveTaskKey = key;
      //Activating Removing Task Action
      this.$store.dispatch("removeTaskAsync");
    },
  },
};
</script>



<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Open+Sans&display=swap');

#appTodoList{
  font-family: 'Open Sans', sans-serif;
  min-height: 600px;
  overflow-x: hidden;
}

.task {
  width: 100%;
  height: 100%;
  border: 1px solid rgb(165, 192, 197);
  border-radius: 10px;
}

.task-title{
  font-size: 19px;
}

.task-status {
  width: 40px;
  height: 40px;
  background-color: rgb(28, 149, 158);
  border-radius: 20px;
}
.left {
  background-color: aquamarine;
  width: 25px;
  height: 4px;
  transform: rotate(50deg);
}
.right {
  background-color: aquamarine;
  width: 25px;
  height: 4px;
  transform: rotate(-60deg);
  margin-top: -25%;
}

.task-delete-button{
  border: 1px solid #da837d;
  width: 45px;
  height: 45px;
  border-radius: 5px;
  font-size: 17px;
  color: rgb(22, 112, 126) !important;
}

.task-delete-button:hover{
  background-color: #ec6258;
  color: white !important;
}

@media only screen and (max-width: 700px){
  .task{
    width: 90%;
  }
  .task-title{
    font-size: 16.5px !important;
  }
  .task-status{
    width: 30%;
    margin-left: 10%;
  }
}


/* Animasyonlar */
.zoom-fade-enter-active{
  animation: zoom-fade-in ease-in-out forwards 0.3s;
}

.zoom-fade-leave-active{
  animation: zoom-fade-out ease-in-out forwards 0.3s;
} 

@keyframes zoom-fade-in{
  from{
    opacity: 0;
  }
  to{
    opacity: 1;
    }
}

@keyframes zoom-fade-out{
  from{
    opacity: 1;
  }
  to{
    opacity: 0;
    }
}

.slide-enter-active{
  animation: slide-left ease-in-out forwards 0.7s;
}

.slide-leave-active{
  animation: slide-right ease-in-out forwards 0.7s;
}

@keyframes slide-left{
  from{
    opacity: 0;
    transform: translateX(1000px);
  }
  to{
    opacity: 1;
    transform: translateX(0px)
  }
}


@keyframes slide-right{
  from{
    opacity: 0;
    transform: translateX(0);
  }
  to{
    opacity: 1;
    transform: translateX(-1000px)
  }
}
</style>