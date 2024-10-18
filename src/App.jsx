import { Outlet } from "react-router-dom";
import { Navbar } from "./components/index.js";

function App() {
  return (
    <>
      <header>
        <Navbar />
      </header>
      <main>
        <Outlet />
      </main>
      <footer>
        
      </footer>
    </>
  );
}

export default App;
