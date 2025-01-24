import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Layout, Row, Col } from "antd";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";
import HeaderComponent from "../components/HeaderComponent";
import SideBar from "../components/SideBar";
import ServiceList from "../components/ServiceList";
import Cart from "../components/Cart";
import { addToCart } from "../hooks/cartReducer";

const { Header, Content, Sider } = Layout;

const Home = () => {
    const dispatch = useDispatch();
    const cartItems = useSelector((state) => state.cart.cartItems);
    const [isMobileWidth, setIsMobileWidth] = useState(false);
    const [isTabletWidth, setIsTabletWidth] = useState(false);
    const [sidebarVisible, setSidebarVisible] = useState(true);

    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;
            setIsMobileWidth(width < 768);
            setIsTabletWidth(width >= 768 && width < 1024);
            setSidebarVisible(width >= 768);
        };

        window.addEventListener("resize", handleResize);
        handleResize();

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const toggleSidebar = () => {
        setSidebarVisible(!sidebarVisible);
    };

    const handleAddToCart = (service) => {
        dispatch(addToCart(service));
    };

    return (
        <Layout style={{ minHeight: "100vh" }}>
            <Sider
                trigger={null}
                collapsible
                collapsed={!sidebarVisible}
                breakpoint="lg"
                collapsedWidth={0}
                onBreakpoint={(broken) => {
                    if (broken) {
                        setSidebarVisible(false);
                    }
                }}
                style={{
                    overflow: "auto",
                    height: "100vh",
                    position: "fixed",
                    left: 0,
                    zIndex: 2,
                }}
            >
                <SideBar />
            </Sider>
            <Layout
                style={{
                    marginLeft: sidebarVisible ? 200 : 0,
                    transition: "margin 0.2s",
                }}
            >
                <Header style={{ padding: 0, background: "#fff" }}>
                    <Row justify="space-between" align="middle">
                        <Col>
                            {React.createElement(
                                sidebarVisible
                                    ? MenuFoldOutlined
                                    : MenuUnfoldOutlined,
                                {
                                    className: "trigger",
                                    onClick: toggleSidebar,
                                    style: {
                                        fontSize: "18px",
                                        padding: "0 24px",
                                        cursor: "pointer",
                                    },
                                }
                            )}
                        </Col>
                        <Col>
                            <HeaderComponent isMobileWidth={isMobileWidth} />
                        </Col>
                    </Row>
                </Header>
                <Content style={{ margin: "24px 16px", overflow: "initial" }}>
                    <Row gutter={[24, 24]}>
                        <Col xs={24} lg={16}>
                            <ServiceList
                                addToCart={handleAddToCart}
                                isMobileWidth={isMobileWidth}
                                isTabletWidth={isTabletWidth}
                            />
                        </Col>
                        <Col xs={24} lg={8}>
                            <Cart />
                        </Col>
                    </Row>
                </Content>
            </Layout>
        </Layout>
    );
};

export default Home;
