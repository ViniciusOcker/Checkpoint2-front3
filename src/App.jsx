
import { Outlet } from "react-router-dom";
import Footer from "./Components/Footer";
import Navbar from "./Components/Navbar";
import { useGlobal } from './hooks/globalContext';

function App() {
  const { globalState } = useGlobal();

  return (
    <>
      <div className={`app ${globalState.theme}`}>
        <Navbar />
        <main>
          <Outlet />
        </main>
        <Footer />
      </div>
    </>
  );
}

export default App;
