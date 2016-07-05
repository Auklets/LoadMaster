/* eslint-disable */

const expect = require('chai').expect;
const divide = require('../helper/divide');
const { bundleTasks, addAllJobsToQueue } = require('../helper/helpers');
const Queue = require('../helper/queue');

describe('Bundle Tasks', () => {
  // Adds item to queue
  it('Bundle tasks', (done) => {
    const testTask1 = 'task';
    const testJpB1 = 5;

    const testTask2 = 'task';
    const testJpB2 = 3;
    
    const testTask3 = 'task';
    const testJpB3 = 3;

    expect(bundleTasks(testTask1, testJpB1).length).to.equal(5);
    expect(bundleTasks(testTask2, testJpB2).length).to.equal(3);
    expect(bundleTasks(testTask3, testJpB3).length).to.equal(3);

    done();
  });
});
  // Checks items in queue after additions and removals
describe('Divide function', () => {
  it('Divide function works properly', (done) => {
    const jobCount1 = 10;
    const denominator1 = 5;

    const jobCount2 = 15;
    const denominator2 = 3;

    const jobCount3 = 20;
    const denominator3 = 5;

    const jobCount4 = 21;
    const denominator4 = 5;

    const jobCount5 = 3;
    const denominator5 = 5;
    
    expect(divide(jobCount1, denominator1)).to.equal(2);
    expect(divide(jobCount2, denominator2)).to.equal(5);
    expect(divide(jobCount3, denominator3)).to.equal(4);
    expect(divide(jobCount4, denominator4)).to.equal(5);
    expect(divide(jobCount5, denominator5)).to.equal(1);
    
    done();
  });
});

describe('Combining jobQueue, divide, and bundleTasks', () => {
  // Adds item to queue
  it('Add the correct number of jobs to the queue with even numbers', (done) => {
    const tbj = 5;
    const jobsToTest = 20;
    const task = 'task';

    const testQueue = new Queue();

    addAllJobsToQueue(task, tbj, jobsToTest, testQueue);

    let resultJobs = 0;
    while (testQueue.checkLength() > 0) {
      const returnedItem = testQueue.takeNext();
      for (let j = 0; j < returnedItem.length; j++) {
        resultJobs++;
      }
    }
    expect(resultJobs).to.equal(20);
    done();
  });

  it('Add the correct number of jobs to the queue with remainder', (done) => {
    const tbj = 4;
    const jobsToTest = 22;
    const task = 'task';

    const testQueue = new Queue();

    addAllJobsToQueue(task, tbj, jobsToTest, testQueue);

    let resultJobs = 0;
    while (testQueue.checkLength() > 0) {
      const returnedItem = testQueue.takeNext();
      for (let j = 0; j < returnedItem.length; j++) {
        resultJobs++;
      }
    }
    expect(resultJobs).to.equal(22);
    done();
  });

  it('Add the correct number of jobs to the queue with a large numbers', (done) => {
    const tbj = 7;
    const jobsToTest = 122;
    const task = 'task';

    const testQueue = new Queue();

    addAllJobsToQueue(task, tbj, jobsToTest, testQueue);

    let resultJobs = 0;
    while (testQueue.checkLength() > 0) {
      const returnedItem = testQueue.takeNext();
      for (let j = 0; j < returnedItem.length; j++) {
        resultJobs++;
      }
    }
    expect(resultJobs).to.equal(122);
    done();
  });

});