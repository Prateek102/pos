
import React from "react";
import ServiceCard from "./ServiceCard";

const Health = ({ config, addToCart }) => {
    console.log("this is config", config);

    return (
        <div style={{ display: "flex" }}>
            {config.map((item) => (
                <ServiceCard
                    item={item.item}
                    description={item.description}
                    price={item.price}
                    imageUrl={item.img}
                />
            ))}
        </div>
    );
};

export default Health;