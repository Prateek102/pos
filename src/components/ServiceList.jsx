import React, { useState } from "react";
import { Layout, Row, Col, Segmented } from "antd";
import { list } from "../utils/serviceList";
import Mental from "./Mental";
import Nutritional from "./Nutritional";
import Professional from "./Professional";
import Recreational from "./Recreational";
import Health from "./Health";
import Workshops from "./Workshops";
import Therapy from "./Therapy";
import Fitness from "./Fitness";

import {
    UserOutlined,
    UsergroupAddOutlined,
    NotificationOutlined,
    CloudUploadOutlined,
} from "@ant-design/icons";

import "./css/serviceList.css";
// import "./css/scrollableSegment.css";


const ServiceList = ({ addToCart, isMobileWidth, isTabletWidth }) => {
    const [selectedSegment, setSelectedSegment] = useState("user1");
    console.log("this is list", list);

    const segmentOptions = [
        {
            label: (
                <div
                    className={
                        isMobileWidth
                            ? "segment-item segment-item-mobile"
                            : "segment-item"
                    }
                >
                    <UserOutlined style={{ fontSize: "20px" }} />
                    <span>Fitness Classes</span>
                </div>
            ),
            value: "user1",
            component: Fitness,
            config: list["Fitness Classes"],
        },
        {
            label: (
                <div
                    className={
                        isMobileWidth
                            ? "segment-item segment-item-mobile"
                            : "segment-item"
                    }
                >
                    <UsergroupAddOutlined style={{ fontSize: "20px" }} />
                    <span>Therapy Sessions</span>
                </div>
            ),
            value: "user2",
            component: Therapy,
            config: list["Therapy Sessions"],
        },
        {
            label: (
                <div
                    className={
                        isMobileWidth
                            ? "segment-item segment-item-mobile"
                            : "segment-item"
                    }
                >
                    <NotificationOutlined style={{ fontSize: "20px" }} />
                    <span>Workshops</span>
                </div>
            ),
            value: "user3",
            component: Workshops,
            config: list["Workshops"],
        },
        {
            label: (
                <div
                    className={
                        isMobileWidth
                            ? "segment-item segment-item-mobile"
                            : "segment-item"
                    }
                >
                    <CloudUploadOutlined style={{ fontSize: "20px" }} />
                    <span>Health and Wellness Programs</span>
                </div>
            ),
            value: "user4",
            component: Health,
            config: list["Wellness Programs"],
        },
        {
            label: (
                <div
                    className={
                        isMobileWidth
                            ? "segment-item segment-item-mobile"
                            : "segment-item"
                    }
                >
                    <CloudUploadOutlined style={{ fontSize: "20px" }} />
                    <span>Recreational Activities</span>
                </div>
            ),
            value: "user5",
            component: Recreational,
            config: list["Recreational Activities"],
        },
        {
            label: (
                <div
                    className={
                        isMobileWidth
                            ? "segment-item segment-item-mobile"
                            : "segment-item"
                    }
                >
                    <CloudUploadOutlined style={{ fontSize: "20px" }} />
                    <span>Professional Development</span>
                </div>
            ),
            value: "user6",
            component: Professional,
            config: list["Professional Development"],
        },
        {
            label: (
                <div
                    className={
                        isMobileWidth
                            ? "segment-item segment-item-mobile"
                            : "segment-item"
                    }
                >
                    <CloudUploadOutlined style={{ fontSize: "20px" }} />
                    <span>Nutritional Services</span>
                </div>
            ),
            value: "user7",
            component: Nutritional,
            config: list["Nutritional Services"],
        },
        {
            label: (
                <div
                    className={
                        isMobileWidth
                            ? "segment-item segment-item-mobile"
                            : "segment-item"
                    }
                >
                    <CloudUploadOutlined style={{ fontSize: "20px" }} />
                    <span>Mental Health Support</span>
                </div>
            ),
            value: "user8",
            component: Mental,
            config: list["Mental Health Support"],
        },
    ];

    const activeOption = segmentOptions.find(
        (option) => option.value === selectedSegment
    );

    const ActiveComponent = activeOption?.component || null;
    const activeConfig = activeOption?.config || [];

    return (
        <div>
            <Row>
                <Col span={24}>
                    <div className="scrollable-segment-container">
                        <Segmented
                            options={segmentOptions}
                            value={selectedSegment}
                            onChange={(value) => setSelectedSegment(value)}
                            className="custom-segmented"
                        />
                    </div>
                </Col>
            </Row>
            <Row style={{ marginTop: "24px" }}>
                <Col span={24}>
                    {ActiveComponent && (
                        <ActiveComponent
                            config={activeConfig}
                            addToCart={addToCart}
                        />
                    )}
                </Col>
            </Row>
        </div>
    );
};

export default ServiceList;
