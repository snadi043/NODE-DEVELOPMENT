const Product = require('../models/product');

// GET Request to handle the display of the products functionality using the controllers in MVC pattern.
exports.getProducts = (req, res, next) => {
  Product.fetchAll(products => {
    res.render('shop/product-list', {
      prods: products,
      pageTitle: 'All Products',
      path: '/products'
    });
  });
};

// GET Request to handle the edit products functionality using the controllers in MVC pattern.
exports.getIndex = (req, res, next) => {
  Product.fetchAll(products => {
    res.render('shop/index', {
      prods: products,
      pageTitle: 'Shop',
      path: '/'
    });
  });
};

// GET Request to handle the Shopping Cart Page using the controllers in the MVC pattern.
exports.getCart = (req, res, next) => {
  res.render('shop/cart', {
    path: '/cart',
    pageTitle: 'Your Cart'
  });
};

// GET Request to handle the Orders Page using the controllers in the MVC pattern.
exports.getOrders = (req, res, next) => {
  res.render('shop/orders', {
    path: '/orders',
    pageTitle: 'Your Orders'
  });
};

// GET Request to handle the Checkout Page using the controllers in the MVC pattern.
exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    path: '/checkout',
    pageTitle: 'Checkout'
  });
};
