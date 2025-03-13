const Product = require('../models/product');
const Cart = require('../models/cart');

// GET Request to handle the display of the products functionality using the controllers in MVC pattern.
// Implementing using the database and promises.
exports.getProducts = (req, res, next) => {
  Product.findAll().then(products => {
    res.render('shop/product-list', {
      prods: products,
      pageTitle: 'All Products',
      path: '/products'
    });
    }).catch(err => console.log(err));
};

// GET Request to handle the display of the product details functionality using the controllers in MVC pattern.
exports.getProductDetailsById = (req, res, next) => {
  const prodId = req.params.productId;
  Product.findAll({where: {id : prodId}}).then(product => 
    res.render('shop/product-detail', {
    product: product[0],
    pageTitle: product[0].title,
    path: '/products'
  })
).catch(err => console.log(err));
  // Product.getProductById(prodId).then(([product]) => {
  //   console.log(product);
  //   // res.render('shop/product-detail', {
  //   //   product : product,
  //   //   pageTitle: product.title,
  //   //   path: '/products'
  //   // });
  // }).catch(err => console.log(err));
}


// GET Request to handle the edit products functionality using the controllers in MVC pattern.
exports.getIndex = (req, res, next) => {
  // If you execute the code below in the line 32 you get the result of two arrays which is nested into an array.
  // So, to avoid it here using the array destructing to handle the individual array values.
  // Product.fetchAll().then(result => console.log(result)).catch(err => console.log(err));
  Product.findAll().then(products => {
    res.render('shop/index',{
      prods: products,
      pageTitle: 'Shop',
      path: '/'
    });
  }).catch(err => console.log(err));
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
  let fetchedCart;
  // Cart.getCartProducts().then(
  req.user.getCart().then(
    cart => {
      fetchedCart = cart;
      return cart.getProducts({where: {id: prodId}});
    }).then(products => {
      // This is the code for already existing prodct in the cart.
      let product;
      if(products.length > 0){
        product = products[0];
      }
      let newQuantity = 1;
      // This is the code for new product in the cart
        if(product){
          const oldQuantity = product.cartItem.quantity;
          newQuantity = oldQuantity + 1;
          return fetchedCart.addProduct(product, {through: {quantity: newQuantity}});
        }
        return Product.findProductById(prodId).then(
          product => {
            return fetchedCart.addProduct(product, {through : newQuantity});
          }
        ).catch(err => {console.log(err)})
        .then(() => {res.redirect('/cart')});
      }).catch(err => {console.log(err)});
  // {
    // path: '/cart',
    // pageTitle: 'Add to Cart'
  // }
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
  req.user.getCart().then(cart => {
    return cart.getProducts()
    .then(products => {
      res.render('/shop/cart', {
        path: '/cart',
        products: products,
        pageTitle: 'Your Cart',
      });
    }).catch(err => {console.log(err)}); // getProducts() is a magic association method provided by sequelize.
  }).catch(err => {console.log(err)});
//   Cart.getCartProducts(cart => {
//     Product.fetchAll(products => {
//       const cartProducts = [];
//       for (product of products){
//         const cartProductData = cart.products.find(prod => prod.id === product.id);
//         if(cartProductData){
//           cartProducts.push({productData: product, qty: cartProductData.qty});
//         }
//       }
//         res.render('/cart', {
//         path: '/cart',
//         products: cartProducts,
//       }
//     );
//   });
// });
} 

// POST Request to handle the delete product in the cart functionality which is managed by the shop.
exports.postDeleteCartProduct = (req, res, next) => {
  const prodId = req.body.productId;
  req.user.getCart().then(
    cart => {
      return cart.getProducts({where: {id: prodId}});
    }
  ).then(products => {
    const product = products[0];
    return product.cartItem.destroy();
  }
).then(result => res.render('/cart')
).catch(err => {console.log(err)});
  // Product.findProductById(prodId, product => {
  //   Cart.deleteProduct(prodId, product.price);
  // });
}

exports.postCreateOrder = (req, res, next) => {
  req.user
  .getCart()
  .then(cart => {
    cart.getProducts();
  })
  .then(products => {
    return req.user.createOrder()
    .then(order => {
      order.addProducts(products.map(product => {
        product.orderItem = {quantity: product.cartItem.quantity};
        return product;
      }));
    })
    .cathc(err => {
      console.log(err);
    });
  })
  .then(result => {
    res.redirect('/orders');
  })
  .catch(err => {console.log(err)});
}