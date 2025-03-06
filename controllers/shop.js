const Product = require('../models/product');
const Cart = require('../models/cart');

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

// GET Request to handle the display of the product details functionality using the controllers in MVC pattern.
exports.getProductDetailsById = (req, res, next) => {
  const prodId = req.params.productId;
  Product.findProductById(prodId, product => {
    res.render('shop/product-detail', {
      product : product,
      pageTitle: product.title,
      path: '/products'
    });
  });
}


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

// POST Request to handle the Shopping Cart Page after clicking on "add-to-cart" button when 
// navigated from "details" button in the prodcuts page using the controllers in the MVC pattern.
exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findProductById(prodId, (product) => {
    Cart.addToCart(prodId, product.price);
  });
  // {
    // path: '/cart',
    // pageTitle: 'Add to Cart'
  // }
  res.redirect('/cart');
}

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


// GET Request to handle the Fetch products in the cart functionality which is managed by the shop and 
// also checking the product id to handle the product details in the cart.
exports.getCartProducts = (req, res, next) => {
  Cart.getCartProducts(cart => {
    Product.fetchAll(products => {
      const cartProducts = [];
      for (product of products){
        const cartProductData = cart.products.find(prod => prod.id === product.id);
        if(cartProductData){
          cartProducts.push({productData: product, qty: cartProductData.qty});
        }
      }
        res.render('shop/cart', {
        path: 'cart',
        products: cartProducts,
      }
    );
  });
});
} 