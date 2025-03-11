// // configuring the mysql2 from the package which is installed using npm (i,e: npm install --save mysql2)
// const mysql  = require('mysql2');

// // In node there are two ways to execute the connections - an individual or a pool of connections. However, it is a good approach to 
// // implement pool of connection using createPool() method which can handle multiple connections rather than executing the multiple connections by each one.
// //Using the package to create the pool, which can handle multiple connections and shuts down when the pool of connections end.
// const pool = mysql.createPool(
//     {
//         host: 'localhost',
//         user: 'root',
//         database: 'node-development-complete',
//         password: ''
//     }
// );

// //Exporting the pool to be utilized in the different files of the application and it is handled by the "Promises" functionality from javascript.
// //Promises are basically javascript objects which are helpful to execute ascynchronous functions instead of callbacks which is easy to understand and manage.
// module.exports = pool.promise();


// Previously, the database connection is created based on MySQL queries. This process is sometimes hard when lacking the skill of SQL.
// So, the alternate process is to use SEQUELIZE third party package, which works similar to JavaScript methods and the package takes care
// of all the heavy lifting (creating the tables) behind the scenes. 

// Importing the "Sequelize" package to use in the application.
const Sequelize = require('sequelize');

// Configuring the "Sequelize" package with the databsse.
const sequelize = new Sequelize('node-development-complete', 'root', 'swathiKumar@18', {
    host: 'localhost',
    dialect: 'mysql'
});

// Exporting the "SEQUELIZE" package to use it in the application.
module.exports = sequelize;