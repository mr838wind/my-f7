<template>
  <f7-page>
    <f7-navbar large title="Data List"  back-link="/"></f7-navbar>
    
    <!--  :link=" '/data-detail/' + item.seq " -->
    <!-- <f7-block-title>Data List</f7-block-title> -->

    <f7-block  >
        <f7-row  >
           <f7-col width="10" ></f7-col>
          <f7-col width="80"  >
              <f7-button round fill @click="newItem()" >New Item</f7-button> 
          </f7-col>
          <f7-col width="10"></f7-col>
        </f7-row>
    </f7-block>

    <f7-list media-list>
      <f7-list-item  v-for="(item) in myList" :key="item.seq"
        title=""
        after=""
        :subtitle="item.crtnDt | fTime"
        :text="item.contents "
      >
        <a slot="media" :href=" '/data-detail/' + item.seq  " >
            <img  :src=" getPic(item) " width="80" />
        </a>
        <a slot="title" :href=" '/data-detail/' + item.seq  " >
            {{item.title}}
        </a>
        <span slot="after">
          <f7-link  icon="fas fa-edit" @click="editItem(item.seq)"  ></f7-link>
          <span style="margin-left:20px;"></span>
          <f7-link  icon="fas fa-trash-alt" @click="deleteItem(item.seq)"  ></f7-link>
        </span>
      </f7-list-item>
    </f7-list>

  </f7-page>
</template>
<script>
import _ from 'lodash';

export default {
  components: {},
  data() {
    return {};
  },
  computed: {
    myList() {
      return this.$store.state.todoList;
    }
  },
  methods: {
    getPic: function(item) {
      return 'https://cdn.framework7.io/placeholder/people-160x160-' + (item.seq % 10) + '.jpg';
    },
    deleteItem: function(seq) {
      if( !confirm('삭제하시겠습니까? seq=' + seq ) ) {
        return;
      }
      console.log('>> deleting seq=%o',seq);
      this.$store.commit('DEL_ITEM', seq);
    },
    editItem: function(seq) {
      this.$f7router.navigate('/data-edit/'+ seq);
    },
    newItem: function() {
      this.$f7router.navigate('/data-edit/0');
    }
  },
};
</script>