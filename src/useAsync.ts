import { DependencyList, useEffect } from "react";

// TODO implement it for filmomania

// export const useAsync = <T extends (...args: any[]) => Promise<any>>(
//     fn: T,
//     deps: DependencyList = []
// ) => {
//     const [state, callback] = useAsyncFn(fn, deps, {
//         loading: true,
//       });
    
//       useEffect(() => {
//         callback();
//       }, [callback]);
    
//       return state;
// }