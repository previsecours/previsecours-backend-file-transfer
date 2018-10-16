const uploadFile = require('../modules/uploadFile.js')
const jsonResponse = require('./jsonResponse.js')

module.exports = function(app) {
  // first route, a simple GET to know it the server is ON
  app.get('/status', (req, res) => {
    console.log('server side log through docker');
    jsonResponse(200,{status:"Good",detail: 'Connected to the server (served through docker)'})(res)
  });
  // second route, a simple GET to know it the accessToken works
  app.get('/AuthentificationStatus', (req, res) => {
    const accessToken = req.headers['x-access-token'] || false;
    if (accessToken !== process.env.accessToken) {
      jsonResponse(401,{status:"Error",detail: 'Authentification failed. Please contact support.'})(res)
    }else{
      jsonResponse(200,{status:"Good",detail: 'Authentification validated.'})(res)
    }
  });

  // third route, to post a file
  app.post('/uploadFile/interventions/:dpt', (req, res) => {
    const accessToken = req.headers['x-access-token'] || false;  //important car si process.env.accessToken === undefined, faut pas une egalite
    if (accessToken !== process.env.accessToken) {
      jsonResponse(401,{status:"Error",detail: 'Authentification failed. Please contact support.'})(res)
    }

    const dpt = (req.params.dpt) ? req.params.dpt : false
    const authorizedDepartment = ['91']

    if(dpt && authorizedDepartment.indexOf(dpt) !== -1){
      uploadFile(req, res, {
        uploadFolder: process.env.UPLOAD_FOLDER || './upload/',
        debugMode: JSON.parse(process.env.debugMode) || false,
        renameFile: true,
        newName:'interventions_'+dpt.toString().trim()+'_update_'+("0"+new Date().getDate()).slice(-2)+'-'+("0"+(new Date().getMonth()+1)).slice(-2)+'-'+new Date().getFullYear()
      })
      uploadFile(req, res, {
        uploadFolder: process.env.UPLOAD_FOLDER || './upload/',
        debugMode: JSON.parse(process.env.debugMode) || false,
        renameFile: true,
        newName:'interventions_'+dpt.toString().trim()+'_update_last_update'
      })
    }else {
      jsonResponse(400,{status:"Error",detail: 'Sorry, but the department '+ dpt +' is not yet available'})(res)
    }
  });
};
