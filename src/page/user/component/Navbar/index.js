import React, { useContext, useState } from "react";
import NavbarDesktop from "./NavbarDesktop";
import NavbarMobile from "./NavbarMobile";
import { LayoutContext } from "page/user/layout/Layout1";


const Navbar = () => {

  const [isProfile, setIsProfile] = useState(false);

  const isMobile = useContext(LayoutContext);

  return (
    <>

      {isMobile?.isMobile ? (
        <NavbarMobile setIsProfile={setIsProfile} />
      ) : (
        <NavbarDesktop setIsProfile={setIsProfile} />
      )}
    </>
  );
};

export default Navbar;
