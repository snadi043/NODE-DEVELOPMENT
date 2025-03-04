//importing the path creator node - (core module) to construct the correct paths based on the OS of the system to avoid the errors.
const path = require('path');

//importing the File Stream (fs) node - (core module) to implement the read and write functionalities from the file in the node application.
const fs = require('fs');

//creating the path to store the data into a file in the data -  directory with the name 'products.json'
const p = path.join(
  path.dirname(process.mainModule.filename),
  'data',
  'cart.json'
);

module.exports = class Cart{
    static addToCart(id, productPrice){
    // Read the file to check if there are any exisiting products in the cart
    // and if there is no error parse the fileContent.
       fs.readFile(p, (err, fileContent) => {
        let cart = {products: [], totalPrice: 0};
        if(!err){
            cart = JSON.parse(fileContent);
        }
    // Analyzing the cart
    const exisitingProductIndex = cart.products.findByIndex(p => p.id === id);
    const existingProduct = cart.products[exisitingProductIndex];
    let updatedProduct;
    // Analyze the data -> if old product, then check the id, update the price and add the quantity by 1.
    if(existingProduct){
        updatedProduct = { ...existingProduct};
        updatedProduct.qty = updatedProduct.qty + 1;
        cart.products = [ ...cart.products];
        cart.products[exisitingProductIndex] = updatedProduct;
    }
    // Analyze the data -> if new product, then check the id, add the price and the quantity.
    else{
        updatedProduct = { id: id, qty: 1};
        cart.products = [ ...cart.products, updatedProduct];
    }
    cart.totalPrice = cart.totalPrice + +productPrice;
    // Save the updated cart to thr file back.
    fs.writeFile(p, JSON.stringify(cart), (err) => {
        console.log(err);
        });
    }); 
    }
}

// module.exports = class Cart{
//     static addProducts(id, productPrice){
//         // Read the File to check for the exsisting products in the cart
//         fs.readFile(p, (err, fileContent) => {
//             let cart = {products: [], totalPrice: 0};
//             if(!err){
//                 cart = JSON.parse(fileContent);
//                 // Analyze the product and find the product then => if existing increase the quantity or create new product
//                 const existingProductIndex =  cart.products.findIndex(prod => prod.id === id);
//                 const existingProduct = cart.products[existingProductIndex];
//                 let updatedProduct;
//                 if(existingProduct){
//                     updatedProduct = { ...existingProduct};
//                     updatedProduct.qty = updatedProduct.qty + 1;
//                     cart.products = [...cart.products];
//                     cart.products[existingProductIndex] = updatedProduct;
//                 }
//                 else{
//                     updatedProduct = {id: id, qty: 1};
//                     cart.products = [...cart.products, updatedProduct];
//                 }
//                cart.totalPrice = cart.totalPrice + +productPrice;
//                fs.writeFile(p, JSON.stringify(cart), err => {
//                 console.log(err);
//                });
//             }
//         })
//     }
// }