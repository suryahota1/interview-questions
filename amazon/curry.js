const join = (a, b, c) => {
    return `${a}_${b}_${c}`
}
 
// const curriedJoin = curry(join)

// curriedJoin(1, 2, 3) // '1_2_3'

// curriedJoin(1)(2, 3) // '1_2_3'

// curriedJoin(1, 2)(3) // '1_2_3'

function curry ( fn ) {
    const context = this;
    return function join ( ...args ) {
        if ( fn.length === args.length ) return fn(...args);
        return join.bind(context, ...args);
    }
}

const curriedJoin = curry(join);

console.log(curriedJoin(1, 2)(3));
