import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Layout, Row, Col } from "antd";
import HeaderComponent from "../components/HeaderComponent";
import SideBar from "../components/SideBar";
import ServiceList from "../components/ServiceList";
import Cart from "../components/Cart";
import { addToCart } from "../hooks/cartReducer";

const { Content } = Layout;

const Home = () => {
    const dispatch = useDispatch();
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
    function checkMargin() {
        if (isMobileWidth) return 0;
        if (sidebarVisible && isTabletWidth) {
            return 80;
        }
        return 240;
    }

    const handleAddToCart = (service) => {
        dispatch(addToCart(service));
    };

    return (
        <Layout>
            <SideBar
                visible={sidebarVisible}
                tabletVisible={isTabletWidth}
                onClose={() => setSidebarVisible(false)}
                isMobileWidth={isMobileWidth}
            />
            <Layout
                style={{
                    marginLeft: checkMargin(),
                    transition: "margin-left 0.3s ease",
                    minHeight: "100vh",
                }}
            >
                <HeaderComponent
                    onMenuClick={toggleSidebar}
                    isMobileWidth={isMobileWidth}
                    headerText="Dashboard"
                />

                <Content style={{ margin: "24px 16px", overflow: "initial" }}>
                    <Row gutter={[24, 24]}>
                        <Col xs={24} lg={16}>
                            <ServiceList
                                addToCart={handleAddToCart}
                                isMobileWidth={isMobileWidth}
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
