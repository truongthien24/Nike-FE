import React from "react";
import { Slider } from "../../component/Slider";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import AreaBook from "page/user/component/AreaBook";
import useGetDataBook from "page/admin/page/RoomManagement/hook/useGetDataBook";
import useGetDataProduct from "page/admin/page/ProductManagement/hook/useGetDataProduct";
import useLoadingEffect from "fuse/hook/useLoadingEffect";

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

  const {
    productData: productData,
    isDataLoading,
    fetchData,
    isFetching,
  } = useGetDataProduct("0", "0");

  useLoadingEffect(isDataLoading || isFetching);

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
            data: productData?.filter((giay) => giay.trangThai === 1),
          }}
        />
        <AreaBook
          data={{
            title: "Hot",
            data: productData?.filter((giay) => giay.trangThai === 2),
          }}
        />
        {/* <AreaBook
          data={{
            title: "Old",
            data: giayData?.filter((giay) => giay.status === "2"),
          }}
        /> */}
      </div>
      {/* <Reason /> */}
    </div>
  );
};
