import { useEffect } from "react";
import { useState } from "react"
import { createContext, useContext } from "react"

const GlobalContext = createContext()

export function GlobalProvider(props) {

    useEffect(() => {
        let themeLocalStorage = localStorage.getItem('theme');
        if (themeLocalStorage === null) {
            themeLocalStorage = 'dark'
            localStorage.setItem('theme', 'dark');
        }

        let authLocalStorage = localStorage.getItem('auth');
        if (authLocalStorage === null) {
            authLocalStorage = ''
            localStorage.setItem('auth', '');
        }
        setGlobalState({
            theme: themeLocalStorage,
            auth: authLocalStorage
        })
    }, [])

    const [globalState, setGlobalState] = useState({
        theme: 'dark',
        auth: ''
    })

    function changeGlobal(action) {
        switch (action.state) {
            case 'theme':
                if (globalState.theme === 'light') {
                    localStorage.setItem('theme', 'dark')
                    setGlobalState({
                        theme: 'dark',
                        auth: globalState.auth
                    })
                } else {
                    localStorage.setItem('theme', 'light')
                    setGlobalState({
                        theme: 'light',
                        auth: globalState.auth
                    })
                }
                break;
            case 'auth':
                localStorage.setItem('auth', action.auth)
                setGlobalState({
                    auth: action.auth,
                    theme: globalState.theme
                })
                break;
            default:
                throw new Error('Action não encontrada')
        }
    }

    return (
        <GlobalContext.Provider value={{ globalState, changeGlobal }}>
            {props.children}
        </GlobalContext.Provider>
    )

}

export function useGlobal() {
    const context = useContext(GlobalContext)
    return context
}