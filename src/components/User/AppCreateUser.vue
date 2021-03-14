<template>
    <div id="appCreateUser" class="d-flex justify-content-center align-items-center">
        <div class="row w-100 d-flex justify-content-center align-items-center">
            <div class="col-md-12 d-flex justify-content-center align-items-center">
                <div class="col-md-6 d-flex justify-content-center align-items-center">
                    <label class="label col-md-4 d-flex justify-content-end mt-2">Username</label>
                    <input v-model='username' class="col-md-5" id="create-user-input" placeholder="Username" type="text">
                    <div class="col-md-3">
                        <transition name="fade" mode="out-in" appear>
                            <i v-show='username.length > 2' class="fas fa-check ml-3 text-success"></i>
                        </transition>
                    </div>
                </div> 
            </div>
            <div class="col-md-12 d-flex justify-content-center align-items-center mt-3">
                <div class="col-md-6 d-flex justify-content-center align-items-center">
                    <label class="label col-md-4 d-flex justify-content-end mt-2">Task Goal</label>
                    <input v-model='goal' class="col-md-5" id="create-user-input" type="number">
                    <div class="col-md-3">
                        <transition name="fade" mode="out-in" appear>
                            <i v-show='goal > 0' class="fas fa-check text-success ml-4"></i>
                        </transition>
                    </div>
                </div>
            </div>
            <div class="col-md-12 d-flex justify-content-center align-items-center">
                <button v-bind:class="{'waitForUsername': validateNewUserForm()}" v-on:click='createUser' id="create-user-button" class="btn mt-4">Create A User</button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            username: '',
            goal: 0,
            TaskList: [],
        }
    },
    methods: {
        validateNewUserForm(){
            if (this.username.length < 2){
                return true;
            }
            else if (this.goal <= 0){
                return true;
            }
            else{
                return false;
            }
        },
        createUser(){
            let newUser = { username: this.username, goal: this.goal, TaskList: [], token: '' };
            //Creating Token of User
            newUser.token = this.uniqueTokenGenerator();
            //Adding Default Task to User
            newUser.TaskList.push({ title: 'Example', done: false })
            //Updating newUser in State from Store
            this.$store.state.newUser = newUser;
            //Activating Create User Action
            this.$store.dispatch('createUserAsync')
            //Activating Create Token Action
            this.$store.dispatch('createTokenAsync')
            //Removing Username in newUser 
            this.username = ''
            this.goal = 0;
        },
        uniqueTokenGenerator(){
            //Random Number List
            let numbers = (Math.random() * 1000000000000000).toString().split('');

            //Symbol and Letter List
            let complexList = ['$', 'x', '&', 'c', 'A', 'N', '*', 'P', 'd', 'j', 'K', '#', 'O', 'f']

            //Mixing numbers and letters with random indexes
            let uniqueToken = [numbers[Math.ceil(Math.random() * 10)] + complexList[Math.ceil(Math.random() * 10)] + complexList[Math.ceil(Math.random() * 10)] + numbers[Math.ceil(Math.random() * 10)] + numbers[Math.ceil(Math.random() * 10)] + complexList[Math.ceil(Math.random() * 10)]+ complexList[Math.ceil(Math.random() * 10)] + complexList[Math.ceil(Math.random() * 10)] + numbers[Math.ceil(Math.random() * 10)] + numbers[Math.ceil(Math.random() * 10)] + complexList[Math.ceil(Math.random() * 10)]+ complexList[Math.ceil(Math.random() * 10)] + complexList[Math.ceil(Math.random() * 10)] + numbers[Math.ceil(Math.random() * 10)] + numbers[Math.ceil(Math.random() * 10)] + complexList[Math.ceil(Math.random() * 10)]+ complexList[Math.ceil(Math.random() * 10)]].join('');
            return uniqueToken
        }
    }
}
</script>

<style scoped>
#appCreateUser{
    height: 634px;
    overflow-y: hidden;
    overflow-x: hidden;
    background: url('../../assets/Background-Gradient.jpg');
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
}

#create-user-input{
    padding-left: 10px;
    width: 300px;
    height: 55px;
    border: 0px;
    border-bottom: 1px solid black;
    background-color: white !important;
    color: black !important;
    transition: all 0.3s;
}

#create-user-input::placeholder{
    color: gray !important;
}

#create-user-input:focus,
#create-user-input:active,
#create-user-input:visited{
    border: 1px solid lightgray;
    border-radius: 20px;
    box-shadow: 6px 4px 5px 1px rgb(88, 88, 88) !important;
    outline: 0px !important;
    transition: all 0.3s;
}

#create-user-button{
    background-color: rgb(28, 149, 158) !important;
    width: 180px;
    height: 55px;
    border-radius: 6px;
    color: white;
}

#create-user-button:hover{
    box-shadow: 0px 0px 10px 5px rgb(21, 103, 109);
    transition: all 0.3s;
}

.waitForUsername{
    pointer-events: none;
    opacity: 50%;
    transition: all 0.4s;
}

.fade-enter-active{
    animation: fade-in ease-in-out forwards 0.5s;
}

.fade-leave-active{
    animation: fade-out ease-in-out forwards 0.5s;
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