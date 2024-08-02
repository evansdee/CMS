import { createContext, useContext, useEffect } from "react";
import { useLocalStorageState } from "./useLocalStorageState";


const DarkModeContext = createContext()

function DarkModeProvider({children}){
    const [isDark,setIsDark] = useLocalStorageState(window.matchMedia('(prefers-color-scheme:dark)').matches,"isDark")

    useEffect(()=>{
        if(isDark){
            document.documentElement.classList.add("dark-mode")
            document.documentElement.classList.remove("light-mode")
        }
        else{
            document.documentElement.classList.remove("dark-mode")
            document.documentElement.classList.add("light-mode")
        }
    },[isDark])

    function handleToggle()
    {
        setIsDark(prev=>!prev)
    }
    return(
        <DarkModeContext.Provider value={{isDark,handleToggle}}>
            {children}
        </DarkModeContext.Provider>
    )
}

function useDarkMode(){
    const context = useContext(DarkModeContext)

    if(!context) throw new Error('not here')
        return context
}

export {DarkModeProvider,useDarkMode}