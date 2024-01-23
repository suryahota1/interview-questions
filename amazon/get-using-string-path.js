const obj = {
    a: {
        b: {
            c: [1,2,3]
        }
    }
}
  
// get(obj, 'a.b.c') // [1,2,3]
// get(obj, 'a.b.c.0') // 1
// get(obj, 'a.b.c[1]') // 2
// get(obj, ['a', 'b', 'c', '2']) // 3
// get(obj, 'a.b.c[3]') // undefined
// get(obj, 'a.c', 'bfe') // 'bfe'

function get ( obj, path, defaultValue=undefined ) {
    if ( !path || path.length === 0 ) return defaultValue;
    if ( typeof path === "string" ) {
        path = path.replace(/]/g, "").replace(/\[/g, ".");
        path = path.split(".");
    }

    let temp = obj;
    let idx = 0;

    while ( temp && idx < path.length ) {
        temp = temp[path[idx++]];
    }

    return temp === undefined ? defaultValue : temp ;
}

console.log(get(obj, 'a.c', 'bfe'));
