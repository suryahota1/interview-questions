// Implement mapLimit, which is a utility function that produces a list of outputs by mapping each input through an asynchronous iteratee function. The provided limit dictates how many operations can occur at once.

// Inputs
// inputs: An array of inputs.
// limit: The maximum number of operations at any one time.
// iterateeFn: The async function that should be called with each input to generate the corresponding output. It will have two arguments:
//      input: The input being processed.
//      callback: A function that will be called when the input is finished processing. It will be provided one argument, the processed output.
// callback: A function that should be called with the array of outputs once all the inputs have been processed.

// Sample async function
function getNameById(id, callback) {
    // simulating async request
    const randomRequestTime = Math.floor(Math.random() * 100) + 200;
  
    setTimeout(() => {
      callback("User" + id);
    }, randomRequestTime);
}

function promisiFied ( func, input ) {
    return new Promise(( resolve, reject ) => {
        func(input, ( data ) => {
            resolve(data);
        });
    });
}
  
function mapLimit( inputs, limit, iterateeFn, callback, currIdx=0 ) {
    // implement here
    if ( currIdx === inputs.length ) return callback([]);
    const promiseArr = [];
    for ( let c = 0; c < limit && currIdx < inputs.length; c++ ) {
        promiseArr.push(promisiFied(iterateeFn, inputs[currIdx++]));
    }
    Promise.allSettled(promiseArr).then( resp => {
        console.log("resp", resp);
        resp = resp.map(item => item.value);
        mapLimit(inputs, limit, iterateeFn, ( nextResp ) => {
            resp.push(...nextResp);
            callback(resp);
        }, currIdx);
    });
}
//example: 
mapLimit([1, 2, 3, 4, 5], 4, getNameById, (allResults) => {
    console.log("output", allResults); // ["User1", "User2", "User3", "User4", "User5"]
});

function getRes () {
    return new Promise(( resolve ) => {
        setTimeout(() => {
            resolve();
        }, 5000);
    });
}

(async () => {
    await getRes();
})();