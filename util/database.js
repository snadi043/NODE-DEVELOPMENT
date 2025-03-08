// configuring the mysql2 from the package which is installed using npm (i,e: npm install --save mysql2)
const mysql  = require('mysql2');

// In node there are two ways to execute the connections - an individual or a pool of connections. However, it is a good approach to 
// implement pool of connection using createPool() method which can handle multiple connections rather than executing the multiple connections by each one.
//Using the package to create the pool, which can handle multiple connections and shuts down when the pool of connections end.
const pool = mysql.createPool(
    {
        host: 'localhost',
        user: 'root',
        database: 'node-development-complete',
        password: 'swathiKumar@18'
    }
);

//Exporting the pool to be utilized in the different files of the application and it is handled by the "Promises" functionality from javascript.
//Promises are basically javascript objects which are helpful to execute ascynchronous functions instead of callbacks which is easy to understand and manage.
module.exports = pool.promise();
