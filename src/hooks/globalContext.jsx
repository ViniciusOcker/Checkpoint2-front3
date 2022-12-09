import { useReducer } from "react"
import { createContext, useContext } from "react"

const GlobalContext = createContext()

export function GlobalProvider(props) {

    function globalReducer(state, action) {
        switch (action.state) {
            case 'theme':
                switch(action.theme){
                    case 'dark':
                        localStorage.setItem('theme', 'dark')
                        return (state.theme = 'dark')
                    case 'light':
                        localStorage.setItem('theme', 'light')
                        return (state.theme = 'light')
                    default:
                        localStorage.setItem('theme', 'dark')
                        return (state.theme = 'dark')
                }
                
            case 'auth':
                localStorage.setItem('auth', action.auth)
                return (state.auth = action.auth)
            default:
                throw new Error('Action não encontrada')

        }

    }
    
    let themeLocalStorage = localStorage.getItem('theme');
    if(themeLocalStorage === undefined){
        themeLocalStorage = 'dark'
    }
    
    let authLocalStorage = localStorage.getItem('auth');
    if(authLocalStorage === undefined){
        authLocalStorage = null
    }
    
    const [global, dispatchGlobal] = useReducer(globalReducer, {
        theme: themeLocalStorage,
        auth: authLocalStorage
    })


    return(
        <GlobalContext.Provider value={{global, dispatchGlobal}}>
            { props.children }
        </GlobalContext.Provider>

    )

}

export function useGlobal() {
    const context = useContext(GlobalContext)
    return context
}