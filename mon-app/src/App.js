import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
// import Furnitures from "./components/Furnitures";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Home from "./pages/Home";
import Admin from "./pages/Admin";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<Home />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
