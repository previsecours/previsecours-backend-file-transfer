//this is in case we want to deal with mongodb Ids, not very important
var ObjectID = require('mongodb').ObjectID;

module.exports = function(app, db) {
  // first route, a simple GET
  app.get('/status', (req, res) => {
    res.send('connected to the database')
  });

  // second route, we post a note to the database
  app.post('/notes', (req, res) => {
    //first we get the passed arguments, and we create a note Object
    const note = { text: req.body.body, title: req.body.title };
    //then we insert it in the databse
    db.collection('notes').insert(note, (err, result) => {
      if (err) {
        res.send({ 'error': 'An error has occurred' });
      } else {
        res.send(result.ops[0]);
      }
    });
  });

  // a route to read a note
  app.get('/notes/:id', (req, res) => {
    db.collection('notes').findOne({_id: new ObjectID(req.params.id) }, (err, doc) => {
      if (err){
        res.send({'error': 'An error has occurred' });
      }else{
        res.send(doc)
      }
    })
  });

  // and another one to delete it
  app.delete('/notes/:id', (req, res) => {
    db.collection('notes').remove({ '_id': new ObjectID(req.params.id) }, (err, doc) => {
      if (err) {
        res.send({'error':'An error has occurred'});
      } else {
        res.send('Note ' + req.params.id + ' was properly deleted!');
      }
    });
  });

  // and a last one tu update it
  app.put('/notes/:id', (req, res) => {
    const note = { text: req.body.body, title: req.body.title };
    db.collection('notes').update({ '_id': new ObjectID(req.params.id) }, note, (err, result) => {
      if (err) {
          res.send({'error':'An error has occurred'});
      } else {
          res.send(note);
      }
    });
  });
};
