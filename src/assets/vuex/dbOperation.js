/*
 db operation functions
*/

import {newPromiseHelper} from 'sql-promise-helper'; 

//var newPromiseHelper = require('sql-promise-helper').newPromiseHelper;




export default {
  db: null,
  helper: null,

  // my db open: not use
  dbOpen: function() {

    let db = null;
    if (window.cordova.platformId === 'browser') {
      db = window.openDatabase('TodoDb.db', '1.0', 'Data', 5*1024*1024);
    } else {
      db = window.sqlitePlugin.openDatabase({name: 'TodoDb.db', location: 'default', androidDatabaseProvider: 'system'});
    }

    this.db = db;
    this.helper = newPromiseHelper(this.db);
    console.log('>> db: dbOpen SUCCESS.');
    return Promise.resolve();

  },
  
  // db: init table,data when not exist.
  dbInit() {

    return this.helper.executeStatement('SELECT count(*) as mycount FROM sqlite_master WHERE type=? AND name=?', ['table', 'TODO'])
    .then((rs) => {
        let mycount = rs.rows.item(0).mycount;
        if(mycount == 0) {
          const tx = this.helper.newBatchTransaction();
          tx.executeStatement('CREATE TABLE IF NOT EXISTS TODO (seq integer primary key, title text, contents text, crtnDt integer)');
          //init
          tx.executeStatement('INSERT INTO TODO (seq,title,contents,crtnDt) VALUES (?,?,?,?)', [1, 'db,1', 'gg-1', 20190709010000]);
          tx.executeStatement('INSERT INTO TODO (seq,title,contents,crtnDt) VALUES (?,?,?,?)', [2, 'db,2', 'gg-2', 20190709020000]);
          tx.executeStatement('INSERT INTO TODO (seq,title,contents,crtnDt) VALUES (?,?,?,?)', [3, 'db,3', 'gg-3', 20190709030000]);
          tx.executeStatement('INSERT INTO TODO (seq,title,contents,crtnDt) VALUES (?,?,?,?)', [4, 'db,4', 'gg-4', 20190709040000]);
          tx.executeStatement('INSERT INTO TODO (seq,title,contents,crtnDt) VALUES (?,?,?,?)', [5, 'db,5', 'gg-5', 20190709050000]);
          console.log('>> db:  create todo table and some init data.');
          return tx.commit();
        } else {
          console.log('>> db:  todo table exists.');
          return Promise.resolve();
        }
    })
    .then(function(){
      console.log('>> db: dbInit SUCCESS.');
    })
    .catch(function(error) {
      console.log('>> db: dbInit ERROR: ' + error.message);
    });
    
  },
  
  
  // db: data
  dbGetTodoList() {
    
    return this.helper.executeStatement('SELECT seq,title,contents,crtnDt FROM TODO order by seq', null)
    .then(function(rs){
      let resultList = [];
      for(let i=0; i<rs.rows.length; i++) {
        let item = rs.rows.item(i);
        resultList.push(item);
      }

      console.log('>> db:  rs.rows=' +  JSON.stringify(rs.rows) );
      console.log('>> db:  loading todo list from db. todoList=' +  JSON.stringify(resultList) );
      return resultList;
    })
    .catch(function(error) {
      console.log('>> db: dbGetTodoList ERROR: ' + error.message);
    });
 
  },
  
  //delete by seq
  dbDelItem(seq) {
    
    const tx = this.helper.newBatchTransaction();
    tx.executeStatement('delete from TODO where seq = ? ', [seq]);
    return tx.commit()
    .then(function(){
      console.log('>> db: dbDelItem SUCCESS.');
    })
    .catch(function(error) {
      console.log('>> db: dbDelItem ERROR: ' + error.message);
    });
    
  },
  
  //update
  dbUpdateItem(item) {
    
    const tx = this.helper.newBatchTransaction();
    tx.executeStatement('update TODO set title=?,contents=?,crtnDt=?  where seq = ? ', [item.title, item.contents, item.crtnDt, item.seq]);
    return tx.commit()
    .then(function(){
      console.log('>> db: dbUpdateItem SUCCESS.');
    })
    .catch(function(error) {
      console.log('>> db: dbUpdateItem ERROR: ' + error.message);
    });
    
  },
  
  //insert
  dbAddItem(item) {
    
    const tx = this.helper.newBatchTransaction();
    tx.executeStatement('insert into TODO (title, contents, crtnDt, seq) values (?,?,?,?)', [item.title, item.contents, item.crtnDt, item.seq]);
    return tx.commit()
    .then(function(){
      console.log('>> db: dbAddItem SUCCESS.');
    })
    .catch(function(error) {
      console.log('>> db: dbAddItem ERROR: ' + error.message);
    });
    
  }


}

  