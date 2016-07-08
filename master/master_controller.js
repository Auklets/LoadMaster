const Queue = require('../helper/queue');
const { addAllJobsToQueue } = require('../helper/helpers');
const util = require('../helper/utils');
const dockerConnection = require('../config/docker-config');

// Global Variables
const tasksPerJob = 5; // Arbitrary number of actions per job
const jobQueue = new Queue();
const status = {
  workerCount: 0,
  workerList: [],
};
let totalJobs = 0;

// Handle incoming requests from Web Server
const handleJobFromWebServer = (req, res) => {
  const task = {
    masterName: req.body.masterName,
    scenarioID: req.body.scenarioID,
    scenario: req.body.scenarioName,
    targetUrl: req.body.targetURL,
    script: req.body.script,
  };

  // Split up jobs into chunks and place into job queue
  const spawnCount = +req.body.spawnsCount;
  totalJobs = spawnCount;

  addAllJobsToQueue(task, tasksPerJob, spawnCount, jobQueue);

  console.log('queue is', jobQueue.items);
  console.log('total jobs', totalJobs);

  // Wind up number of requested workers
  const workers = req.body.workers;
  for (let j = 1; j <= workers; j++) {
    status.workerCount = j;
    const workerName = task.masterName.concat('worker'.concat(status.workerCount));
    status.workerList.push(workerName);
    console.log(`creating ${workerName}`);
    const imageName = 'cshg/loadworker:swarm';
    util.createContainer(dockerConnection, task.masterName, imageName, workerName);
  }
  if (res) {
    res.status(200).send(`webserver post request received for ${workers} workers`);
  }
};

const requestJob = (req, res) => {
  // Check if jobs are available
  if (jobQueue.checkLength() > 0) {
    const job = jobQueue.takeNext();
    res.status(200).json({ job });
  } else {
    // If no jobs available send 0
    res.status(200).send('done');
  }
};

const shutdownWorkers = (req, res) => {
  setTimeout(() => {
    status.workerList.forEach((workerName) => {
      console.log('shutting down', workerName);
      util.removeContainer(dockerConnection, workerName);
    });
    status.workerList = [];
  }, 10000);
};

module.exports = { handleJobFromWebServer, requestJob, shutdownWorkers };
