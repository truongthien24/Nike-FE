import React from "react";
import ItemMenu from "./components/ItemMenu";

const Menu = () => {
  const listMenu = [
    {
      key: "home",
      title: "Home",
      path: "/",
      child: [],
    },
    {
      key: "all",
      title: "All Shoe",
      path: "/allShoe",
      child: [],
    },
    {
      key: "aboutUs",
      title: "About Us",
      path: "/aboutUs",
      child: [],
    },
    {
      key: "contact",
      title: "Contact",
      path: "/contact",
      child: [],
    },
  ];

  const renderMenu = () => {
    return listMenu?.map((menu) => {
      return <ItemMenu data={menu} />;
    });
  };
  return (
    <div className="flex items-center justify-start flex-[2] px-[20px] h-[45px]">
      {renderMenu()}
    </div>
  );
};

export default Menu;
