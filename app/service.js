angular.module('book-store')
  .factory('BookService', ['$http', '$webSql', function($http, $webSql) {
    
    var db = $webSql.openDatabase('books', '1.0', 'Test DB', 2 * 1024 * 1024);
/*
    db.createTable('books', {
      "id": {
        "type": "INTEGER",
        "null": "NOT NULL", 
        "primary": true, 
        "auto_increment": true
      },
      "title": {
        "type": "TEXT",
        "null": "NOT NULL"
      },
      "author": {
        "type": "TEXT",
        "null": "NOT NULL"
      },
      "category": {
        "type": "TEXT",
        "null": "NOT NULL"
      },
      "price": {
        "type": "FLOAT",
        "null": "NOT NULL"
      }
      
    });

    db.createTable('cart', {
      "id": {
        "type": "INTEGER",
        "null": "NOT NULL",
        "primary": true, 
        "auto_increment": true
      },
      "bookid": {
        "type": "INTEGER",
        "null": "NOT NULL"
      },
      "booktitle": {
        "type": "TEXT",
        "null": "NOT NULL"
      },
      "query": {
        "type": "INTEGER",
        "null": "NOT NULL"
      },
      "price": {
        "type": "FLOAT",
        "null": "NOT NULL"
      }
    });*/
    
     db.createTable('order_products', {
      "id": {
        "type": "INTEGER",
        "null": "NOT NULL",
        "primary": true, 
        "auto_increment": true
      },
      "order_id": {
        "type": "INTEGER",
        "null": "NOT NULL"
      },
      "book_id": {
        "type": "INTEGER",
        "null": "NOT NULL"
      },
      "qty": {
        "type": "INTEGER",
        "null": "NOT NULL"
      },
      "price": {
        "type": "FLOAT",
        "null": "NOT NULL"
      }
    });

    db.createTable('order', {
      "id": {
        "type": "INTEGER",
        "null": "NOT NULL",
        "primary": true, 
        "auto_increment": true
      },
      "user_id": {
        "type": "INTEGER",
        "null": "NOT NULL"
      },
      "created_time": {
        "type": "DATA",
        "null": "NOT NULL"
      },
      "updated_time": {
        "type": "DATA",
        "null": "NOT NULL"
      },
      "status": {
        "type": "TEXT",
        "null": "NOT NULL"
      }
    });
		
    return {
      getAll: function() {
        return db.selectAll('books');
      },

      createBook: function(book) {
       	return db.insert('books', book);
      },

      editBook: function(id, data) {
        return db.update('books', data, { id: id });
      },

      getById: function(id) {
        return db.select('books', { id: id });
      },

      getByCategory: function(category) {
        return db.select('books', { category: category });
      },

      deleteBook: function(id) {
        return db.del('books', { id: id });
      },
      
      getAllCarts: function() {
        return db.selectAll('cart');
      },

      addToCart: function(cart) {
       	return db.insert('cart', cart);
      },

      deleteCart: function(id) {
       	return db.del('cart', {id: id});
      },

      queryParse: function(id) {
       	return db.select('cart', {bookid: id});
      },

      updateQuery: function(id, data) {
        return db.update('cart', data, { id: id });
      },
      
      addToOrder: function(order) {
       	return db.insert('order', order);
      },

      addToOrderProduct: function(order) {
       	return db.bulkInsert('order_products', order);
      },

      dropTable: function(id) {
       	return db.dropTable('');
      }

    }
  }]);