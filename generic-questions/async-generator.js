function delayedValue ( value, time ) {
    return new Promise(( resolve, reject ) => {
        setTimeout(() => {
            resolve(value);
        }, time);
    });
}

async function* asyncGenerator () {
    yield delayedValue(1, 2000);
    yield delayedValue(2, 200);
    yield delayedValue(3, 500);
    yield delayedValue(4, 100);
    yield delayedValue(5, 3000);
    yield delayedValue(6, 700);
    yield delayedValue(7, 800);
}

async function result () {
    const genObj = asyncGenerator();
    for await ( let val of genObj ) {
        console.log(val);
    }
}

result();
