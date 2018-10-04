const multiparty = require('multiparty');
const fs = require('fs');
const jsonResponse = require('../routes/jsonResponse.js')

const removeFile = fileName => {
  fs.exists(fileName, (exists) => {
    if (exists){
      fs.unlink(fileName, (err) => { if (err) console.log("Unable to delete: ",fileName) })
    }
  })
}

const partHandler = config => part => {
  if (config.debugMode){
    console.log('-> Debugmode activated - partHandler', '\npart.headers:',part.headers,'\npart.name:',part.name,'\npart.filename:',part.filename);
  }
  var file = undefined;
  if (!part.filename) {
    part.resume(); //skip this file because it has no name
  } else {
    let newName = part.filename
    if (config.renameFile){ newName = config.newName + '.' + part.filename.split('.').pop() }

    const fileName = config.uploadFolder+"/"+newName
    console.log("Begin => Field:"+part.name+" / FileName:"+newName)
    file = fs.createWriteStream(fileName);
    file.on('open' ,() => part.pipe(file))
    file.on('close',() => {
      console.log("End => Field:"+part.name+" / FileName:"+newName)
    })
    part.on('error',err => {
      if (file){
        file.end();
      }
      removeFile(fileName)
    })
  }
}

let progress;

const formClosedHandler = res => () => jsonResponse(200,{status:"Good",detail:"File was "+progress+"% uploaded"})(res)
const formErrordHandler = res => () => jsonResponse(400,{status:"Error",detail:"File uploading encounterd an error at "+progress+"%"})(res)
const formProgressHandler = res => (bytesReceived, bytesExpected) => progress = Math.round(bytesReceived / bytesExpected * 100);

const uploadFile = (req, res, config) => {
  progress = 0
  var form = new multiparty.Form()
  form.on('part' , partHandler(config) )
  form.on('close', formClosedHandler(res) )
  form.on('progress', formProgressHandler(res) )
  form.on('error', formErrordHandler(res) )
	form.parse(req);
}

module.exports = uploadFile;
