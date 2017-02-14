angular.module('book-store')
  .factory('AuthService', ['$http', '$webSql', function($http, $webSql) {

    var db = $webSql.openDatabase('books', '1.0', 'Test DB', 2 * 1024 * 1024);

    db.createTable('admin', {
      "id": {
        "type": "INTEGER",
        "null": "NOT NULL",
        "primary": true, 
        "auto_increment": true
      },
      "login": {
        "type": "TEXT",
        "null": "NOT NULL"
      },
      "password": {
        "type": "TEXT",
        "null": "NOT NULL"
      }
    });

    db.createTable('users', {
      "id": {
        "type": "INTEGER",
        "null": "NOT NULL",
        "primary": true, 
        "auto_increment": true
      },
      "first_name": {
        "type": "TEXT",
        "null": "NOT NULL"
      },
      "last_name": {
        "type": "TEXT",
        "null": "NOT NULL"
      },
      "login": {
        "type": "TEXT",
        "null": "NOT NULL"
      },
      "password": {
        "type": "TEXT",
        "null": "NOT NULL"
      },
      "email": {
        "type": "TEXT",
        "null": "NOT NULL"
      },
      "phone": {
        "type": "INTEGER",
        "null": "NOT NULL"
      }
    });

    return {
      getAllUsers: function() {
        return db.select('users');
      },

      createUser: function(user) {
        return db.insert('users', user);
      },

      checkUserPhone: function(phone) {
        return db.select('users', {
          phone: phone
        });
      },

      checkUserLogin: function(login) {
        return db.select('users', {
          login: login
        });
      },
      
      checkUser: function(login, password) {
        return db.select('users', {
          login: {
            value: login,
            union: 'and'
          },
          password: password
        });
      },
      
      checkAdmin: function(login, password) {
        return db.select('admin', {
          login: {
            value: login,
            union: 'and'
          },
          password: password
        });
      },
      
      getByUser: function(login) {
        return db.select('user', {login: login})
      }
        /*,
      
      createAdmin: function(admin) {
        return db.insert('admin', admin);
      },   

      dropTable: function() {
        return db.del('users');
      }, */   
    }
  }]);