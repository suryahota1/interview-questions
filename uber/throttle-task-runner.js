// Implement a throttler that executes an array of tasks. When the throttler is passed a number, only execute that number of the tasks and passes the other tasks into a queue.

// This problem has a stackoverflow post from a year ago : https://stackoverflow.com/questions/49826332/simple-task-runner-in-javascript-with-waiting?rq=1

// class Runner {
//   constructor(concurrent) {
//     this.taskQueue = []; //this should have "concurrent" number of tasks running at any given time

//   }

//   push(task) {
//     /* pushes to the queue and then runs the whole queue */
//   }
// }
// The calling pattern would be:

// let runner = new Runner(3);
// runner.push(task1);
// runner.push(task2);
// runner.push(task3);
// runner.push(task4);

function throttler ( asyncCount, delay, callback ) {

    let timer = null, taskList = [];

    function coolDown () {
        timer = setTimeout(checkTasks, delay);
    }

    function checkTasks () {
        const curTasks = taskList.splice(0, asyncCount);
        if ( curTasks.length > 0 ) {
            curTasks.forEach(task => {
                task(callback);
            });
            coolDown();
        } else timer = null;
    }

    return ( tasks=[] ) => {
        taskList = tasks;
        if ( !timer ) checkTasks();
    }
}

const throttlerFn = throttler(2, 2000, ( data ) => {
    console.log("Throttle response", data);
});

const task1 = ( cb ) => {
    // do some task
    cb(1);
}

const task2 = ( cb ) => {
    // do some task
    cb(2);
}
const task3 = ( cb ) => {
    // do some task
    cb(3);
}
const task4 = ( cb ) => {
    // do some task
    cb(4);
}
const task5 = ( cb ) => {
    // do some task
    cb(5);
}
const task6 = ( cb ) => {
    // do some task
    cb(6);
}
const task7 = ( cb ) => {
    // do some task
    cb(7);
}
const task8 = ( cb ) => {
    // do some task
    cb(8);
}
const task9 = ( cb ) => {
    // do some task
    cb(9);
}

throttlerFn([task1, task2, task3, task4, task5, task6, task7, task8, task9]);