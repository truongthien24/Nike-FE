import React, { createContext, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { Navigation } from "./navigation/Navigation";
import TabMenu from "./tabMenu/TabMenu";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import useGetAccountByID from "../page/accountManagement/hook/useGetAccountByID";
import { setUserInfo } from "redux/action/homeAction";

export const LayoutContextAdmin = createContext(null);

export const Layout1Admin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { pathname } = window.location;

  const [id, setId] = useState(null);

  useEffect(() => {
    const jwt = JSON.parse(localStorage.getItem("jwt"));
    if (jwt) {
      const jwtDC = jwtDecode(jwt);
      if (["admin", "employee"].includes(jwtDC?.account.loaiTaiKhoan)) {
        setId(jwtDC?.account?.id);
      } else {
        navigate("/");
        toast.error("Tài khoản không được phân quyền");
      }
    }
  }, []);

  useEffect(() => {
    if (!localStorage.getItem("jwt")) {
      navigate("/admin/login");
    }
  }, [pathname]);

  const { accountData, isDataLoading, fetchData, isFetching } =
    useGetAccountByID({ id: id });

  useEffect(() => {
    if (accountData) {
      dispatch(setUserInfo(accountData));
    }
  }, [accountData]);

  return (
    <LayoutContextAdmin.Provider value={{ fetchDataAccount: fetchData }}>
      <div className="flex h-screen">
        <Navigation />
        <div className="w-[calc(100%-250px)] h-full">
          <TabMenu />
          <div className="px-[20px] py-[10px] h-[92%]">
            <Outlet />
          </div>
        </div>
      </div>
    </LayoutContextAdmin.Provider>
  );
};
