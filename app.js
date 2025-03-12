//importing the path creator node - (core module) to construct the correct paths based on the OS of the system to avoid the errors.
//require is the keyword in the node which needs the path to the modules used in the application.
const path = require('path');

//importing the express third party package in the node application. 
// Express is the framework which works with node to helps the developers develop the bussiness logic
// easily by taking of the heavy lifting using in-built functions, utilities and many more. 
const express = require('express');

// Importing the Error controller to handle the error page request and send the response. 
const errorController = require('./controllers/error');

//Importing the Models to create the relations in the Sequelize defined database.
const Product = require('./models/product');
const User = require('./models/user');
const Cart = require('./models/cart');
const CartItem = require('./models/cart-item');

const app = express(); // express() is the method which has the access to use all its features provided by the express framework to be used in the application.

//importing body-parser third party package. Body Parser helps to retrive the actual data from the repsonse
// without the developers doing all the logic of splitting the key value pairs from the response.
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
//adding the files in a static format to the node file-explorer codebase using the static method.
app.use(express.static(path.join(__dirname, 'public')));

//importing the route modules to use in this file.
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const sequelize = require('./util/database');

// Here is where to inject the dynamic HTML content into the Views using the Templates (ejs, Pug and Handlebars)
app.set('view engine', 'ejs'); //In this project, since it is based on ejs, So, setting the default view engine to use the "ejs" template.
app.set('views', 'views');  //Setting the HTML code file location (from the views folder) to be rendered with the templates.

// use() is the express framework middleware function which helps to handle the request and responses in the event loop of the node application.
// use() takes 3 parameters which are req, res and next whose names cannot be changed. 
// req and res are usual request and responses handled by the server and next is a function which tells what has to be done next after the particular middleware function is executed.
app.use('/admin', adminRoutes);
app.use(shopRoutes);

// Handling the Error response by utilizing the errorController with the extension get404().
app.use(errorController.get404);

// Adding the middleware to get the "user" data and use it anywhere in the application.
// In order to get the user data first, it has to be create which is done in the line 61.
app.use((req, res, next) => {
    User.findByPk(1).then(user => {
        req.user = user;
        next();
    }).catch(err => {console.log(err)});
});

// Configuring the databse with the "RELATIONS / ASSOCAITIONS" concept in "SEQUELIZE".
Product.belongsTo(User, {constraints: true, onDelete: 'cascade'}); // This is stating that a product can be created by the user.
User.hasMany(Product); // This is stating that a user can create multiple products.
User.hasOne(Cart); // One to One relation
Cart.belongsTo(User); // One to One relation
Product.belongsToMany(Cart, {through: CartItem}); // Many to Many relation.
Cart.belongsToMany(Product, {through: CartItem}); // Many to Many relation.

// Here, in the app.js file is where the "SEQUELIZE" sync method has to be executed to enable
// SEQUELIZE build tables in the database.
// force: true - It is used to force the database to rewrite the existing table with new changes done with relations and create new tables.
sequelize.
// sync({force: true})
sync().
then(result => {
    return User.findByPk(1);
})
.then(user => {
    if(!user){
        return User.create({name: "SAI", email: "node@email.com"});
    }
    return user; // in the then block which is a promise it is mandatory to return the same value which is a promise again to chain and continue the process.
}).then(user => {
    return user.createCart(); // createCart() is the magic association method provided by the sequelize.
    // console.log(user);
}).then(cart => {
    app.listen(3000);
})
.catch(err => {console.log(err)});

//listen is a method which makes the server listen to the events and display the responses on 
// the browser in the particular port provided.


