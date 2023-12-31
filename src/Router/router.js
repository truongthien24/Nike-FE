import React from "react";
import { Route, Routes } from "react-router-dom";
import { Layout1 } from "../page/user/layout/Layout1";
import { HomeUser } from "../page/user/page/home/Home";
import { Login } from "../page/user/page/login/Login";
import { Layout1Admin } from "../page/admin/layout/Layout1Admin";
import { Register } from "../page/user/page/register/Register";
import { Dashboard } from "../page/admin/page/Dashboard/Dashboard";
import { Login as LoginAdmin } from "../page/admin/page/login/Login";
import { BookManagement } from "../page/admin/page/RoomManagement/BookManagement";
import VerifyEmail from "page/user/page/verifyEmail/VerifyEmail";
import TheLoaiManagement from "page/admin/page/System/theLoaiManagement/TheLoaiManagement";
import TacGiaManagement from "page/admin/page/System/tacGiaManagement/TacGiaManagement";
import NhaCungCapManagement from "page/admin/page/System/nhaCungCapManagement/NhaCungCapManagement";
import NhaXuatBanManagement from "page/admin/page/System/nhaXuatBanManagement/NhaXuatBanManagement";
import Cart from "page/user/page/cart/Cart";
import NgonNguManagement from "page/admin/page/System/ngonNguManagement/NgonNguManagement";
import { BaiVietManagement } from "page/admin/page/baiVietManagement/BaiVietManagement";
import Payment from "page/user/page/payment/Payment";
import InfoBook from "page/user/page/infoBook/InfoBook";
// import { Contact } from '../page/user/page/contact/Contact';
import { Button, Result } from "antd";

export const MainRoutes = () => {
  return (
    <div>
      <Routes>
        {/* Trang mặc định */}
        {/* <Route path="/" element={<Welcome/>}/> */}
        <Route path="/" element={<Layout1 />}>
          <Route index element={<HomeUser />} />
          {/* <Route path="infoBook/:id" element={<InfoBook />} />
          <Route path="cart/:id" element={<Cart />} />
          <Route path="payment" element={<Payment />} /> */}
        </Route>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route
          path="*"
          element={
            <Result
              status="404"
              title="404"
              subTitle="Sorry, the page you visited does not exist."
              extra={
                <Button
                  type="primary"
                  onClick={() => window.location.replace("/")}
                >
                  Back Home
                </Button>
              }
            />
          }
        />
        <Route path="/:id/verify/:token" element={<VerifyEmail />} />
        {/* <Route path="/admin" element={<Layout1Admin />}>
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="bookManagement" element={<BookManagement />} />
          <Route path="theLoaiManagement" element={<TheLoaiManagement />} />
          <Route path="tacGiaManagement" element={<TacGiaManagement />} />
          <Route path="ngonNguManagement" element={<NgonNguManagement />} />
          <Route path="baiVietManagement" element={<BaiVietManagement />} />
          <Route
            path="nhaCungCapManagement"
            element={<NhaCungCapManagement />}
          />
          <Route
            path="nhaXuatBanManagement"
            element={<NhaXuatBanManagement />}
          />
          <Route path="login" element={<LoginAdmin />} />
          <Route path="*" element={<div>Page not found</div>} />
        </Route> */}
      </Routes>
    </div>
  );
};
