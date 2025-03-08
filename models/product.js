// //importing the File Stream (fs) node - (core module) to implement the read and write functionalities from the file in the node application.
// const fs = require('fs');
// //importing the path creator node - (core module) to construct the correct paths based on the OS of the system to avoid the errors.
// const path = require('path');

// const Cart = require('./cart');

// //creating the path to store the data into a file in the data -  directory with the name 'products.json'
// const p = path.join(
//   path.dirname(process.mainModule.filename),
//   'data',
//   'products.json'
// );

// // Reusing the code block to check the file and to read the file and do the required task on that file.
// const getProductsFromFile = cb => {
//   // Read the file and if it is empty create an empty array if not return the data.
//   fs.readFile(p, (err, fileContent) => {
//     if (err) {
//       cb([]);
//     } else {
//       cb(JSON.parse(fileContent));
//     }
//   });
// };

// module.exports = class Product {
//   constructor(id, title, imageUrl, description, price) {
//     this.id = id;
//     this.title = title;
//     this.imageUrl = imageUrl;
//     this.description = description;
//     this.price = price;
//   }

//   save() {
//     // Once the path is created, reading a file to then check if empty then create an empty array as default, or else parse the fileContent.
//     getProductsFromFile(products => {
//     // checking if the product is existing product or new product and if it is existing then update the particular product.
//       if(this.id){
//         const existingProductIndex = products.findIndex(prod => prod.id === this.id);
//         const updatedProducts =  [ ...products];
//         updatedProducts[existingProductIndex] = this; 
//           fs.writeFile(p, JSON.stringify(updatedProducts), (err) => {
//             console.log(err);
//           });
//       }
//       else{
//         // Adding the unique product Id to all the products
//         this.id = Math.random().toString();
//         //Once the read process is done then push the data by taking the real data (i,e the context) using 'this' keyword.
//           products.push(this);
//           fs.writeFile(p, JSON.stringify(products), err => {
//             console.log(err);
//           });
//         }
//       });
//     }

//   // findProductById is the method useful for finding the product by the particular id and return that product with all the details.
//   static findProductById(id, cb){
//     getProductsFromFile(products => {
//       const product = products.find(p => p.id === id);
//       cb(product);
//     });
//   }

//   // deleteProductById is the method useful for deleting the product by the particular id.
//   static deleteProductById(id){
//     getProductsFromFile(products => {
//       const product = products.find(prod => prod.id === id);
//       const updatedproducts = products.filter(p => p.id !== id);
//       fs.writeFile(p, JSON.stringify(updatedproducts), err => {
//         if(!err){
//           Cart.deleteProduct(id, product.price);
//         }
//         console.log(err);
//       });
//   });
//   }

//   //Fetching all the products from the file using the getProductsFromFile methos.
//   static fetchAll(cb) {
//     getProductsFromFile(cb);
//   }
// };


// 1. Previously, we have implemented all the controller actions which are handled from the File System where the functionality is to read the file
//    and then fetch the data from the file and then do the necessary processing on that data from the file and writing the data back to save the changes
//    back to the file.
// 2. Now, this entire process is replaced by the databases which are implemented by the mysql2 package which is installed through npm into the application
//    then using the imports to execute the necessary methods to perform all the functionalities which are to be replaced by previously implemented through
//    file system.


//importing the database using the mysql.
const db = require('../util/database');

module.exports = class Product{
  constructor(id, title, imageUrl, price, description){
    this.id = id;
    this.title = title;
    this.price = price;
    this.description = description;
    this.imageUrl = imageUrl;
  }

  save(){
    // Always maintain the insertion of data with the same format as displayed in the database columns
    // To avoid SQL injection adding an extra layer of security to avoid unauthorized data into the data fields when posting into database.
    return db.execute('INSERT INTO products (title, price, description, imageUrl) VALUES (?, ?, ?, ?)', [this.title, this.price, this.description, this.imageUrl]);
  }

  // Connecting the dabase server with the SQL queries with the execute method followed by the then() which is to handle the promise
  // created in the app.js and then to catch() if there are any errors while exeution of the promise.

  // Here implementing the fetchAll() method using the mysql database connection.

  // In the fetchAll() method, return the result of the query which is used later in the controller to handle the reuslt there
  // the help of promise and methods then() and catch().
  static fetchAll(){
    return db.execute('SELECT * FROM products'); 
  }
}


