import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import { router } from './router';

Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
        //User
            newUser: {},
            newUserKey: '',
            userToken: '',
            //Performance
            userGoal: 0,
            finishedTaskList: [],
            dailyPerformance: 0,

        //Task
            //Task List
            taskList: [],
            //Status and Key Of Task That Will Change
            taskDoneAndKey: '',
            //Key Of Task That Will Remove
            willRemoveTaskKey: '',
            //New Task
            newTask: {},
    },
    getters: {
        //User
            getDailyPerformance(state){
                return state.dailyPerformance;
            },
        //Create New Token
            getUser(state){
                return state.newUser;
            },
            getToken(state){
                return state.userToken;
            },
        //Task
            //Function That Get The Task List
            getTaskList(state) {
                if (state.userToken){
                    let userToken = state.userToken.split(',')[0]
                    let userKey = state.userToken.split(',')[1]
                axios.get('/UserList/'+userKey+'/TaskList.json').then(response => {
                    state.taskList = response.data;
                })
            }
            return state.taskList;
            },
    },
    mutations: {
        //User
            //Creating User
            createUser(state){
                axios.post('/UserList.json', state.newUser).then(response => {
                    state.newUserKey = response.data.name;
                    state.newUser.token += ',' + state.newUserKey
                    state.userToken = state.newUser.token
                    localStorage.setItem('token', state.userToken)
                    router.push('/')
                })
            },
            //Creating Token
            createToken(state){
                let token = localStorage.getItem('token');
                state.userToken = token;
            },
            //Updating Progress Bar
            updateDailyPerformance(state){
                let userKey = localStorage.getItem('token').split(',')[1]
                if (userKey != NaN || userKey != null || userKey != ''){
                    axios.get('/UserList/'+userKey+'/goal.json').then(response => {
                        state.userGoal = parseInt(response.data)
                    })
                    axios.get('/UserList/'+userKey+'/TaskList.json').then(response => {
                        state.taskList = response.data;
                    })
                }
                for (let taskKey in state.taskList){
                    let task = {};
                    axios.get('/UserList/'+userKey+'/TaskList/'+taskKey+'.json').then(response => {
                        task = response.data;
                        if (task.done == true){
                            if (!state.finishedTaskList.includes(taskKey)){
                                state.finishedTaskList.push(taskKey)
                            }
                        }  
                    })
                }
                let performance = parseInt(( state.finishedTaskList.length / state.userGoal ) * 100)
                state.dailyPerformance = performance;
            },
            //Logout
            Logout(state){
            if (localStorage.getItem('token') != null){
                let token = localStorage.getItem('token')
                let userKey = token.split(',')[1]
                axios.delete('/UserList/'+userKey+'.json')
                localStorage.removeItem('token')
                state.userToken = '';
            }
        },
        //Task
            //Adding New Task - Send Post Request with Axios
            addTask(state) {
                if (state.userToken){
                    let userToken = state.userToken.split(',')[0]
                    let userKey = state.userToken.split(',')[1]
                    axios.post('/UserList/'+userKey+'/TaskList.json', state.newTask).then(response => response)
                }
            },
            //Changing Task Status
            changeTaskStatus(state) {
                let userToken = state.userToken.split(',')[0]
                let userKey = state.userToken.split(',')[1]
                //Splitting The String That Coming With Task Status and Key
                let taskDoneAndKeyList = state.taskDoneAndKey.split(',')
                //Task Status
                let taskDone = taskDoneAndKeyList[0]
                //Task Key
                let key = taskDoneAndKeyList[1]
                axios.put('/UserList/'+userKey+'/TaskList/'+ key + '/done.json', taskDone)
                setTimeout(() => {
                    location.reload();
                }, 1300)
            },
            //Removing Task
            removeTask(state) {
                let userToken = state.userToken.split(',')[0]
                let userKey = state.userToken.split(',')[1]
                //Defining Key Of Task That Will Remove
                let key = state.willRemoveTaskKey;
                axios.delete('/UserList/'+userKey+'/TaskList/'+ key + '.json')
            },

    },
    actions: {
        //Page
            stayAllTime({ commit, dispatch }){
                let token = localStorage.getItem('token')
                if (token != '' && token != NaN){
                    commit('createToken')
                }
                else{
                    return false;
                }
            },
        //User
            createUserAsync({ commit }){
                commit('createUser')
            },
            createTokenAsync({ commit }){
                commit('createToken')
            },
            updateDailyPerformanceAsync({ commit }){
                commit('updateDailyPerformance')
            },
            LogoutAsync({ commit }){
                commit('Logout')
            },
        //Task
            addTaskAsync({ commit }) {
                //Activating Adding Task Mutation Function
                commit('addTask')
            },
            changeTaskStatusAsync({ commit }) {
                //Activating Changing Task Status Mutation Function
                commit('changeTaskStatus')
            },
            removeTaskAsync({ commit }) {
                //Activating Remove Task Mutation Function
                commit('removeTask')
            }
    },
})