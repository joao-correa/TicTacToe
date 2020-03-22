import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Game from '../views/Game.vue';
import Room from '../views/Room.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/game/:name',
    name: 'game',
    component: Game
  },
  {
    path: '/room/:name',
    name: 'room',
    component: Room
  }
];

const router = new VueRouter({
  routes
});

export default router;
