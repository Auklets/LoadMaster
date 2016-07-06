// Logic to split jobs into divisible chunks for worker / worker-children

const splitJobs = (jobCount, denominator) =>
  Math.ceil(jobCount / denominator);

module.exports = splitJobs;
