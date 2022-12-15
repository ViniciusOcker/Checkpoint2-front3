import { render, screen } from "@testing-library/react"
import { BrowserRouter, MemoryRouter, Routes, Route } from "react-router-dom"
import { GlobalProvider } from "../hooks/globalContext"
import Home from "../Routes/Home"
import Detail from "../Routes/Detail"
import Login from "../Routes/Login"
import App from "../App"
import Footer from "../Components/Footer"

const API_URL = 'https://dhodonto.ctdprojetos.com.br'

const renderWithContext = (ui, providerValue) => {
    return render(
        <BrowserRouter>
            <GlobalProvider value={providerValue || { theme: "dark", auth: '', api: API_URL }} >
                {ui}
            </GlobalProvider>
        </BrowserRouter>
    )   
}

describe('Navbar componente', () => {
    it('Deveria ser renderizado em tela', () => {
        renderWithContext(<App />)

        expect(screen.getByRole('banner')).toHaveTextContent('DH Odonto')
    })
});
  
describe('Footer componente', () => {
    it('Deveria ser renderizado em tela', () => {
        renderWithContext(<App />)

        expect(screen.getByRole('contentinfo')).toHaveTextContent('Voltar para o topo')
    })
});  

describe('Navbar button login', () => {
    it('Deveria ser renderizado na tela', () => {
        renderWithContext(<Login />)

        expect(screen.getByText('Login')).toBeInTheDocument()
    })
}); 

describe('Navbar button home', () => {
    it('Deveria ser renderizado na tela', () => {
        renderWithContext(<Home />)

        expect(screen.getByText('Home')).toBeInTheDocument()
    })
}); 

describe('Footer button voltar para o topo', () => {
    it('Deveria ser renderizado na tela', () => {
        renderWithContext(<Footer />)
        expect(screen.getByText('Voltar para o topo')).toBeInTheDocument()
    })
}); 

// Only for testing individual routes as /dentist/:id
export const renderWithRouter = (ui, { route = '/', path = '/' }) => {
    window.history.pushState({}, 'Test page', route)

    return render(
        <MemoryRouter initialEntries={[route]}>
            <Routes>
                <Route index path={path} element={ui} />
            </Routes>
        </MemoryRouter>
    )
}

export * from "@testing-library/react"
export { renderWithContext as render }  