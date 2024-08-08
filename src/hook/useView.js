import {useState,useEffect} from 'react';

export function useView(){
    const [view, setView] = useState(window.innerWidth);

    useEffect(() => {
      function handleEvent() {
        setView(window.innerWidth);
      }
      window.addEventListener("resize", handleEvent, false);
  
      return () => window.removeEventListener("resize", handleEvent, false);
    }, [view]);

    return {view,setView,isView:view>=768}
}