// Matching algorithm to distribute work, write to database

// HELPER FUNCTION TO MATCH WORKER WITH JOBS and CALLS CALLBACK ON EACH JOB
const bundleTasks = (tasks, jobsPerBundle) => {
  const bundle = [];
  for (let task = 0; task < jobsPerBundle; task++) {
    bundle.push(tasks);
  }
  return bundle;
};

module.exports = { bundleTasks };
