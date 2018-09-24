const fs = require('fs');

module.exports = function(app) {
  // first route, a simple GET
  app.get('/status', (req, res) => {
    res.send('connected to the database')
  });

  // second route, we post a note to the database
  app.post('/uploadedFiles', (req, res) => {
    //first we get the passed arguments, and we create a note Object
    const note = { text: req.body.body, title: req.body.title };
    //then we insert it in the databse
    //
    const src = fs.createReadStream('./big.file');
    src.pipe(res);

    //
    // fs.createReadStream(file)
    //   .pipe(zlib.createGzip())
    //   .on('data', () => process.stdout.write('.'))
    //   .pipe(fs.createWriteStream(file + '.zz'))
    //   .on('finish', () => console.log('Done'));



    db.collection('uploadedFiles').insert(note, (err, result) => {
      if (err) {
        res.send({ 'error': 'An error has occurred' });
      } else {
        res.send(result.ops[0]);
      }
    });
  });

  // a route to read a note
  app.get('/uploadedFiles/:id', (req, res) => {
    db.collection('notes').findOne({_id: new ObjectID(req.params.id) }, (err, doc) => {
      if (err){
        res.send({'error': 'An error has occurred' });
      }else{
        res.send(doc)
      }
    })
  });

  // and another one to delete it
  app.delete('/uploadedFiles/:id', (req, res) => {
      res.send('nothinig was since it isnot paramatered yet deleted!');
  });


};
