import React from "react";
import { Button, message } from "antd";
import { SendOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { addToCart } from "../hooks/cartReducer"; // Assuming this is your action creator
import "./css/serviceCard.css";

const ServiceCard = ({ item, description, price, imageUrl }) => {
    const dispatch = useDispatch();

    const handleAddToCart = () => {
        const fullItem = {
            id: item + price + imageUrl, // Unique ID, you can adjust this based on your needs
            name: item,
            description: description,
            price: price,
            imageUrl: imageUrl,
            quantity: 1, // Set quantity directly here
        };

        // Dispatch action to add the item to the cart
        dispatch(addToCart(fullItem));
        
        message.success(`${item} added to the cart!`);
        console.log(message.success());
    };

    return (
        <div className="cardContainer">
            <div className="service-card-content">
                <div className="service-image-container">
                    <img
                        src={imageUrl}
                        alt="product image"
                        className="service-image"
                    />
                </div>
                <div className="service-info">
                    <h3 className="service-name">{item}</h3>
                    <p className="service-user_role">{description}</p>
                    <p className="service-price"> ₹ {price}</p>
                </div>
                <Button
                    type="text"
                    icon={<SendOutlined />}
                    className="send-message-button"
                    onClick={handleAddToCart}
                >
                    Add to Cart
                </Button>
            </div>
        </div>
    );
};

export default ServiceCard;
