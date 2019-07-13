import Vue from 'vue';
import Vuex from 'vuex';
//import todoList from './data/todo-list.js';  //not use. load from db instead.
import _ from 'lodash';

Vue.use(Vuex);

//=============  [s] db
// my db open:
var db = null;
if (window.cordova.platformId === 'browser') {
	db = window.openDatabase('MyDatabase', '1.0', 'Data', 2*1024*1024);
} else {
	db = window.sqlitePlugin.openDatabase({name: 'MyDatabase.db', location: 'default'});
}

// db: table
db.transaction(function(tx) {
  tx.executeSql('CREATE TABLE IF NOT EXISTS TODO (seq integer primary key, title text, contents text, crtnDt integer)');
  
}, function(error) {
  console.log('>> db: Transaction ERROR: ' + error.message);
}, function() {
  console.log('>> db: Populated database OK');
});

// db: data
db.transaction(function(tx) {
  tx.executeSql('SELECT count(*) AS mycount FROM TODO', [], function(tx, rs) {
    let mycount = rs.rows.item(0).mycount;
    if(mycount == 0) {
      //init
      tx.executeSql('INSERT INTO TODO (seq,title,contents,crtnDt) VALUES (?,?,?,?)', [1, 'db,1', 'gg-1', 20190709010000]);
      tx.executeSql('INSERT INTO TODO (seq,title,contents,crtnDt) VALUES (?,?,?,?)', [2, 'db,2', 'gg-2', 20190709020000]);
      tx.executeSql('INSERT INTO TODO (seq,title,contents,crtnDt) VALUES (?,?,?,?)', [3, 'db,3', 'gg-3', 20190709030000]);
      tx.executeSql('INSERT INTO TODO (seq,title,contents,crtnDt) VALUES (?,?,?,?)', [4, 'db,4', 'gg-4', 20190709040000]);
      tx.executeSql('INSERT INTO TODO (seq,title,contents,crtnDt) VALUES (?,?,?,?)', [5, 'db,5', 'gg-5', 20190709050000]);
    } else {
      console.log('>> db:  todo list existed.');
    }
  }, function(tx, error) {
    console.log('>> db: SELECT error: ' + error.message);
  });
});

// db: data
let todoList = [];
db.transaction(function(tx) {
  tx.executeSql('SELECT seq,title,contents,crtnDt FROM TODO order by seq', [], function(tx, rs) {
    let mycount = rs.rows.item(0).mycount;
    _.each(rs.rows, function(item,idx){
      todoList.push(item);
    });
    console.log('>> db:  loading todo list from db. todoList=%o', todoList);
  }, function(tx, error) {
    console.log('>> db: SELECT2 error: ' + error.message);
  });
});

//=============  [e] db


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