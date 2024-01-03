import React from "react";
import { Slider } from "../../component/Slider";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import AreaBook from "page/user/component/AreaBook";
import useGetDataBook from "page/admin/page/RoomManagement/hook/useGetDataBook";
import useGetDataProduct from "page/admin/page/ProductManagement/hook/useGetDataProduct";
import useLoadingEffect from "fuse/hook/useLoadingEffect";
import useGetDataBanner from "page/admin/page/bannerManagement/hook/useGetDataBanner";
import { Reason } from "page/user/component/Reason";
import { useNavigate } from "react-router-dom";

export const HomeUser = () => {
  // Danh sách banner
  // const listBanner = [
  //   {
  //     title: "é é",
  //     image:
  //       "https://static.nike.com/a/images/f_auto/dpr_1.0,cs_srgb/w_1305,c_limit/475d527e-432e-4708-a032-54a56c2de7b6/nike-just-do-it.jpg",
  //   },
  //   {
  //     title: "é é 2",
  //     image:
  //       "https://static.nike.com/a/images/f_auto/dpr_1.0,cs_srgb/w_1305,c_limit/add7aee5-2be6-444c-8c46-11c3b3c7de93/nike-just-do-it.jpg",
  //   },
  // ];

  const navigate = useNavigate();

  const {
    bannerData,
    isDataLoading: loadingBanner,
    fetchData: fetchDataBanner,
    isFetching: isFetchingBanner,
  } = useGetDataBanner("0", "0");

  const {
    productData: productData,
    isDataLoading,
    fetchData,
    isFetching,
  } = useGetDataProduct("0", "0");

  useLoadingEffect(
    isDataLoading || isFetching || loadingBanner || isFetchingBanner
  );

  return (
    <div className="flex flex-col items-center">
      <div className="w-full">
        {/* Hiện: 2, ẩn là 1 */}
        <Slider data={bannerData?.filter((banner) => banner.tinhTrang === 2)} />
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
      <div className="bg-cover bg-fixed bg-no-repeat bg-center h-[200px] lg:h-[400px] xl:h-[500px] w-full bg-[url('http://res.cloudinary.com/dsbvqrhhk/image/upload/v1703573642/jtklvuux7yx2wwbj2jhq.jpg')]"></div>
      <div className="py-[20px] lg:py-[40px] xl:py-[50px] flex w-[90%] lg:w-[90%
      ] 2xl:w-[80%]">
        <div className="grid grid-cols-1 gap-[20px] h-fit px-[10px] tracking-[0.5px]">
          <h5 className="text-[16px] lg:text-[22px] pb-[8px] font-[500] whitespace-nowrap">
            Comming soon
          </h5>
          <p>
            The BN-Store App has everything you need to get moving. That means the
            latest gear, engaging stories and a worldwide community. It’s all
            here, personalised for you
          </p>
          <p>
            Get started on your journey with 10% off your favourite gear today
            when you buy 2 items or more on the BN-Store App.
          </p>
        </div>
        <img
          src="https://static.nike.com/a/images/f_auto/dpr_1.0,cs_srgb/w_1824,c_limit/b38f0b02-991b-4ed6-8398-8d619e5d9b9a/nike-app.png"
          className="h-fit lg:w-[calc(100%_-_300px)] 2xl:w-[calc(100%_-_400px)]"
        />
      </div>
      <Reason />
      <div className="bg-contain bg-no-repeat bg-center h-[300px] w-full cursor-pointer" style={{backgroundImage: "url('./images/bannerBuyNow.jpg')"}} onClick={()=> {
        navigate('/allShoe')
      }}></div>
    </div>
  );
};
