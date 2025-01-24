import { useState, useEffect } from "react";
import { Layout, Menu, Button } from "antd";
import {
    AppstoreOutlined,
    TeamOutlined,
    UserOutlined,
    FolderOutlined,
    CustomerServiceOutlined,
    SettingOutlined,
    CloseOutlined,
} from "@ant-design/icons";
import { yogaIcon } from "../utils/imageUtils";
import { useNavigate } from "react-router-dom";
import "./css/sidebar.css";

const { Sider } = Layout;

const SideBar = ({ visible, onClose, isMobileWidth, tabletVisible }) => {
    const [selectedKey, setSelectedKey] = useState("1");
    const navigate = useNavigate();

    useEffect(() => {
        const savedKey = localStorage.getItem("selectedMenuKey");
        if (savedKey) {
            setSelectedKey(savedKey);
        }
    }, []);

    const handleMenuClick = ({ key }) => {
        setSelectedKey(key);
        localStorage.setItem("selectedMenuKey", key);
        if (key === "1") {
            navigate("/");
        }
    };

    const menuItems = [
        {
            key: "main",
            type: "group",
            label: visible ? "MAIN MENU" : null,
            children: [
                {
                    key: "1",
                    icon: <AppstoreOutlined />,
                    label: "Dashboard",
                },
                {
                    key: "2",
                    icon: <TeamOutlined />,
                    label: "Checkout",
                },
                {
                    key: "3",
                    icon: <UserOutlined />,
                    label: "Dummy1",
                },
                {
                    key: "4",
                    icon: <FolderOutlined />,
                    label: "Dummy2",
                },
            ],
        },
        {
            key: "other",
            type: "group",
            label: visible ? "OTHER" : null,
            children: [
                {
                    key: "5",
                    icon: <CustomerServiceOutlined />,
                    label: "Admin Panel",
                },
                {
                    key: "6",
                    icon: <SettingOutlined />,
                    label: "Setting",
                },
            ],
        },
    ];

    return (
        <Sider
            width={240}
            collapsed={tabletVisible || !visible}
            collapsedWidth={isMobileWidth ? 0 : 80}
            trigger={null}
            style={{
                backgroundColor: "#FAFAFA",
                height: "100vh",
                position: "fixed",
                left: 0,
                top: 0,
                bottom: 0,
                zIndex: 1001,
            }}
        >
            <div
                style={{
                    padding: "16px",
                    textAlign: "center",
                    transition: "all 0.3s ease",
                    position: "relative",
                }}
            >
                <img
                    src={yogaIcon}
                    alt="Saarthi Logo"
                    style={{
                        height: tabletVisible ? "32px" : "80px",
                        transition: "all 0.3s ease",
                    }}
                />
                {isMobileWidth && visible && (
                    <Button
                        type="text"
                        icon={<CloseOutlined />}
                        onClick={onClose}
                        style={{
                            position: "absolute",
                            right: 16,
                            top: "50%",
                            transform: "translateY(-50%)",
                        }}
                    />
                )}
            </div>

            <Menu
                mode="inline"
                selectedKeys={[selectedKey]}
                onClick={handleMenuClick}
                style={{
                    backgroundColor: "#FAFAFA",
                    border: "none",
                    padding: "8px",
                }}
                items={menuItems}
            />
        </Sider>
    );
};

export default SideBar;
