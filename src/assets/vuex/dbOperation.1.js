/*
 db operation functions
*/

export default {

  // common db 
  db: null,
  
  // my db open:
  dbOpen: function() {
    return new Promise((resolve, reject) => {
      if (window.cordova.platformId === 'browser') {
        this.db = window.openDatabase('TodoDb', '1.0', 'Data', 2*1024*1024);
        console.log('Open database SUCCESS: browser: ' + JSON.stringify(this.db));
        resolve();
      } else {
        window.sqlitePlugin.openDatabase({name: 'TodoDb.db', location: 'default', 
            androidDatabaseProvider: 'system', androidLockWorkaround: 1 }, (_db) => {
          this.db = _db;
          console.log('Open database SUCCESS: sqlitePlugin: ' + JSON.stringify(this.db));
          resolve();
        }, (error) => {
          console.log('Open database ERROR: sqlitePlugin: ' + JSON.stringify(error));
          reject();
        });
      }
    });
  },
  
  // db: init table,data when not exist.
  dbInit() {
    return new Promise((resolve, reject) => {
      this.db.transaction(function(tx) {
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
          return resolve();
        }, function(tx, error) {
          console.log('>> db: SELECT error: ' + error.message);
          return reject();
        });
      });
    });
  },
  
  
  // db: data
  dbGetTodoList() {
    return new Promise((resolve, reject) => {
      this.db.transaction(function(tx) {
        tx.executeSql('SELECT seq,title,contents,crtnDt FROM TODO order by seq', [], function(tx, rs) {
          let resultList = [];
          _.each(rs.rows, function(item,idx){
            resultList.push(item);
          });
          console.log('>> db:  loading todo list from db. todoList=' +  JSON.stringify(resultList) );
          return resolve(resultList);
        }, function(tx, error) {
          console.log('>> db: SELECT2 error: ' + error.message);
          return reject();
        });
      });
    });
  },
  
  //delete by seq
  dbDelItem(seq) {
    return new Promise((resolve, reject) => {
      this.db.transaction(function(tx) {
        tx.executeSql('delete from TODO where seq = ? ', [seq]);
      }, function(error) {
        console.log('Transaction ERROR: ' + error.message);
        return reject();
      }, function() {
        console.log('dbDelItem OK');
        return resolve();
      });
    });
  },
  
  //update
  dbUpdateItem(item) {
    return new Promise((resolve, reject) => {
      this.db.transaction(function(tx) {
        tx.executeSql('update TODO set title=?,contents=?,crtnDt=?  where seq = ? ', [item.title, item.contents, item.crtnDt, item.seq]);
      }, function(error) {
        console.log('Transaction ERROR: ' + error.message);
        return reject();
      }, function() {
        console.log('dbUpdateItem OK');
        return resolve();
      });
    });
  },
  
  //insert
  dbAddItem(item) {
    return new Promise((resolve, reject) => {
      this.db.transaction(function(tx) {
        tx.executeSql('insert into TODO (title, contents, crtnDt, seq) values (?,?,?,?)', [item.title, item.contents, item.crtnDt, item.seq]);
      }, function(error) {
        console.log('Transaction ERROR: ' + error.message);
        return reject();
      }, function() {
        console.log('dbAddItem OK');
        return resolve();
      });
    });
  }
}

  