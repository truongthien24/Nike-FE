import useFindDataBook from "page/admin/page/RoomManagement/hook/useFindBook";
import React, { useEffect } from "react";
import { Empty } from "antd";
import OutsideClickDetector from "component/OutSide/OutSideClickDetector";
import { useNavigate } from "react-router-dom";
import useFindDataProduct from "page/admin/page/ProductManagement/hook/useFindProduct";
const ResultSearch = ({ data, resultRef, searchRef }) => {
  const { productData, isDataLoading, fetchData, isFetching } =
    useFindDataProduct({
      tenSanPham: data,
    });

  const navigate = useNavigate();

  const renderResult = () => {
    if (productData?.length > 0) {
      return productData?.map((shoe, index) => {
        return (
          <div
            className="flex rounded-[5px] duration-500 cursor-pointer hover:bg-[#eaeaea]"
            onClick={() => {
              navigate(`/infoShoe/${shoe?.id}`);
              resultRef.current.style.display = "none";
            }}
          >
            <img
              src={shoe?.hinhAnh}
              className="w-[70px] md:w-[100px] h-full mr-[10px]"
            />
            <div>
              <h5 className="text-[13px] lg:text-[15px]">{shoe?.tenSanPham}</h5>
              <span className="text-[12px] text-[gray]">
                {shoe?.tenTheLoai}
              </span>
            </div>
          </div>
        );
      });
    }
    return <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />;
  };

  return (
    <OutsideClickDetector
      OutSideRef={resultRef}
      InSideRef={searchRef}
      classNames="absolute top-[120%] left-0 w-full bg-[#fff] rounded-[5px] shadow-md hidden max-h-[350px] overflow-y-scroll z-[98]"
    >
      {/* <div className="absolute top-[120%] left-0 w-full bg-[#fff] rounded-[5px] shadow-md hidden max-h-[350px] overflow-y-scroll"> */}
      <div className="p-[10px] grid grid-cols-1 gap-[10px]">
        {renderResult()}
      </div>
      {/* </div> */}
    </OutsideClickDetector>
  );
};

export default ResultSearch;
