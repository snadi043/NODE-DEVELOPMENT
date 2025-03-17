const Product = require('../models/product');

// GET Request to handle the add-product functionality using the controllers in MVC pattern.
exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    editing: false
  });
};

// POST Request to handle the add-product functionality using the controllers in MVC pattern and 
// redirect it to the '/' path after sending and saving the data.
exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  // const product = new Product(null, title, imageUrl, description, price);
  // product.save().then(() => {res.redirect('/')}).catch(err => console.log(err));

  // The alternative way of adding the userId to the post method when adding a new product to the database is to use
  // the magic methods provided by the "Sequelize". These are nothing but the accessbility or provision to use/create a new method 
  // based on the relations/associations created within the database tables by "Sequelize".
  
  //req.user.createProduct() - here createProduct is the magic association method provided by the sequelize.
  Product.create({
    title: title,
    imageUrl: imageUrl,
    price: price,
    description: description,
  }).then(
    result => {
      console.log('New Product Added');
      res.redirect('/admin/products');
    }
  ).catch(
    err => console.log(err));
  };

//   // Using the new product (Model) which is created based on Sequelize.
//   Product.create({
//     title: title,
//     imageUrl: imageUrl,
//     price: price,
//     description: description,
//     // After, injecting the associations / relations in the database tables using sequelize a new table column is inserted which is "userId".
//     // So, now on when ever a new product is posted this "userId" field is also to be added which can be done as below.
//     // userId: req.user.id,
//   }).then(
//     // result => console.log(result)
//     console.log('New Product Added'),
//   ).catch(
//     err => console.log(err));
// };

// GET Request to handle the products managed by the admin functionality using the controllers in MVC pattern.
// Implementing the findAll() method provided by the "SEQUELIZE" package to handle the getProducts() request
// and then handling the response and the error through javascript promise concept with then() and catch().
exports.getProducts = (req, res, next) => {
  //req.user.getProducts() // getProducts() is a magic association method provided by sequelize.
  Product.findAll().then(products => {
    res.render('admin/products', {
      prods: products,
      pageTitle: 'Admin Products',
      path: '/admin/products'
    });
  }).catch(err => console.log(err));
};

// GET Request to handle the edit products functionality managed by the admin using the controllers in MVC pattern.
// Implementing the findByPk() method provided by the "SEQUELIZE" package to handle the getEditProductById() request
// and then handling the response and the error through javascript promise concept with then() and catch().
exports.getEditProductById = (req, res, next) => {
  const editMode = req.query.edit;
  if(!editMode){
    return res.redirect('/');
  }
  const prodId = req.params.productId;
  req.user
  .getProducts({where: {id: prodId}}) // This is an alternative way, where we can use the getProducts() method which is a magic association method.
  // Product.findByPk(prodId)
  .then(products => {
    const product = products[0];
      if(!product){
        return res.redirect('/');
      }
      res.render('admin/edit-product', {
        pageTitle: 'Edit Product',
        path: '/admin/edit-product',
        product: product,
        editing: editMode,
      });
      }
  ).catch(err => console.log(err));
}

// POST Request to handle the edited products functionality managed by the admin and saving it back using the controllers in MVC pattern.
// Implementing the findByPk() method provided by the "SEQUELIZE" package to handle the postEditProduct() request and executing the save() 
// method on the updated products which is returned and then handling the response and the error through javascript promise concept with then() and catch().
exports.postEditProduct = (req, res, next) => {
  const prodId = req.body.productId;
  const updatedTitle = req.body.title;
  const updatedImage = req.body.imageUrl;
  const updatedPrice = req.body.price;
  const updatedDescription = req.body.description;
  Product.findByPk(prodId).then(product => {
    product.title = updatedTitle;
    product.imageUrl = updatedImage;
    product.price = updatedPrice;
    product.description = updatedDescription;
    return product.save();
  }).then(result => {
    console.log('Updated product');   
    res.redirect('/admin/products');
    })
  .catch(err => console.log(err));
}

// POST Request to handle the delete products functionality managed by the admin and also deleting the product from the cart using the controllers in MVC pattern.
exports.postDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findByPk(prodId).then(product => {
    return product.destroy();
  }).then(result => {
    console.log('Product Deleted');
    res.redirect('/admin/products');
  }).catch(err => {
    console.log(err);
  })
}

// GET Request to handle the Fetch products in the cart functionality which is managed by the admin and 
// also checking the product id to handle the product details in the cart.
exports.getCartProducts = (req, res, next) => {
  Cart.getCartProducts(products => {
    const updatedCart = [];
    Product.findProductById(prod => prod.id === products.id, productData = {

    },
      res.render('/shop/cart'), {
        path: '/shop/cart',
        products: productData,
      }
    );
  });
}