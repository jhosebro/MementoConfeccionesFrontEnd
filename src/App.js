import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/pages/Home";
import Colegios from "./components/pages/Colegios";
import NavBar from "./components/navigation/NavBar";

function App() {
  return (
    <>
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="colegios" element={<Colegios />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
