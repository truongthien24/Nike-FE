import { Loading } from "component/Loading/Loading";
import React, { useEffect, useLayoutEffect } from "react";
import { Toaster } from "react-hot-toast";
import { LoadingProvider } from "./LoadingProvider";
import { jwtDecode } from "jwt-decode";
import { useDispatch } from "react-redux";
import { setUserInfo } from "redux/action/homeAction";

const LayoutMaster = ({ component }) => {

  const dispatch = useDispatch();

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    let userJwt = {};
    if (jwt) {
      const jwtDC = jwtDecode(jwt);
      if (jwtDC) {
        userJwt = jwtDC?.account;
        // Check valid token
        dispatch(setUserInfo(userJwt))
      } 
    }
  }, [])

  return (
    <LoadingProvider>
      <Toaster position="top-center" toastOptions={{ duration: 2000 }} />
      {component}
      <Loading />
    </LoadingProvider>
  );
};

export default LayoutMaster;
