import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Company from "./pages/Company";
import Contact from "./pages/Contact";
import Home from "./pages/Home";
import NewProject from "./pages/NewProject";
import Projects from "./pages/Projects";

import Container from "./layout/Container";
import Footer from "./layout/Footer"
import Navbar from "./layout/Navbar"

function App() {
  return (
    <Router>
      <Navbar />
      <Container customClass="min-height">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/company" element={<Company />} />
          <Route path="/newproject" element={<NewProject />} />
        </Routes>
      </Container>
      <Footer />
    </Router>
  );
}

export default App;
