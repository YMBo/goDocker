import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  routes: [
    { path: '/', redirect: { name: 'deploy' } },
    {
      path: '/deploy',
      name: 'deploy',
      component: require('@/page/deploy').default
    },
    {
      path: '/dockerlist',
      name: 'dockerlist',
      component: require('@/page/dockerlist').default
    },
    {
      path: '/setting',
      name: 'setting',
      component: require('@/page/setting').default
    }
  ]
});
