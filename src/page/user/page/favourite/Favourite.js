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

  return (<div className="rounded-[10px] shadow-md cursor-pointer" onClick={handleChooseShoe}>
    <img className="w-full h-full" src={data?.hinhAnh}/>
    {/* <div>
      <h3>{data?.tenSanPham}</h3>
    </div> */}
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

  console.log(productData);

  return (
    <div className="pb-[20px] min-h-[calc(100vh_-_300px)] flex justify-center items-center">
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-[10px] md:gap-[20px] px-[10px] md:px-[20px]">
        {renderProductFavourite()}
      </div>
    </div>
  );
};

export default Favourite;
