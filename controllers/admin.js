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
  const product = new Product(null, title, imageUrl, description, price);
  product.save();
  res.redirect('/');
};

// GET Request to handle the products managed by the admin functionality using the controllers in MVC pattern.
exports.getProducts = (req, res, next) => {
  Product.fetchAll(products => {
    res.render('admin/products', {
      prods: products,
      pageTitle: 'Admin Products',
      path: '/admin/products'
    });
  });
};

// GET Request to handle the edit products functionality managed by the admin using the controllers in MVC pattern.
exports.getEditProductById = (req, res, next) => {
  const editMode = req.query.edit;
  if(!editMode){
    return res.redirect('/');
  }
  const prodId = req.params.productId;
  Product.findProductById(prodId, (product) => {
    if(!product){
      return res.redirect('/');
    }
    res.render('admin/edit-product', {
      pageTitle: 'Edit Product',
      path: '/admin/edit-product',
      product: product,
      editing: editMode,
    });
    });
}

// POST Request to handle the edited products functionality managed by the admin and saving it back using the controllers in MVC pattern.
exports.postEditProduct = (req, res, next) => {
  const prodId = req.body.productId;
  const updatedTitle = req.body.title;
  const updatedImage = req.body.imageUrl;
  const updatedPrice = req.body.price;
  const updatedDescription = req.body.description;
  const updatedProduct = new Product(prodId, updatedTitle, updatedImage, updatedPrice, updatedDescription);
  updatedProduct.save();
  res.redirect('/admin/products');
}

// POST Request to handle the delete products functionality managed by the admin and also deleting the product from the cart using the controllers in MVC pattern.
exports.postDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  Product.deleteProductById(prodId);
  res.redirect('/admin/products');
}