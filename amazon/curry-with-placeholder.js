function curry(fn) {

    const context = this;
  
    function checkIfValidArgs ( args ) {
      if ( args.length < fn.length ) return false;
      const hasPlaceHolder = args.some(( val ) => val === curry.placeholder)
      return !hasPlaceHolder;
    }
  
    function mergeArgs ( args , nextArgs ) {
      const newArgs = [...args];
      let nextPtr = 0;
      for ( let i = 0; i < newArgs.length && nextPtr < nextArgs.length; i++ ) {
        if ( newArgs[i] === curry.placeholder ) {
          newArgs[i] = nextArgs[nextPtr++];
        }
      }
      while ( nextPtr < nextArgs.length ) {
          newArgs.push(nextArgs[nextPtr++]);
      }
      return newArgs.slice(0, fn.length);
    }
    
    return function cFn ( ...args ) {
      const status = checkIfValidArgs(args);
      if ( status ) return fn.apply(context, args);
      return function ( ...nextArgs ) {
        return cFn.apply(context, mergeArgs(args, nextArgs));
      }
    }
  }
  
  curry.placeholder = Symbol()