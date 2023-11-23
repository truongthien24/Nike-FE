import React, { createContext, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { Footer } from "../component/Footer";
import { ScrollToTop } from "../component/ScrollToTop";
import { useDispatch } from "react-redux";
import { getUser } from "../../../redux/action/accountAction";
import Navbar from "../component/Navbar";

export const LayoutContext = createContext(null);

export const Layout1 = () => {
  const pathname = window.location.pathname;

  const dispatch = useDispatch();

  const [isMenuMobile, setIsMenuMobile] = useState(false);

  window.addEventListener("resize", () => {
    const innerWidth = window.innerWidth;
    if (innerWidth < 900) {
      setIsMenuMobile(true);
    } else {
      setIsMenuMobile(false);
    }
  });


  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    const jwt = JSON.parse(localStorage.getItem("jwt"));
    dispatch(getUser(jwt));
    const innerWidth = window.innerWidth;
    if (innerWidth < 900) {
      setIsMenuMobile(true);
    } else {
      setIsMenuMobile(false);
    }
  }, []);

  return (
    <LayoutContext.Provider value={{isMobile: isMenuMobile}}>
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
