import React from "react";
import ItemCategory from "./ItemCategory";

const ListCategory = ({isMobile = false}) => {
  const listCategory = [
    {
      key: "all",
      title: "All Books",
      path: "/allBooks",
      child: [],
    },
    {
      key: "art",
      title: "Art & Design",
      path: "/book?category=art",
      child: [],
    },
    {
      key: "comic",
      title: "Comic & Graphic Novel",
      path: "/book?category=comic",
      child: [],
    },
    {
      key: "language",
      title: "Language & Textbook",
      path: "/book?category=language",
      child: [],
    },
    {
      key: "love",
      title: "Love & Psychological",
      path: "/book?category=love",
      child: [],
    },
  ];


  const renderListCategory = () => {
    return listCategory?.map((cat) => {
      return <ItemCategory data={cat} isMobile={isMobile}/>;
    });
  };

  return <div>{renderListCategory()}</div>;
};

export default ListCategory;
