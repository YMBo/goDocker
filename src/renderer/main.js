import Vue from 'vue';
import axios from 'axios';
import '@/components/icons';
import {
  Button,
  Form,
  FormItem,
  Input,
  Divider,
  Icon,
  Switch,
  Progress,
  Badge,
  Table
} from 'view-design';
import 'view-design/dist/styles/iview.css';
import App from './App';
import router from './router';
import store from './store';
import './static/common';

Vue.component('Button', Button);
Vue.component('Form', Form);
Vue.component('FormItem', FormItem);
Vue.component('Input', Input);
Vue.component('Divider', Divider);
Vue.component('Icon', Icon);
Vue.component('i-switch', Switch);
Vue.component('Progress', Progress);
Vue.component('Badge', Badge);
Vue.component('Table', Table);

if (!process.env.IS_WEB) {
  Vue.use(require('vue-electron'));
}
Vue.http = Vue.prototype.$http = axios;
Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app');
