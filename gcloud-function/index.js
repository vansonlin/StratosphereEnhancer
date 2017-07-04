const Datastore = require('@google-cloud/datastore');

// Instantiates a client
const datastore = Datastore();

exports.helloWorld = function helloWorld(req, res) {
  console.log("received data");
  console.log(req);
  console.log(req.body);

  res.header('Content-Type', 'application/json');
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type');

  //respond to CORS preflight requests
  if (req.method == 'OPTIONS') {
    console.log("OPTIONS, about to return");

    res.status(204).send('');
  }

  if (req.body != undefined && req.body.name != undefined) {
    console.log("about to save entity: ", req.body.name);
    _addTask(req.body, res);
  }
};


function _addTask(body, res) {

  const taskKey = datastore.key([
        'User',
        body.user_id
    ]);
  const taskContent = {
    name: body.name,
    score: body.score,
    pages: body.pages,
    answer: body.answer,
    time: new Date()
  };

  const entity = {
    key: taskKey,
    data: taskContent
  };

  console.log(entity);
  datastore.save(entity)
    .then(() => {
      console.log(`Task ${body.user_id} created successfully.`);
    })
    .catch((err) => {
      console.error('ERROR:', err);
    });

  res.status(200).send('');
}
