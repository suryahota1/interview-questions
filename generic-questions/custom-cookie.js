function useCustomCookie () {
    const store = new Map();
    Object.defineProperty(document, "myCustomCookie", {
        writable: true, 
        configurable: false, 
        enumerable: false, 
        get () {
            const arr = [];
            store.forEach(( value, key ) => {
                if ( value.expiryTime && Date.now() > value ) {
                    store.delete(key);
                } else {
                    arr.push(key);
                }
            });
            return arr.join(" ");
        }, 
        set( value ) {
            const splitStr = value.split(";");
            let expiryTime = null;
            for ( let i = 0; i < splitStr.length; i++ ) {
                if ( splitStr[i].indexOf("max-age") >= 0 ) {
                    expiryTime = Date.now() + Number(splitStr[i].split("=")[1]) * 1000;
                    break;
                }
            }
            store.set(value, expiryTime);
        }
    })
}
