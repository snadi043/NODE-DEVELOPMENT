//importing the path creator node - (core module) to construct the correct paths based on the OS of the system to avoid the errors.
//require is the keyword in the node which needs the path to the modules used in the application.
const path = require('path');

//importing the express third party package in the node application. 
// Express is the framework which works with node to helps the developers develop the bussiness logic
// easily by taking of the heavy lifting using in-built functions, utilities and many more.
const express = require('express');

// Importing the Shop controller to handle the all the requests based on the shop activities and send the corresponding responses. 
const shopController = require('../controllers/shop');

// Initializing the express Router feature to navigate in between the paths of the node application.
const router = express.Router();

// / => GET
// importing the shopController middleware from the controllers folder and executing the method getIndex.
router.get('/', shopController.getIndex);

// /products => GET
// importing the shopController middleware from the controllers folder and executing the method getProducts.
router.get('/products', shopController.getProducts);

// /cart => GET
// importing the shopController middleware from the controllers folder and executing the method getCart.
router.get('/cart', shopController.getCart);

// /orders => GET
// importing the shopController middleware from the controllers folder and executing the method getOrders.
router.get('/orders', shopController.getOrders);

// /checkout => GET
// importing the shopController middleware from the controllers folder and executing the method getCheckout.
router.get('/checkout', shopController.getCheckout);

module.exports = router;
