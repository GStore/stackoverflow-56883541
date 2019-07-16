import Vue from 'vue';
import App from './App.vue';
import VueIdb from 'vue-idb'

Vue.use(VueIdb)

const idb = new VueIdb({
  version: 1,
  database: 'test',
  schemas: [
    { tests: 'id, title, created_at, updated_at' },
  		{ posts: 'id, owner' }
  ]
});

Vue.config.productionTip = false;

new Vue({
  idb: idb,
  render: h => h(App),  
}).$mount('#app');
