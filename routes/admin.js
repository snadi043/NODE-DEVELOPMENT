//importing the path creator node - (core module) to construct the correct paths based on the OS of the system to avoid the errors.
//require is the keyword in the node which needs the path to the modules used in the application.
const path = require('path');

//importing the express third party package in the node application. 
// Express is the framework which works with node to helps the developers develop the bussiness logic
// easily by taking of the heavy lifting using in-built functions, utilities and many more. 
const express = require('express');

// Initializing the express Router feature to navigate in between the paths of the node application.
const router = express.Router();

// Importing the Admin controller to handle the admin page request and send the response. 
const adminController = require('../controllers/admin');

// /admin/add-product => GET
// importing the adminController middleware from the controllers folder and executing the method getAddProduct.
router.get('/add-product', adminController.getAddProduct);

// /admin/products => GET
// importing the adminController middleware from the controllers folder and executing the method getProducts.
router.get('/products', adminController.getProducts);

// /admin/add-product => POST
// importing the adminController middleware from the controllers folder and executing the method postAddProduct.
router.post('/add-product', adminController.postAddProduct);

// /admin/edit-product => GET
// importing the adminController middleware from the controllers folder and executing the method getEditProduct.
router.get('/edit-product/:productId', adminController.getEditProductById);

// /admin/edit-product => POST
// importing the adminController middleware from the controllers folder and executing the method postEditProduct.
router.post('/edit-product', adminController.postEditProduct);

// /admin/delete-product => POST
// importing the adminController middleware from the controllers folder and executing the method postDeleteProduct.
router.post('/delete-product', adminController.postDeleteProduct);
module.exports = router;
