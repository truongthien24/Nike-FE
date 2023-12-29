import React, { createContext, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { Footer } from "../component/Footer";
import { ScrollToTop } from "../component/ScrollToTop";
import { useDispatch } from "react-redux";
import { getUser } from "../../../redux/action/accountAction";
import Navbar from "../component/Navbar";
import useGetAccountByID from "page/admin/page/accountManagement/hook/useGetAccountByID";
import { jwtDecode } from "jwt-decode";
import { setGioHangInfo, setUserInfo } from "redux/action/homeAction";
import useGetDetailGioHang from "page/admin/page/GioHangManagement/hook/userGetDetailGioHang";

export const LayoutContext = createContext(null);

export const Layout1 = () => {
  const pathname = window.location.pathname;

  const dispatch = useDispatch();

  const [isMenuMobile, setIsMenuMobile] = useState(false);
  const [id, setId] = useState(null);

  useEffect(() => {
    const jwt = JSON.parse(localStorage.getItem("jwt"));
    if (jwt) {
      const jwtDC = jwtDecode(jwt);
      setId(jwtDC?.account?.id);
    }
  }, []);

  window.addEventListener("resize", () => {
    const innerWidth = window.innerWidth;
    if (innerWidth < 900) {
      setIsMenuMobile(true);
    } else {
      setIsMenuMobile(false);
    }
  });

  const { accountData, isDataLoading, fetchData, isFetching } =
    useGetAccountByID({ id: id });

    const { gioHangDataDetail, isDataDetailLoading, fetchData: fetchGioHang, isFetching: isFetchingGioHang } =
    useGetDetailGioHang("0", "0", accountData?.cartId);

  useEffect(() => {
    if (accountData) {
      dispatch(setUserInfo(accountData));
      dispatch(setGioHangInfo(gioHangDataDetail))
    }
  }, [accountData, gioHangDataDetail]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    const innerWidth = window.innerWidth;
    if (innerWidth < 900) {
      setIsMenuMobile(true);
    } else {
      setIsMenuMobile(false);
    }
  }, []);

  return (
    <LayoutContext.Provider
      value={{ isMobile: isMenuMobile, fetchDataAccount: fetchData, fetchDataGioHang: fetchGioHang }}
    >
      <div className="user bg-[#fcfcfc]">
        <Navbar />
        <div className="min-h-screen flex flex-col justify-between">
          <Outlet />
          <Footer />
        </div>
        <ScrollToTop />
      </div>
    </LayoutContext.Provider>
  );
};
