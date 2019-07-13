/*
 db operation functions
*/

export default {
    // my db open:
  dbOpen: function() {
    let db = null;
    if (window.cordova.platformId === 'browser') {
      db = window.openDatabase('TodoDb', '1.0', 'Data', 2*1024*1024);
    } else {
      db = window.sqlitePlugin.openDatabase({name: 'TodoDb.db', location: 'default'});
    }
    return db;
  },
  
  // db: init table,data when not exist.
  dbInit(db) {
    db.transaction(function(tx) {
      tx.executeSql('SELECT count(*) as mycount FROM sqlite_master WHERE type=? AND name=?', ['table', 'TODO'], function(tx, rs) {
        let mycount = rs.rows.item(0).mycount;
        if(mycount == 0) {
          tx.executeSql('CREATE TABLE IF NOT EXISTS TODO (seq integer primary key, title text, contents text, crtnDt integer)');
          //init
          tx.executeSql('INSERT INTO TODO (seq,title,contents,crtnDt) VALUES (?,?,?,?)', [1, 'db,1', 'gg-1', 20190709010000]);
          tx.executeSql('INSERT INTO TODO (seq,title,contents,crtnDt) VALUES (?,?,?,?)', [2, 'db,2', 'gg-2', 20190709020000]);
          tx.executeSql('INSERT INTO TODO (seq,title,contents,crtnDt) VALUES (?,?,?,?)', [3, 'db,3', 'gg-3', 20190709030000]);
          tx.executeSql('INSERT INTO TODO (seq,title,contents,crtnDt) VALUES (?,?,?,?)', [4, 'db,4', 'gg-4', 20190709040000]);
          tx.executeSql('INSERT INTO TODO (seq,title,contents,crtnDt) VALUES (?,?,?,?)', [5, 'db,5', 'gg-5', 20190709050000]);
          console.log('>> db:  create todo table and some init data.');
        } else {
          console.log('>> db:  todo table exists.');
        }
      }, function(tx, error) {
        console.log('>> db: SELECT error: ' + error.message);
      });
    });
  },
  
  
  // db: data
  dbGetTodoList(db) {
    let resultList = [];
    db.transaction(function(tx) {
      tx.executeSql('SELECT seq,title,contents,crtnDt FROM TODO order by seq', [], function(tx, rs) {
        _.each(rs.rows, function(item,idx){
          resultList.push(item);
        });
        console.log('>> db:  loading todo list from db. todoList=%o', resultList);
      }, function(tx, error) {
        console.log('>> db: SELECT2 error: ' + error.message);
      });
    });
    return resultList;
  },
  
  //delete by seq
  dbDelItem(db, seq) {
    db.transaction(function(tx) {
      tx.executeSql('delete from TODO where seq = ? ', [seq]);
    }, function(error) {
      console.log('Transaction ERROR: ' + error.message);
    }, function() {
      console.log('dbDelItem OK');
    });
  },
  
  //update
  dbUpdateItem(db, item) {
    db.transaction(function(tx) {
      tx.executeSql('update TODO set title=?,contents=?,crtnDt=?  where seq = ? ', [item.title, item.contents, item.crtnDt, item.seq]);
    }, function(error) {
      console.log('Transaction ERROR: ' + error.message);
    }, function() {
      console.log('dbUpdateItem OK');
    });
  },
  
  //insert
  dbAddItem(db, item) {
    db.transaction(function(tx) {
      tx.executeSql('insert into TODO (title, contents, crtnDt, seq) values (?,?,?,?)', [item.title, item.contents, item.crtnDt, item.seq]);
    }, function(error) {
      console.log('Transaction ERROR: ' + error.message);
    }, function() {
      console.log('dbAddItem OK');
    });
  }
}

  