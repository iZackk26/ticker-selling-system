import { BrowserRouter as Router, Routes, Route, } from "react-router-dom";
import Home from "./pages/Home";
import Check from "./pages/Check";
import Available from "./pages/Available";
import Sell from "./pages/Sell";

const Routing = () => (
    <Router>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/check" element={<Check />} />
            <Route path="/available" element={<Available />} />
            <Route path="/sell" element={<Sell />} />
        </Routes>
    </Router>
);

export default Routing;
