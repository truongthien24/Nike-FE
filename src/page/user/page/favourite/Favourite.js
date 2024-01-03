import { Empty } from "antd";
import { Icon } from "assets/icon";
import _ from "lodash";
import useFindDataProduct from "page/admin/page/ProductManagement/hook/useFindProduct";
import useUpdateAccount from "page/admin/page/accountManagement/hook/useUpdateAccount";
import { LayoutContext } from "page/user/layout/Layout1";
import React, { useContext } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ShoeItems = ({ data }) => {
  const navigate = useNavigate();

  const { userInfo } = useSelector((state) => state.home);

  const { mutate, isLoading } = useUpdateAccount();

  const { fetchDataAccount } = useContext(LayoutContext);

  const handleChooseShoe = () => {
    navigate(`/infoShoe/${data?.id}`);
  };

  const removeFromFavourite = async () => {
    const newList = userInfo?.danhSachYeuThich;
    const index = newList?.findIndex((item) => item === data?.id);
    if (index > -1) {
      newList.splice(index, 1);
    }
    await mutate({
      Data: {
        id: userInfo?.id,
        danhSachYeuThich: newList,
      },
      onSuccess: async (res) => {
        await fetchDataAccount();
        toast.success("Remove from favourite successfull");
      },
      onError: (err) => {
        toast.error(err?.message);
      },
    });
  };

  return (
    <div className="rounded-[10px] shadow-md relative cursor-pointer">
      <div
        className="absolute top-[5px] right-[5px] text-[20px] z-[99] p-[5px]"
        onClick={removeFromFavourite}
      >
        &times;
      </div>
      <div
        className="grid grid-cols-2 lg:grid-cols-5"
        onClick={handleChooseShoe}
      >
        <img className="w-full h-full lg:col-span-2" src={data?.hinhAnh} />
        <div className="lg:col-span-3 p-[10px] grid grid-cols-1 gap-[10px] h-fit">
          <h3 className="lg:text-[18px] font-[500] mb-[10px]">
            {data?.tenSanPham}
          </h3>
          <div>
            <h5 className="bg-[#000] text-[#fff] w-fit px-[20px] py-[10px] rounded-[5px]">
              {data?.giaSanPham?.toLocaleString()} VND
            </h5>
          </div>
          <div>
            <Icon name="heart" />
            <h5 className="w-fit">{data?.moTa}</h5>
          </div>
        </div>
      </div>
    </div>
  );
};

const Favourite = () => {
  const { userInfo } = useSelector((state) => state.home);

  const { productData, isDataLoading, fetchData, isFetching } =
    useFindDataProduct({
      listId: userInfo?.danhSachYeuThich ? userInfo?.danhSachYeuThich : [],
    });

  const renderProductFavourite = () => {
    if (!_.isEmpty(productData)) {
      return productData?.map((product, index) => {
        return <ShoeItems data={product} key={index} />;
      });
    } else {
      return (
        <Empty
          description="Chưa có sản phẩm nào"
          className="col-span-2 lg:col-span-3"
        />
      );
    }
  };

  return (
    <div className="pb-[20px] min-h-[calc(100vh_-_300px)] flex justify-center">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-[10px] md:gap-[20px] px-[10px] md:px-[20px] w-[95%] xl:w-[90%] 2xl:w-[70%] h-fit">
        {renderProductFavourite()}
      </div>
    </div>
  );
};

export default Favourite;
