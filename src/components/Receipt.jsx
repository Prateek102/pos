import React from "react";

const Receipt = ({ customer }) => {
    return (
        <div className="container mx-auto p-4 text-center">
            <h2 className="text-xl font-bold">Thank You, {customer.name}!</h2>
            <p className="mt-2">
                Your receipt has been emailed to {customer.email}.
            </p>
        </div>
    );
};

export default Receipt;
