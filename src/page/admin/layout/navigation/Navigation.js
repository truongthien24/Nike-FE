import React from "react";
import {
  AppstoreOutlined,
  ContainerOutlined,
  MenuFoldOutlined,
  PieChartOutlined,
  MenuUnfoldOutlined,
  DesktopOutlined,
  MailOutlined,
} from "@ant-design/icons";
import { Button, Menu } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}

export const Navigation = () => {
  const [collapsed, setCollapsed] = useState(false);
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const navigate = useNavigate();

  const items = [
    getItem(
      <div
        onClick={() => {
          navigate("/admin/dashboard");
        }}
      >
        Dashboard
      </div>,
      "1",
      <PieChartOutlined />
    ),
    getItem(
      <div
        onClick={() => {
          navigate("/admin/accountManagement");
        }}
        Quản
        lý
      >
        Account
      </div>,
      "2",
      <DesktopOutlined />
    ),
    getItem(
      <div
        onClick={() => {
          navigate("/admin/productManagement");
        }}
      >
        Quản lý sản phẩm
      </div>,
      "3",
      <ContainerOutlined />
    ),
    getItem("System", "sub1", <ContainerOutlined />, [
      getItem(
        <div
          onClick={() => {
            navigate("/admin/kichCoManagement");
          }}
        >
          Quản lý kích cở
        </div>,
        "4"
      ),
      getItem(
        <div
          onClick={() => {
            navigate("/admin/khuyenMaiManagement");
          }}
        >
          Quản lý khuyến mãi
        </div>,
        "5"
      ),
      getItem(
        <div
          onClick={() => {
            navigate("/admin/thuongHieuManagement");
          }}
        >
          Quản lý thương hiệu
        </div>,
        "6"
      ),
      // getItem(
      //   <div
      //     onClick={() => {
      //       navigate("/admin/nhaXuatBanManagement");
      //     }}
      //   >
      //     Quản lý Nhà Xuất bản
      //   </div>,
      //   "7"
      // ),
      // getItem(
      //   <div
      //     onClick={() => {
      //       navigate("/admin/ngonNguManagement");
      //     }}
      //   >
      //     Quản lý ngôn ngữ
      //   </div>,
      //   "8"
      // ),
    ]),
    getItem(
      <div
        onClick={() => {
          navigate("/admin/donHangManagement");
        }}
      >
        Quản lý đơn hàng
      </div>,
      "8",
      <MailOutlined />
    ),
    getItem(
      <div
        onClick={() => {
          navigate("/admin/binhLuanManagement");
        }}
      >
        Quản lý bình luận
      </div>,
      "9",
      <MailOutlined />
    ),
    getItem(
      <div
        onClick={() => {
          navigate("/admin/bannerManagement");
        }}
      >
        Quản lý banner
      </div>,
      "10",
      <MailOutlined />
    ),
    // getItem("Booking", "sub2", <MailOutlined />, [
    //   getItem(
    //     <div
    //       onClick={() => {
    //         navigate("/admin/binhLuanManagement");
    //       }}
    //     >
    //       Quản lý bình luận
    //     </div>,
    //     "9"
    //   ),
    //   getItem(
    //     <div
    //       onClick={() => {
    //         navigate("/admin/bookingService");
    //       }}
    //     >
    //       Booking Service
    //     </div>,
    //     "10"
    //   ),
    // ]),
    // getItem(
    //   <div
    //     onClick={() => {
    //       navigate("/admin/serviceManagement");
    //     }}
    //   >
    //     Service Management
    //   </div>,
    //   "11",
    //   <ContainerOutlined />
    // ),
    // getItem(
    //   <div
    //     onClick={() => {
    //       navigate("/admin/baiVietManagement");
    //     }}
    //   >
    //     Bai Viet
    //   </div>,
    //   "12",
    //   <ContainerOutlined />
    // ),
  ];

  return (
    <div className="admin__navigation bg-[#000B16] w-[256px] h-[calc(100vh-100px)]">
      {/* <Button
            type="primary"
            onClick={toggleCollapsed}
            style={{
                marginBottom: 16,
            }}
            >
            { <MenuFoldOutlined />}
            </Button> */}
      <div className="flex items-center justify-center py-[20px]">
        <img
          src="/images/nike-logo.png"
          className="w-[100px]"
          style={{filter: "drop-shadow(0.5 0.3 1rem #fff)"}}
        />
      </div>
      <Menu
        defaultSelectedKeys={["1"]}
        defaultOpenKeys={["sub1"]}
        mode="inline"
        theme="dark"
        inlineCollapsed={collapsed}
        items={items}
      />
    </div>
  );
};
