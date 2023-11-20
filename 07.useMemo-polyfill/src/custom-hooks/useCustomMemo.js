import { useEffect, useRef } from "react";

const isPrevious = (newDeps, prevDeps) => {
  if (!prevDeps) {
    return false;
  } else if (newDeps.length !== prevDeps.length) {
    return false;
  }
  for (let i = 0; i < newDeps.length; ++i) {
    if (prevDeps[i] !== newDeps[i]) {
      return false;
    }
  }
  return true;
};

const useCustomMemo = (cb, deps) => {
  const memoizedRef = useRef(null);
  if (!memoizedRef.current || !isPrevious(deps, memoizedRef.current.deps)) {
    memoizedRef.current = {
      value: cb(),
      deps,
    };
  }
  useEffect(() => {
    return () => {
      memoizedRef.current = null;
    };
  }, []);
  return memoizedRef.current.value;
};

export default useCustomMemo;
