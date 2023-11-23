import React from "react";
import { ListRoomArea } from "../../component/ListRoomArea";
import { Slider } from "../../component/Slider";
import { Reason } from "../../component/Reason";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { layDuLieuPhong } from "../../../../redux/action/phongAction";
import AreaBook from "page/user/component/AreaBook";
import useGetDataBook from "page/admin/page/RoomManagement/hook/useGetDataBook";

export const HomeUser = () => {
  // Danh sách banner
  const listBanner = [
    {
      title: "é é",
      image:
        "https://bizweb.dktcdn.net/100/364/248/themes/736344/assets/slider_1.jpg?1685433925349",
    },
    {
      title: "é é 2",
      image:
        "https://bizweb.dktcdn.net/100/364/248/themes/736344/assets/slider_3.jpg?1685433925349",
    },
  ];

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(layDuLieuPhong());
  }, []);

  const { sachData, isDataLoading, fetchData, isFetching } = useGetDataBook(
    "0",
    "0"
  );

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
            data: sachData?.filter((sach) => sach.tinhTrang === "0"),
          }}
        />
        <AreaBook
          data={{
            title: "Hot",
            data: sachData?.filter((sach) => sach.tinhTrang === "1"),
          }}
        />
        <AreaBook
          data={{
            title: "Old",
            data: sachData?.filter((sach) => sach.tinhTrang === "2"),
          }}
        />
      </div>
      {/* <Reason /> */}
    </div>
  );
};
