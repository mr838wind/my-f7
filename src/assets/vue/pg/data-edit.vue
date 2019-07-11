<template>
  <f7-page>
    <f7-navbar large title="Data New"  back-link="/" v-if=" isNew " ></f7-navbar>
    <f7-navbar large title="Data Edit"  back-link="/" v-else ></f7-navbar>
    

    <f7-block-title v-if=" isNew " >Data New</f7-block-title>
    <f7-block-title v-else >Data Edit</f7-block-title>

    <form class="list" id="edit-form">
      
      <f7-block v-if="item" class="eidt-block" >
        <f7-row  >
           <f7-col width="10" ></f7-col>
          <f7-col width="80"  >
              <f7-button round fill @click="saveItem()" >Save</f7-button> 
          </f7-col>
          <f7-col width="10"></f7-col>
        </f7-row>

        <f7-row v-if="item.seq == 0" >
          <f7-col width="30"  >
              seq:
          </f7-col>
          <f7-col width="70"   >
              {{item.seq}}
          </f7-col>
        </f7-row>
        <f7-row  >
          <f7-col width="30"  >
              title:
          </f7-col>
          <f7-col width="70" style="border:1px solid"  >
              <input name="title" type="text" placeholder="title" v-model="item.title" >
          </f7-col>
        </f7-row>
        <f7-row  >
          <f7-col width="30"  >
              contents:
          </f7-col>
          <f7-col width="70"  style="border:1px solid"  >
              <input name="title" type="text" placeholder="contents" v-model="item.contents" >
          </f7-col>
        </f7-row>
        <f7-row  v-if="item.seq == 0" >
          <f7-col width="30"  >
              crtnDt:
          </f7-col>
          <f7-col width="70"  >
              {{ item.crtnDt | fTime }}
          </f7-col>
        </f7-row>
        <f7-row v-if="item.seq == 0" >
          <f7-col width="30"  >
              image:
          </f7-col>
          <f7-col width="70"  >
              <img :src=" getPic(item) " width="200" />
          </f7-col>
        </f7-row>
      </f7-block>
      <f7-block v-else >
        <p >
            Sorry, cannot find item.
        </p>
      </f7-block>
    </form>

    

  </f7-page>
</template>
<script>
import TodoList from '../data/todo-list.js';
import _ from 'lodash';
import moment from 'moment';

//console.log('>> MyTodoList=%o', MyTodoList);

export default {
  components: {},
  data() {
    const paramSeq = this.$f7route.params.seq;
    let oriItem = _.find(TodoList, function(o) { return o.seq == paramSeq; });
    let item = _.extend({}, oriItem);

    if(this.isNew) {
      item.seq = 0;
    }

    return  { item: item, oriItem: oriItem };
  },
  methods: {
    getPic: function(item) {
      return 'https://cdn.framework7.io/placeholder/people-160x160-' + (item.seq % 10) + '.jpg';
    },
    saveItem: function() {
      console.log('>>save=%o', this.item);
      if( ! confirm('저장하시겠습니까?') ) {
        return;
      }
      
      if(this.isNew) {
        this.item.seq = this.getMaxSeq() + 1;
        this.item.crtnDt = moment().format('YYYYMMDDhhmmss');
        TodoList.push(this.item);
      } else {
        _.extend(this.oriItem, this.item);
      }
    },
    getMaxSeq: function() {
      var result = 0;
      _.forEach(TodoList, function(item, idx) {
         if(item.seq > result) {
           result = item.seq;
         }
      });
      console.log('>> getMaxSeq=%o', result);
      return result;
    }
  },
  computed: {
    isNew: function() {
      return this.$f7route.params.seq == 0;
    }
  },
  mounted() {
      //console.log('>>%o', this.$f7route.params);
  }

};
</script>

<style scodped>
  .eidt-block .row {
    margin-bottom: 10px;
  }
</style>