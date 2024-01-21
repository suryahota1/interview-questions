function cachedApiCall ( duration ) {

    const cache = new Map();

    function timerFn ( url ) {
        cache.delete(url);
    }

    return ( url, config ) => {
        return new Promise(( resolve, reject ) => {
            if ( cache.has(url) ) resolve(cache.get(url));
            fetch(url).then(resp => {
                cache.set(url, resp);
                setTimeout(timerFn, duration, url);
                resolve(resp);
            }).catch(err => {
                reject(err);
            });
        });
    }
}
