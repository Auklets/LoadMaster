const divide = require('./divide');

// HELPER FUNCTION TO MATCH WORKER WITH JOBS and CALLS CALLBACK ON EACH JOB
const bundleTasks = (task, jobsPerBundle) => {
  const bundle = [];
  for (let i = 1; i <= jobsPerBundle; i++) {
    bundle.push(task);
  }
  console.log(bundle);
  return bundle;
};

const addAllJobsToQueue = (task, jobsPerBundle, totalJobs, jobQueue) => {
  const jobsToAdd = divide(totalJobs, jobsPerBundle);
  // Creates bundle with tasksPerjob number of jobs
  const jobBundle = bundleTasks(task, jobsPerBundle);
  const jobBundleRemainder = bundleTasks(task, totalJobs % jobsPerBundle);

  for (let i = 1; i <= jobsToAdd; i++) {
    if (i === jobsToAdd && totalJobs % jobsPerBundle !== 0) {
      jobQueue.addToQueue(jobBundleRemainder);
    } else {
      jobQueue.addToQueue(jobBundle);
    }
  }
};

module.exports = { bundleTasks, addAllJobsToQueue };
