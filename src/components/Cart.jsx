import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Card, Button, Divider, Typography } from "antd";
import { MinusOutlined, PlusOutlined, DeleteOutlined } from "@ant-design/icons";
import {
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
} from "../hooks/cartReducer";

const { Title, Text } = Typography;

export default function Cart() {
    const dispatch = useDispatch();
    const cartItems = useSelector((state) => state.cart.cartItems);

    const subtotal = cartItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );
    const discount = 5.0;
    const tax = (subtotal - discount) * 0.06; 
    const total = subtotal - discount + tax;

    const handleIncreaseQuantity = (id) => {
        dispatch(increaseQuantity(id));
    };

    const handleDecreaseQuantity = (id) => {
        dispatch(decreaseQuantity(id));
    };

    const handleRemoveItem = (id) => {
        dispatch(removeFromCart(id));
    };

    return (
        <Card
            title={<Title level={4}>Current Order</Title>}
            style={{ width: "100%", maxWidth: 400 }}
        >
            <div className="space-y-4">
                {cartItems.map((item) => (
                    <div key={item.id} className="flex items-start space-x-4">
                        <img
                            src={item.image || "/placeholder.svg"}
                            alt={item.name}
                            className="h-16 w-16 rounded-md object-cover"
                        />
                        <div className="flex-1 space-y-1">
                            <Text strong>{item.name}</Text>
                            <div className="flex items-center justify-between">
                                <Text type="warning">
                                    ${item.price.toFixed(2)}
                                </Text>
                                <div className="flex items-center space-x-2">
                                    <Button
                                        icon={<MinusOutlined />}
                                        onClick={() =>
                                            handleDecreaseQuantity(item.id)
                                        }
                                        disabled={item.quantity <= 1}
                                        size="small"
                                    />
                                    <Text>{item.quantity}</Text>
                                    <Button
                                        icon={<PlusOutlined />}
                                        onClick={() =>
                                            handleIncreaseQuantity(item.id)
                                        }
                                        size="small"
                                    />
                                    <Button
                                        icon={<DeleteOutlined />}
                                        onClick={() =>
                                            handleRemoveItem(item.id)
                                        }
                                        size="small"
                                        danger
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                ))}

                <Divider />

                <div className="space-y-2">
                    <div className="flex justify-between">
                        <Text>Subtotal</Text>
                        <Text>${subtotal.toFixed(2)}</Text>
                    </div>
                    <div className="flex justify-between">
                        <Text type="secondary">Discount sales</Text>
                        <Text type="secondary">-${discount.toFixed(2)}</Text>
                    </div>
                    <div className="flex justify-between">
                        <Text type="secondary">Total sales tax</Text>
                        <Text type="secondary">${tax.toFixed(2)}</Text>
                    </div>
                </div>

                <Divider />

                <div className="flex justify-between">
                    <Text strong>Total</Text>
                    <Text strong>${total.toFixed(2)}</Text>
                </div>

                <Button
                    type="primary"
                    style={{
                        width: "100%",
                        marginTop: "16px",
                        backgroundColor: "#f5a623",
                    }}
                >
                    Continue to Payment
                </Button>
            </div>
        </Card>
    );
}
