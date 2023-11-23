import { Icon } from "assets/icon";
import { COLOR } from "page/user/shareComponent/constant";
import React from "react";
import Menu from "../Menu/Menu";
import Caterory from "../Category/Caterory";
import Cart from "../Cart";
import Favourite from "../Favourite";
import { UserLogin } from "../UserLogin";
import { ChangeLanguage } from "../ChangeLanguage";
import FormSearch from "../FormSearch";
import { useNavigate } from "react-router-dom";

const NavbarDesktop = (props) => {
  const { setIsProfile } = props;

  const navigate = useNavigate();

  const returnHome = () => {
    navigate("/");
  };

  return (
    <div className="w-full bg-transparent px-[10px] md:px-[20px] flex items-center flex-col p-[10px]">
      <div className="w-full xl:w-[90%] flex items-center justify-between">
        <div className="flex items-center w-[70%]">
          <div className="flex items-center mr-[30px] cursor-pointer" onClick={returnHome}>
            {/* <img
              src="/images/logo.png"
              className="w-[40px] md:w-[70px] lg:w-[80px]"
            /> */}
            <svg aria-hidden="true" class="pre-logo-svg" focusable="false" viewBox="0 0 24 24" role="img" width="24px" height="24px" fill="none">
              <path fill="currentColor" fill-rule="evenodd" d="M21 8.719L7.836 14.303C6.74 14.768 5.818 15 5.075 15c-.836 0-1.445-.295-1.819-.884-.485-.76-.273-1.982.559-3.272.494-.754 1.122-1.446 1.734-2.108-.144.234-1.415 2.349-.025 3.345.275.2.666.298 1.147.298.386 0 .829-.063 1.316-.19L21 8.719z" clip-rule="evenodd"></path>
            </svg>
            <h1 className="text-[20px]">Nike&</h1>
          </div>
          <FormSearch />
        </div>
        <div className="w-[30%] flex items-center justify-between">
          <ChangeLanguage />
          <UserLogin setIsProfile={setIsProfile} />
          <div>
            <Favourite styles={{ marginRight: "15px" }} />
            <Cart />
          </div>
        </div>
      </div>
      <div className="w-full xl:w-[90%] 2xl:w-[70%] flex justify-center mt-[10px] items-center">
        {/* <Caterory /> */}
        <Menu />
        {/* <div className="flex items-center h-[45px]">
          <Icon
            name="phone"
            color={COLOR.primaryColor}
            fill={COLOR.primaryColor}
          />
          <span
            style={{
              color: `${COLOR.primaryColor}`,
              fontWeight: "500",
              fontSize: "20px",
              marginLeft: "10px",
              letterSpacing: "2px",
            }}
          >
            0764026183
          </span>
        </div> */}
      </div>
    </div>
  );
};

export default NavbarDesktop;
