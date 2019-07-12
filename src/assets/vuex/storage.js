import Vue from 'vue';
import Vuex from 'vuex';
import todoList from './data/todo-list.js';
import _ from 'lodash';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: {},
    todoList: todoList
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
    DEL_ITEM(state, seq) {
      let idx = this.getters.getItemIndexBySeq(seq);
      state.todoList.splice(idx,1);
    },
    UPDATE_ITEM(state, item) {
      if( ! item.seq ) {
        return;
      }
      let oriItem = this.getters.getItemBySeq(item.seq);
      _.extend(oriItem, item);
    },
    ADD_ITEM(state, item) {
      state.todoList.push(item);
    }
  },
});