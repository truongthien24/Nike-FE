import React from "react";
import { Slider } from "../../component/Slider";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import AreaBook from "page/user/component/AreaBook";
import useGetDataBook from "page/admin/page/RoomManagement/hook/useGetDataBook";

export const HomeUser = () => {
  // Danh sách banner
  const listBanner = [
    {
      title: "é é",
      image:
        "https://static.nike.com/a/images/f_auto/dpr_1.0,cs_srgb/w_1305,c_limit/475d527e-432e-4708-a032-54a56c2de7b6/nike-just-do-it.jpg",
    },
    {
      title: "é é 2",
      image:
        "https://static.nike.com/a/images/f_auto/dpr_1.0,cs_srgb/w_1305,c_limit/add7aee5-2be6-444c-8c46-11c3b3c7de93/nike-just-do-it.jpg",
    },
  ];

  // const { sachData: giayData, isDataLoading, fetchData, isFetching } = useGetDataBook(
  //   "0",
  //   "0"
  // );

  const giayData = [
    {
      image: {
        url: "https://static.nike.com/a/images/q_auto:eco/t_product_v1/f_auto/dpr_1.0/h_428,c_limit/deaada3d-b374-4c28-834f-b78314544c35/invincible-3-road-running-shoes-VZDSsw.png",
      },
      status: "0",
      nameShoe: "Nike Invincible 3",
      price: 5290000,
      quantity: 2
    },
    {
      image: {
        url: "https://static.nike.com/a/images/q_auto:eco/t_product_v1/f_auto/dpr_1.0/h_428,c_limit/df88d282-47b4-4d5f-899d-2f4339977c7a/structure-25-road-running-shoes-Vnp1d0.png",
      },
      status: "0",
      nameShoe: "Nike Structure 25",
      price: 3200000,
      quantity: 0
    },
    {
      image: {
        url: "https://static.nike.com/a/images/q_auto:eco/t_product_v1/f_auto/dpr_1.0/h_428,c_limit/df88d282-47b4-4d5f-899d-2f4339977c7a/structure-25-road-running-shoes-Vnp1d0.png",
      },
      status: "1",
      nameShoe: "Nike Structure 25",
      price: 3200000,
      quantity: 0
    }
  ]

  return (
    <div className="flex flex-col items-center">
      <div className="w-full">
        <Slider data={listBanner} />
      </div>
      {/* <SearchArea/> */}
      {/* <ListRoomArea /> */}
      <div className="w-[90%] lg:w-[80%] py-[20px]">
        <AreaBook
          data={{
            title: "New arrival",
            data: giayData?.filter((giay) => giay.status === "0"),
          }}
        />
        <AreaBook
          data={{
            title: "Hot",
            data: giayData?.filter((giay) => giay.status === "1"),
          }}
        />
        <AreaBook
          data={{
            title: "Old",
            data: giayData?.filter((giay) => giay.status === "2"),
          }}
        />
      </div>
      {/* <Reason /> */}
    </div>
  );
};
