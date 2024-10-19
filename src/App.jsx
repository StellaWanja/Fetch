import { Outlet, useLocation } from "react-router-dom";
import { Footer, Navbar } from "./components/index.js";

function App() {
  // Use the useLocation hook to get the current route
  const location = useLocation();

  // Define path where the navbar should be hidden
  const hideNavbarPaths = ["/auth"];

  // Check if the current route should hide the navbar
  const shouldHideNavbar = hideNavbarPaths.includes(location.pathname);

  return (
    <>
      {!shouldHideNavbar && (
        <header>
          <Navbar />
        </header>
      )}
      <main>
        <Outlet />
      </main>
      {!shouldHideNavbar && (
        <footer>
          <Footer />
        </footer>
      )}
    </>
  );
}

export default App;
