//importing the File Stream (fs) node - (core module) to implement the read and write functionalities from the file in the node application.
const fs = require('fs');
//importing the path creator node - (core module) to construct the correct paths based on the OS of the system to avoid the errors.
const path = require('path');

//creating the path to store the data into a file in the data -  directory with the name 'products.json'
const p = path.join(
  path.dirname(process.mainModule.filename),
  'data',
  'products.json'
);

// Reusing the code block to check the file and to read the file and do the required task on that file.
const getProductsFromFile = cb => {
  // Read the file and if it is empty create an empty array if not return the data.
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      cb([]);
    } else {
      cb(JSON.parse(fileContent));
    }
  });
};

module.exports = class Product {
  constructor(title, imageUrl, description, price) {
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save() {
  // Adding the unique product Id to all the products
  const productID = Math.random().toString();
  // Once the path is created, reading a file to then check if empty then create an empty array as default, or else parse the fileContent.
    getProductsFromFile(products => {
  //Once the read process is done then push the data by taking the real data (i,e the context) using 'this' keyword.
      products.push(this);
      fs.writeFile(p, JSON.stringify(products), err => {
        console.log(err);
      });
    });
  }

  // findProductById is the method useful for finding the product by the particular id and return that product with all the details.
  static findProductById(id, cb){
    getProductsFromFile(products => {
      const product = products.find(p => p.id === id);
      cb(product);
    });
  }

  static fetchAll(cb) {
    getProductsFromFile(cb);
  }
};
