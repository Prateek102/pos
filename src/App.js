import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Checkout from "./pages/Checkout";
import Navbar from "./components/Navbar";

const App = () => {
    return (
        <Router>
            <div className="min-h-screen flex flex-col">
                <main className="flex-grow">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/checkout" element={<Checkout />} />
                    </Routes>
                </main>
            </div>
        </Router>
    );
};

export default App;
