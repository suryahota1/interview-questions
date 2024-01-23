const obj = {
    a: {
        b: (a, b, c) => a + b + c, 
        c: (a, b, c) => a + b - c
    }, 
    d: (a, b, c) => a - b - c
};

function pipe ( obj ) {

    function recCall ( refObj, args ) {
        const keys = Reflect.ownKeys(refObj);
        for ( const key of keys ) {
            const val = refObj[key];
            if ( typeof val === "function" ) {
                refObj[key] = val(...args);
            } else if ( typeof val === "object" ) {
                recCall(val, args);
            }
        }
    }
    return ( ...args ) => {
        recCall(obj, args);
    };
}

pipe(obj)(1, 1, 1)

console.log(obj);