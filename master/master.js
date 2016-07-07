const express = require('express');
const bodyParser = require('body-parser');
const environment = require('dotenv');
if (process.env.NODE_ENV === 'development') {
  environment.config({ path: './env/development.env' });
} else if (process.env.NODE_ENV === 'production') {
  environment.config({ path: '../env/production.env' });
}
const masterController = require('./master_controller.js');

const app = express();

app.use(bodyParser.json());

app.post('/api/master', masterController.handleJobFromWebServer);
app.post('/api/requestJob', masterController.requestJob);
app.post('/api/complete', masterController.shutdownWorkers);

app.get('/*', (req, res) => {
  res.send('error: route not in use');
});

app.listen(process.env.MASTER_PORT, () => {
  console.log(`Master server listening to port ${process.env.MASTER_PORT}`);
});

// Mock data to test in development
if (process.env.NODE_ENV === 'development') {
  const request = {};
  request.body = {
    masterName: 'master1',
    workers: 2,
    scenarioID: 1,
    scenarioName: 'test1',
    spawnsCount: 20,
    targetURL: 'http://localhost:2000',
    script: "get /",
  };
  masterController.handleJobFromWebServer(request);
}
