const Datastore = require('@google-cloud/datastore');

// Your Google Cloud Platform project ID
const projectId = 'stratosphere-172603';

// Instantiates a client
const datastore = Datastore({
  projectId: projectId
});



function addTask (name, score) {
  const taskKey = datastore.key('User');
  const entity = {
    key: taskKey,
    data: [
      {
        name: 'name',
        value: name,
      },
      {
        name: 'score',
        value: score
      }
    ]
  };

  datastore.save(entity)
    .then(() => {
      console.log(`Task ${taskKey.id} created successfully.`);
    })
    .catch((err) => {
      console.error('ERROR:', err);
    });
}

function query_score (user_id) {
  const query = datastore.createQuery('User').
		filter('__key__', '=', user_id);
  datastore.runQuery(query)
    .then((results) => {
    score = results[0];
  });
  return score;
}
