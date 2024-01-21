function fetchWithTimeout ( url, timer ) {

    return new Promise(( resolve, reject ) => {
        let timerId;
        let abortController;

        function timerFn () {
            timerId = null;
            abortController.abort();
            reject(new Error("Timeout"));
        }

        timerId = setTimeout(timerFn, timer);

        abortController = new AbortController();
        const signal = controller.signal;

        fetch(url, { signal }).then(resp => {
            clearTimeout(timerId);
            resolve(resp);
        }).catch(err => {
            clearTimeout(timerId);
            reject(err);
        });
    })
}
