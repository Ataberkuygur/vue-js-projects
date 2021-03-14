import Vue from 'vue';
import VueRouter from 'vue-router';
import { store } from './store';
import BaseTodoApp from './components/BaseTodoApp';
import AppCreateUser from './components/User/AppCreateUser';

Vue.use(VueRouter);

const routes = [
    { path: '/', component: BaseTodoApp, beforeEnter(to, from, next){
        if (store.state.userToken == null){
            next('/create-user')
        }
        else{
            next()
        }
    }  },
    { path: '/create-user', component: AppCreateUser },
    { path: '*', redirect: '/' },
]

export const router = new VueRouter({
    routes: routes,
    mode: 'history',
})