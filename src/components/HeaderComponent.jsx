import { Layout, Typography, Avatar, Dropdown, Button } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import { profilePhoto } from "../utils/imageUtils";

const { Title } = Typography;
const { Header } = Layout;

const HeaderComponent = ({ isMobileWidth, headerText, toggleSidebar }) => {
    const menuItems = [
        {
            key: "profile",
            label: "Profile",
        },
        {
            key: "logout",
            label: "Logout",
        },
    ];

    return (
        <Header
            style={{
                background: "#fff",
                padding: "0 16px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                height: "64px",
                position: "sticky",
                top: 0,
                zIndex: 1,
                width: "100%",
            }}
        >
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "16px",
                    flex: 1,
                }}
            >
                {isMobileWidth ? (
                    <Button
                        type="text"
                        icon={<MenuOutlined />}
                        onClick={toggleSidebar} // This triggers sidebar toggle
                        style={{
                            fontSize: "18px",
                            padding: 0,
                        }}
                    />
                ) : (
                    <Title
                        level={2}
                        style={{
                            marginBottom: 0,
                            paddingLeft: 16,
                        }}
                    >
                        {headerText || "Dashboard"}
                    </Title>
                )}
            </div>

            <div
                style={{
                    display: "flex",
                    gap: "16px",
                    alignItems: "center",
                }}
            >
                <Dropdown menu={{ items: menuItems }}>
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            cursor: "pointer",
                            gap: 8,
                        }}
                    >
                        <Avatar
                            size={32}
                            src={profilePhoto}
                            alt="User Avatar"
                        />
                    </div>
                </Dropdown>
            </div>
        </Header>
    );
};

export default HeaderComponent;
