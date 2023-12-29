import { Empty } from "antd";
import _ from "lodash";
import useFindDataProduct from "page/admin/page/ProductManagement/hook/useFindProduct";
import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ShoeItems = ({data}) => {

  const navigate = useNavigate();

  const handleChooseShoe = () => {
    navigate(`/infoShoe/${data?.id}`)
  }

  return (<div className="rounded-[10px] shadow-md cursor-pointer grid grid-cols-2 lg:grid-cols-5" onClick={handleChooseShoe}>
    <img className="w-full h-full lg:col-span-2" src={data?.hinhAnh}/>
    <div className="lg:col-span-3 p-[10px]">
      <h3 className="lg:text-[18px] font-[500] mb-[10px]">{data?.tenSanPham}</h3>
      <div>
        <h5 className="bg-[#000] text-[#fff] w-fit px-[20px] py-[10px] rounded-[5px]">{data?.giaSanPham?.toLocaleString()} VND</h5>
      </div>
    </div>
  </div>)
}

const Favourite = () => {
  const { userInfo } = useSelector((state) => state.home);

  const { productData, isDataLoading, fetchData, isFetching } =
    useFindDataProduct({
      listId: userInfo?.danhSachYeuThich
        ? userInfo?.danhSachYeuThich
        : [],
    });

    const renderProductFavourite = () => {
      if(!_.isEmpty(productData)) {
        return productData?.map((product, index)=> {
          return <ShoeItems data={product} key={index}/>
        })
      } else {
        return <Empty description="Chưa có sản phẩm nào" className="col-span-2 lg:col-span-3"/>
      }
    }

  return (
    <div className="pb-[20px] min-h-[calc(100vh_-_300px)] flex justify-center">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-[10px] md:gap-[20px] px-[10px] md:px-[20px] w-[95%] xl:w-[90%] 2xl:w-[70%] h-fit">
        {renderProductFavourite()}
      </div>
    </div>
  );
};

export default Favourite;
