import React, { useState } from "react";
import Receipt from "../components/Receipt";

const Checkout = () => {
    const [customer, setCustomer] = useState({ name: "", email: "" });
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitted(true);
    };

    return isSubmitted ? (
        <Receipt customer={customer} />
    ) : (
        <div className="container mx-auto p-4">
            <h2 className="text-xl font-bold mb-4">Customer Information</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="text"
                    placeholder="Name"
                    value={customer.name}
                    onChange={(e) =>
                        setCustomer({ ...customer, name: e.target.value })
                    }
                    className="w-full p-2 border rounded"
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={customer.email}
                    onChange={(e) =>
                        setCustomer({ ...customer, email: e.target.value })
                    }
                    className="w-full p-2 border rounded"
                />
                <button className="bg-blue-500 text-white px-4 py-2 rounded">
                    Complete Purchase
                </button>
            </form>
        </div>
    );
};

export default Checkout;
