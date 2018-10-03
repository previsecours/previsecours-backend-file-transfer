const uploadFile = require('../modules/uploadFile.js')
const jsonResponse = require('./jsonResponse.js')

module.exports = function(app) {
  // first route, a simple GET
  app.get('/api/status', (req, res) => {
    console.log('server side log through docker');
    res.send('connected to the server (served through docker)')
  });

  // second route, we post a file to an folder on this server
  app.post('/api/uploadFile/interventions/:dpt', (req, res) => {

    const dpt = (req.params.dpt) ? req.params.dpt : false
    const authorizedDepartment = ['91']

    if(dpt && authorizedDepartment.indexOf(dpt) !== -1){
      uploadFile(req, res, {
        uploadFolder: process.env.UPLOAD_FOLDER || './upload/',
        debugMode: JSON.parse(process.env.debugMode) || false,
        renameFile: true,
        newName:'interventions_update_'+new Date().getDate()+'-'+new Date().getMonth()+'-'+new Date().getFullYear()
      })
    }else {
      jsonResponse(200,{status:"Error",detail: 'Sorry, but the department '+ dpt +' is not yet available'})(res)
    }

  });

  // a route to read a note
  app.get('/api/uploadedFiles/:id', (req, res) => {
    db.collection('notes').findOne({_id: new ObjectID(req.params.id) }, (err, doc) => {
      if (err){
        res.send({'error': 'An error has occurred' });
      }else{
        res.send(doc)
      }
    })
  });

  // and another one to delete it
  app.delete('/api/uploadedFiles/:id', (req, res) => {
      res.send('nothinig was since it isnot paramatered yet deleted!');
  });


};
