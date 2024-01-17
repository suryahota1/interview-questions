// Circuit breaker is a function which limits access to another function or 
// service if the function/service fails for to serve the requests. The circuit breaker 
// blocks for a certain amount of time. After that it accesses again and it repeats.

function circuitBreaker ( func, failureCount, thresholdInMilliseconds ) {

    let currFailureCount = 0, holdForThreshold = false;

    return ( ...args ) => {
        if ( holdForThreshold ) return console.log("Out of service");
        if ( currFailureCount <= failureCount ) {
            try {
                func(...args);
                currFailureCount = 0;
            } catch ( e ) {
                console.log("Service failed");
                if ( ++currFailureCount >= failureCount ) {
                    holdForThreshold = true;
                    setTimeout(() => {
                        console.log("Now serving");
                        holdForThreshold = false;
                        currFailureCount = 0;
                    }, thresholdInMilliseconds);
                }
            }
        }
    }
}

let c = 0;
const testService = () => {
    if ( ++c < 5 ) throw new Error();
    else console.log("Service running");
}

try {
    const cb = circuitBreaker(testService, 3, 200);
    cb();
    cb();
    cb();
    cb();
    setTimeout(() => {
        cb();
        cb();
        cb();
        cb();
    }, 250);
} catch ( e ) {
    console.log(e);
}

