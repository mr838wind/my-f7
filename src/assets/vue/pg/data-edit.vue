<template>
  <f7-page>
    <f7-navbar large title="Data New"  back-link="/" v-if=" isNew " ></f7-navbar>
    <f7-navbar large title="Data Edit"  back-link="/" v-else ></f7-navbar>
    
    <!-- 
    <f7-block-title v-if=" isNew " >Data New</f7-block-title>
    <f7-block-title v-else >Data Edit</f7-block-title>
    -->

    <form class="list" id="edit-form">
      
      <f7-block v-if="item" class="eidt-block" >
        <f7-row  >
           <f7-col width="10" ></f7-col>
          <f7-col width="80"  >
              <f7-button round fill @click="saveItem()" >Save</f7-button> 
          </f7-col>
          <f7-col width="10"></f7-col>
        </f7-row>

        <f7-row v-if=" ! isNew" >
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
        <f7-row  v-if=" ! isNew" >
          <f7-col width="30"  >
              crtnDt:
          </f7-col>
          <f7-col width="70"  >
              {{ item.crtnDt | fTime }}
          </f7-col>
        </f7-row>
        <f7-row v-if=" ! isNew" >
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
import _ from 'lodash';
import moment from 'moment';

export default {
  components: {},
  data() {
    return  {  };
  },
  computed: {
    todoList() {
      return this.$store.state.todoList;
    },
    paramSeq() {
      return this.$f7route.params.seq;
    },
    isNew: function() {
      return this.paramSeq == 0;
    },
    oriItem() {
      return this.$store.getters.getItemBySeq(this.paramSeq);
    },
    item() {
      let item = _.extend({}, this.oriItem);
      if(this.isNew) {
        item.seq = 0;
      }
      return item;
    }
  },
  methods: {
    getPic: function(item) {
      return 'https://cdn.framework7.io/placeholder/people-160x160-' + (item.seq % 10) + '.jpg';
    },
    saveItem: function() {
      console.log('>>save=%o', this.item);
      
      //validation
      if( ! this.validateItem() ) {
        return;
      }
      
      if( ! confirm('저장하시겠습니까?') ) {
        return;
      }
      
      if(this.isNew) {
        this.item.seq = this.getMaxSeq() + 1;
        this.item.crtnDt = moment().format('YYYYMMDDhhmmss');
        this.$store.commit('ADD_ITEM', this.item);
      } else {
        this.$store.commit('UPDATE_ITEM', this.item);
      }

      this.$f7router.back();

    },
    validateItem: function() {
      if( ! this.isNew ) {
        if( ! this.item.seq ) {
          alert('seq is null');
          return false;
        }
      }

      if( ! this.item.title ) {
          alert('title is null');
          return false;
      }

      if( ! this.item.contents ) {
          alert('contents is null');
          return false;
      }

      return true;
    },
    getMaxSeq: function() {
      var result = 0;
      _.forEach(this.todoList, function(item, idx) {
         if(item.seq > result) {
           result = item.seq;
         }
      });
      console.log('>> getMaxSeq=%o', result);
      return result;
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