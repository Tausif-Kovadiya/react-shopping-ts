import { Container } from "react-bootstrap";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import { CartContextProvider } from "./context/cartContext";
import About from "./Pages/About";
import Home from "./Pages/Home";
import Page404 from "./Pages/Page404";
import Store from "./Pages/Store";

function App() {
  return (
    <>
      <CartContextProvider>
        <Navbar />
        <Container className="mb-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/store" element={<Store />} />
            <Route path="*" element={<Page404 />} />
          </Routes>
        </Container>
      </CartContextProvider>
    </>
  );
}

export default App;
