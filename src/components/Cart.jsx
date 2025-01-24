import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Card, Button, Divider, Typography, Modal, Input, Form } from "antd";
import { MinusOutlined, PlusOutlined, DeleteOutlined } from "@ant-design/icons";
import {
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
} from "../hooks/cartReducer";
import "./css/cart.css";

const { Title, Text } = Typography;

export default function Cart() {
    const dispatch = useDispatch();
    const cartItems = useSelector((state) => state.cart.cartItems);

    // Calculate values based on cart items
    const subtotal = cartItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );
    const discount = cartItems.length > 0 ? 250.0 : 0; // Set to 0 if cart is empty
    const tax = cartItems.length > 0 ? (subtotal - discount) * 0.06 : 0; // Set to 0 if cart is empty
    const total = cartItems.length > 0 ? subtotal - discount + tax : 0; // Set to 0 if cart is empty

    const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
    const [isInvoiceModalOpen, setIsInvoiceModalOpen] = useState(false);
    const [formData, setFormData] = useState({ name: "", email: "" });
    const [isPaymentSuccessful, setIsPaymentSuccessful] = useState(false);

    const handleIncreaseQuantity = (id) => {
        dispatch(increaseQuantity(id));
    };

    const handleDecreaseQuantity = (id) => {
        dispatch(decreaseQuantity(id));
    };

    const handleRemoveItem = (id) => {
        dispatch(removeFromCart(id));
    };

    const handlePaymentFormSubmit = (values) => {
        setFormData(values);
        setIsPaymentSuccessful(true); // Simulate successful payment
        setIsPaymentModalOpen(false);
        setIsInvoiceModalOpen(true); // Open invoice modal after payment
    };

    const handlePaymentCancel = () => {
        setIsPaymentModalOpen(false);
    };

    const handleInvoiceCancel = () => {
        setIsInvoiceModalOpen(false);
    };

    return (
        <>
            <Card
                className="cart-card"
                title={
                    <Title level={2} style={{ textAlign: "center" }}>
                        Current Order
                    </Title>
                }
            >
                <div className="space-y-4">
                    {cartItems.map((item) => (
                        <div
                            key={item.id}
                            className="cart-item"
                            style={{ marginBottom: "10px" }}
                        >
                            <img
                                src={item.imageUrl}
                                alt={item.name}
                                className="cart-item-img"
                            />
                            <div className="cart-item-details">
                                <Text className="cart-item-text">
                                    {item.name}
                                </Text>
                                <div className="flex items-center justify-between">
                                    <Text className="cart-item-price">
                                        ₹{item.price.toFixed(2)}
                                    </Text>
                                    <div className="cart-item-actions">
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

                    <div className="cart-summary">
                        <div className="cart-summary-line">
                            <Text>Subtotal</Text>
                            <Text>₹{subtotal.toFixed(2)}</Text>
                        </div>
                        <div className="cart-summary-line secondary">
                            <Text>Discount sales</Text>
                            <Text>-₹{discount.toFixed(2)}</Text>
                        </div>
                        <div className="cart-summary-line secondary">
                            <Text>Total sales tax</Text>
                            <Text>₹{tax.toFixed(2)}</Text>
                        </div>
                    </div>

                    <Divider />

                    <div className="cart-total">
                        <Text>Total &nbsp;</Text>
                        <Text>₹{total.toFixed(2)}</Text>
                    </div>

                    <Button
                        className="cart-payment-button"
                        type="primary"
                        onClick={() => setIsPaymentModalOpen(true)}
                        disabled={cartItems.length === 0} // Disable button if cart is empty
                    >
                        Continue To Payment
                    </Button>
                </div>
            </Card>

            {/* Payment Modal */}
            <Modal
                title="Payment Details"
                open={isPaymentModalOpen} // Use 'open' instead of 'visible'
                onCancel={handlePaymentCancel}
                footer={null}
                width={400}
            >
                <Form onFinish={handlePaymentFormSubmit}>
                    <Form.Item
                        label="Name"
                        name="name"
                        rules={[
                            {
                                required: true,
                                message: "Please input your name!",
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                            {
                                required: true,
                                message: "Please input your email!",
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            style={{ width: "100%" }}
                        >
                            Submit Payment
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>

            {/* Invoice Modal */}
            <Modal
                title="Invoice"
                open={isInvoiceModalOpen} // Use 'open' instead of 'visible'
                onCancel={handleInvoiceCancel}
                footer={null}
                width={400}
            >
                <div>
                    <Text strong>Name: {formData.name}</Text>
                    <br />
                    <Text strong>Email: {formData.email}</Text>
                    <Divider />
                    <Text strong>Invoice Details</Text>
                    <div className="cart-summary">
                        <div className="cart-summary-line">
                            <Text>Subtotal</Text>
                            <Text>₹{subtotal.toFixed(2)}</Text>
                        </div>
                        <div className="cart-summary-line secondary">
                            <Text>Discount sales</Text>
                            <Text>-₹{discount.toFixed(2)}</Text>
                        </div>
                        <div className="cart-summary-line secondary">
                            <Text>Total sales tax</Text>
                            <Text>₹{tax.toFixed(2)}</Text>
                        </div>
                    </div>

                    <Divider />
                    <div className="cart-total">
                        <Text>Total: </Text>
                        <Text>₹{total.toFixed(2)}</Text>
                    </div>
                    <div>
                        <Text strong>Status: </Text>
                        <Text type="success">Payment Successful</Text>
                    </div>
                </div>
            </Modal>
        </>
    );
}
