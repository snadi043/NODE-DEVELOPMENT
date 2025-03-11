// //importing the path creator node - (core module) to construct the correct paths based on the OS of the system to avoid the errors.
// const path = require('path');

// //importing the File Stream (fs) node - (core module) to implement the read and write functionalities from the file in the node application.
// const fs = require('fs');

// //creating the path to store the data into a file in the data -  directory with the name 'products.json'
// const p = path.join(
//   path.dirname(process.mainModule.filename),
//   'data',
//   'cart.json'
// );

// module.exports = class Cart{
//     static addToCart(id, productPrice){
//     // Read the file to check if there are any exisiting products in the cart
//     // and if there is no error parse the fileContent.
//        fs.readFile(p, (err, fileContent) => {
//         let cart = {products: [], totalPrice: 0};
//         if(!err){
//             cart = { ...JSON.parse(fileContent)};
//         }
//     // Analyzing the cart
//     const exisitingProductIndex = cart.products.findIndex(p => p.id === id);
//     const existingProduct = cart.products[exisitingProductIndex];
//     let updatedProduct;
//     // Analyze the data -> if old product, then check the id, update the price and add the quantity by 1.
//     if(existingProduct){
//         updatedProduct = { ...existingProduct};
//         updatedProduct.qty = updatedProduct.qty + 1;
//         cart.products = [ ...cart.products];
//         cart.products[exisitingProductIndex] = updatedProduct;
//     }
//     // Analyze the data -> if new product, then check the id, add the price and the quantity.
//     else{
//         updatedProduct = { id: id, qty: 1};
//         cart.products = [ ...cart.products, updatedProduct];
//     }
//     cart.totalPrice = cart.totalPrice + +productPrice;
//     // Save the updated cart to thr file back.
//     fs.writeFile(p, JSON.stringify(cart), err => {
//         console.log(err);
//         });
//     }); 
//     }

//     // Function to delete the products from the cart based on the id and the productPrice.
//     static deleteProduct(id, productPrice){
//         fs.readFile(p, (err, fileContent) => {
//             if(err){
//                 return;
//             }
//         const updatedCart = { ...JSON.parse(fileContent)};
//         const product = updatedCart.products.find(prod => prod.id === id);
//         if(!product){
//             return;
//         }
//         const productQty = product.qty;
//         updatedCart.products = updatedCart.products.filter(prod => prod.id !== id);
//         updatedCart.totalPrice = updatedCart.totalPrice - productPrice * productQty; 
//         fs.writeFile(p, JSON.parse(updatedCart), err => {
//             console.log(err);
//         });
//     });
//     }

//     // Fetch all the items in the cart if we have the items added to the cart.
//     static getCartProducts(cb){
//         fs.readFile(p, (err, fileContent) => {
//             cart = JSON.parse(fileContent);
//             if(err){
//                 return cb(null);
//             }
//             else{
//                 cb(cart);
//             }
//         });
//     }
// }


const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const Cart = sequelize.define('cart', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    }
});

module.exports = Cart;