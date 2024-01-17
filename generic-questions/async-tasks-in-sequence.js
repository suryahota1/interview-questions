function createAsyncTasks () {
    return new Promise(( resolve, reject ) => {
        const rand = Math.floor(Math.random() * 10);
        setTimeout(() => {
            if ( rand <= 5 ) reject("Rejected");
            else resolve("Resolve"); 
        }, rand * 1000);
    });
}

const tasks = [
    createAsyncTasks(), 
    createAsyncTasks(), 
    createAsyncTasks(), 
    createAsyncTasks(), 
    createAsyncTasks(), 
    createAsyncTasks(), 
    createAsyncTasks()
];

function asyncTasksInSequence ( tasks=[], cb ) {
    const errors = [];
    const results = [];

    const finalPromise = tasks.reduce(( accumulator, currPromise ) => {
        const newProm = new Promise(( resolve, reject ) => {
            currPromise.then( resp => {
                console.log("resp", resp);
                results.push(resp);
                resolve();
            }).catch( err => {
                console.log("err", err);
                errors.push(err);
                resolve();
            });
        });
        return accumulator.then(newProm);
    });

    finalPromise.then(resp => {
        console.log("finally cb called");
        cb(errors, results);
    });
}

asyncTasksInSequence(tasks, ( errors, results ) => {
    console.log("errors", errors);
    console.log("results", results);
});
