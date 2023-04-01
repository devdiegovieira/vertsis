import { useRef } from "react";

export function useDebounce(func, timeout = 500){
  const timeOutRef = useRef(null);
  
  return (args) => {
    clearTimeout(timeOutRef.current);
 
    timeOutRef.current = setTimeout(() => { 
      func(args); 
    }, timeout);
  };
}

export function useUrlParams(locationSearch) {
  return locationSearch
    .slice(1)   
    .split('&')   
    .map(p => p.split('='))   
    .reduce((obj, [key, value]) => {
      if (key)
        return ({ ...obj, [key]: value })
    }, {})
}

export function useUrlId(locationPath, resource) {
  const elements = locationPath.split('/')
  return elements[elements.indexOf(resource) + 1]
}