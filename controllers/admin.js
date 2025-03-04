const Product = require('../models/product');

// GET Request to handle the add-product functionality using the controllers in MVC pattern.
exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
  });
};

// POST Request to handle the add-product functionality using the controllers in MVC pattern and 
// redirect it to the '/' path after sending and saving the data.
exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  const product = new Product(title, imageUrl, description, price);
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
  const prodId = req.params.productId;
  const editMode = req.query.edit;
  Product.findProductById(prodId, (product) => {
    if(!editMode){
      return res.redirect('/');
    }
    if(!product){
      return;
    }
    res.render('admin/edit-product', {
      pageTitle: 'Edit Product',
      path: '/admin/edit-product',
      product: product,
      editing: editMode,
    });
    });
}