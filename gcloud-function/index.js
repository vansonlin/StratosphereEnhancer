const Datastore = require('@google-cloud/datastore');

// Instantiates a client
const datastore = Datastore();

exports.helloWorld = function helloWorld (req, res) {
  
  
  res.header('Content-Type','application/json');
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type');

  //respond to CORS preflight requests
  if (req.method == 'OPTIONS') {
    res.status(204).send('');
  }

  console.log("received data");
  console.log(req.body);
  
  name = req.body.name;
  score = req.body.score;
  user_id = req.body.user_id;
  _addTask(name, score, user_id);
  
};
  

function _addTask (name, score, user_id) {

  let getTaskKey = function (user_id) {
    return datastore.key([
        'User',
        user_id
    ]);
  }

  const taskKey = getTaskKey(user_id);
  const taskContent = {
    name: name,
    score: score,
    time: new Date()
  };

  const entity = {
    key: taskKey,
    data: taskContent 
  };

  datastore.save(entity)
    .then(() => {
      console.log(`Task ${taskKey.id} created successfully.`);
    })
    .catch((err) => {
      console.error('ERROR:', err);
  });
}
