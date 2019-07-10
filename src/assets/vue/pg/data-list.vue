<template>
  <f7-page>
    <f7-navbar large title="Data List"  back-link="/"></f7-navbar>
    

    <f7-block-title>Data List</f7-block-title>
    <f7-list media-list>
      <f7-list-item  v-for="(item) in myList" :key="item.seq"
        :link=" '/data-detail/' + item.seq "
        :title="item.title "
        after=""
        :subtitle="item.crtnDt | fTime"
        :text="item.contents "
      >
        <img slot="media" :src=" getPic(item) " width="80" />
      </f7-list-item>
    </f7-list>
    

  </f7-page>
</template>
<script>
import TodoList from '../data/todo-list.js';


//console.log('>> MyTodoList=%o', MyTodoList);

export default {
  components: {},
  data() {
    return  { myList: TodoList };
  },
  methods: {
    getPic: function(item) {
      return 'https://cdn.framework7.io/placeholder/people-160x160-' + (item.seq % 10) + '.jpg';
    }
  },
};
</script>