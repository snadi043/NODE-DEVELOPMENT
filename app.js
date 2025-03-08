//importing the path creator node - (core module) to construct the correct paths based on the OS of the system to avoid the errors.
//require is the keyword in the node which needs the path to the modules used in the application.
const path = require('path');

//importing the express third party package in the node application. 
// Express is the framework which works with node to helps the developers develop the bussiness logic
// easily by taking of the heavy lifting using in-built functions, utilities and many more. 
const express = require('express');

//importing the database using the mysql.
const db = require('./util/database');

// Connecting the dabase server with the SQL queries with the execute method followed by the then() which is to handle the promise
// created in the app.js and then to catch() if there are any errors while exeution of the promise.
db.execute('SELECT * FROM products').then(
    result => {console.log(result)}
).catch(
    err => {console.log(err)}
);

// Importing the Error controller to handle the error page request and send the response. 
const errorController = require('./controllers/error');

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

//listen is a method which makes the server listen to the events and display the responses on 
// the browser in the particular port provided.
app.listen(3000);


