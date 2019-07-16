import Vue from 'vue';
import Vuex from 'vuex';
//import todoList from './data/todo-list.js';  //not use. load from db instead.
import _ from 'lodash';
import dbop from './dbOperation.js';  //db operations

Vue.use(Vuex);

let storeInstance = null;

//=============  [s] db
//== db execute 
dbop.dbOpen()
.then( () => {
  dbop.dbInit();
});

//=============  [e] db


export default new Vuex.Store({
  state: {
    user: {},
    todoList: [] 
  },

  getters: {
    getItemIndexBySeq: (state) => (seq) => {
      return _.findIndex(state.todoList, function(o) { return o.seq == seq; })
    },
    getItemBySeq: (state) => (seq) => {
      return _.find(state.todoList, function(o) { return o.seq == seq; })
    }
  },

  actions: {
    userLogged ({commit}, user) {
      commit('USER_LOGGED', user);
    }
  },

  mutations: {
    USER_LOGGED (state, user) {
      state.user = user;
    },
    INIT_ITEM(state) {
      dbop.dbGetTodoList()
      .then(function(result) {
        console.log('>>> init_item: result=%o', result);
        state.todoList = [];
        state.todoList.push(...result);
      });
    },
    DEL_ITEM(state, seq) {
      let idx = this.getters.getItemIndexBySeq(seq);
      state.todoList.splice(idx,1);
      dbop.dbDelItem(seq);
    },
    UPDATE_ITEM(state, item) {
      if( ! item.seq ) {
        return;
      }
      let oriItem = this.getters.getItemBySeq(item.seq);
      _.extend(oriItem, item);
      dbop.dbUpdateItem(item);
    },
    ADD_ITEM(state, item) {
      state.todoList.push(item);
      dbop.dbAddItem(item);
    }
  },
});