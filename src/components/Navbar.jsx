import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <header className="bg-gray-800 text-white p-4">
            <div className="container mx-auto flex justify-between items-center">
                <h1 className="text-xl font-bold">POS Interface</h1>
                <nav>
                    <Link to="/" className="px-4">
                        Home
                    </Link>
                    <Link to="/checkout" className="px-4">
                        Checkout
                    </Link>
                </nav>
            </div>
        </header>
    );
};

export default Navbar;
