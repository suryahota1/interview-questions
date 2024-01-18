// const obj = {
//     i: 0
// };

// console.log(obj.i); // 1
// console.log(obj.i); // 2
// console.log(obj.i); // 3
// console.log(obj.i); // 4


const obj = {
    i: 0
};

const proxy = new Proxy(obj, {
    get( key ) {
        return ++obj.i;
    }
})

console.log(proxy.i);
console.log(proxy.i);
console.log(proxy.i);
console.log(proxy.i);
