<template>
  <f7-page>
    <f7-navbar large title="Data Detail"  back-link="/"></f7-navbar>
    
    <!--
    <f7-block-title>Data Detail</f7-block-title>
    -->

    <f7-block v-if="item" class="eidt-block" >
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
//import _ from 'lodash';


export default {
  components: {},
  data() {
    return  { };
  },
  computed: {
    item() {
      const seq = this.$f7route.params.seq;
      return this.$store.getters.getItemBySeq(seq);
    }
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

<style scodped>
  .eidt-block .row {
    margin-bottom: 10px;
  }
</style>