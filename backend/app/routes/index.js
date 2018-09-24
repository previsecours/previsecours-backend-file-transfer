const FileTransferRoutes = require('./filetransfer_routes');
/**
 * [gather all type of routes, that are defined in the routes_** folder]
 * @param  {[Object]} app [Express app]
 */

module.exports = function(app) {
  FileTransferRoutes(app);
  // Other route groups could go here, in the future
};
