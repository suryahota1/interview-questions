function sendAnalyticsEventHOC () {

    let c = 1;

    return ( event ) => {
        return new Promise(( resolve, reject ) => {
            setTimeout(() => {
                if ( c++ % 10 === 0 ) reject();
                else resolve();
            }, 1000);
        });
    }
}

const sendAnalyticsEvent = sendAnalyticsEventHOC();

function manageEvent ( event, retryCount ) {
    return new Promise(( resolve, reject ) => {
        sendAnalyticsEvent(event).then( resp => {
            resolve(resp);
        }).catch( err => {
            // if ( retryCount ) 
        })
    });
}