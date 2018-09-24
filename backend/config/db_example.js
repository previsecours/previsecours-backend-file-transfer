// here you define the connector to your mongodb database
let databasename = 'databasename'
module.exports = {
  // If in localhost:
  // url : 'mongodb://127.0.0.1:3001',
  // If with Mlab - you can set up a MongoDB database hosted on Mlab, add a user and a password, and paste the corresponding URL here to connect the MongoDB databse:
  url : 'mongodb://<dbuser>:<dbpassword>@ds213058.mlab.com:13053/'+databasename,
  databasename: databasename
};
