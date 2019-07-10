<template>
  <f7-page>
    <f7-navbar large title="Data Detail"  back-link="/"></f7-navbar>
    

    <f7-block-title>Data Detail</f7-block-title>
    <f7-block v-if="item" >
      <f7-row  >
        <f7-col width="30"  >
            seq:
        </f7-col>
        <f7-col width="70"  >
            {{item.seq}}
        </f7-col>
      </f7-row>
      <f7-row  >
        <f7-col width="30"  >
            title:
        </f7-col>
        <f7-col width="70"  >
            {{item.title}}
        </f7-col>
      </f7-row>
      <f7-row  >
        <f7-col width="30"  >
            contents:
        </f7-col>
        <f7-col width="70"  >
            {{item.contents}}
        </f7-col>
      </f7-row>
      <f7-row  >
        <f7-col width="30"  >
            crtnDt:
        </f7-col>
        <f7-col width="70"  >
            {{ item.crtnDt | fTime }}
        </f7-col>
      </f7-row>
      <f7-row  >
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

    

  </f7-page>
</template>
<script>
import TodoList from '../data/todo-list.js';
import _ from 'lodash';

//console.log('>> MyTodoList=%o', MyTodoList);

export default {
  components: {},
  data() {
    const seq = this.$f7route.params.seq;
    let item = _.find(TodoList, function(o) { return o.seq == seq; });

    //console.log('>> TodoList=%o', TodoList );
    //console.log('>> seq=%o', seq );
    //console.log('>> item=%o', item );

    return  { item: item };
  },
  methods: {
    getPic: function(item) {
      return 'https://cdn.framework7.io/placeholder/people-160x160-' + (item.seq % 10) + '.jpg';
    }
  },
  mounted() {
      //console.log('>>%o', this.$f7route.params);
  }

};
</script>