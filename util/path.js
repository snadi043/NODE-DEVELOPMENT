//importing the path creator node - (core module) to construct the correct paths based on the OS of the system to avoid the errors.
const path = require('path');

//Exporting the module to reuse it in the application to create all the paths in the project by utilizing the
// path extension provided by the node to build the path based on the filename.
module.exports = path.dirname(process.mainModule.filename);