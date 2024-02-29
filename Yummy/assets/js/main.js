import List from './components/List.js';
import Detail from './components/Detail.js'
(function(){
  'use strict';

  const app = Vue.createApp({
    data() {
      return {
        loading: false,
        page: 'list',
        id: ''
      }
    },
    methods: {
      showShopDetail(id) {
        this.id = id;
        this.page = 'detail';
      },
      backListPage() {
        this.page = 'list';

      }
    }
  });
  app.component('List', List);
  app.component('Detail', Detail);
  app.mount('#app');

})();