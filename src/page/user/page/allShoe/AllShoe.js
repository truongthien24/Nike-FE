import React, { useEffect, useMemo } from "react";
import { FormProvider, useForm, useFormContext } from "react-hook-form";
import { priceRadio } from "./helper";
import { Checkbox, Empty } from "antd";
import useFindDataProduct from "page/admin/page/RoomManagement/hook/useFindProduct";
import useFilters from "page/user/shareComponent/filter/useFilter";
import Shoe from "page/user/component/AreaBook/compontents/Shoe";
import useLoadingEffect from "fuse/hook/useLoadingEffect";
import { useDispatch, useSelector } from "react-redux";
import { getCommonCode } from "redux/action/getCommonCode";
import useGetDataThuongHieu from "page/admin/page/System/thuongHieuManagement/hook/useGetDataThuongHieu";

export const FilterItem = ({ data, type }) => {
  const { register } = useFormContext();
  return (
    <>
      {data?.map((item, index) => {
        switch (type) {
          case "radio":
            return (
              <div className="flex items-center" key={index}>
                <input
                  type="radio"
                  value={item?.value}
                  name={item?.name}
                  className="input mr-[10px]"
                  {...register(item?.name)}
                />
                <span className="text-[12px] lg:text-[14px] 2xl:text-[15px]">
                  {item?.label}
                </span>
              </div>
            );
          case "checkbox":
            return (
              <div className="flex items-center" key={index}>
                <Checkbox
                  value={item?.value}
                  name={item?.name}
                  className="mr-[10px]"
                  {...register(item?.name)}
                />
                <span className="text-[12px] lg:text-[14px] 2xl:text-[15px]">
                  {item?.label}
                </span>
              </div>
            );
        }
      })}
    </>
  );
};

const AllShoe = () => {
  const defaultValues = {
    tenSanPham: "",
    thuongHieu: null
  };

  const { count, setCount, filters, onFilter } = useFilters(defaultValues);

  const dispatch = useDispatch();

  const { productData, isDataLoading, fetchData, isFetching } =
    useFindDataProduct(filters);

  const { thuongHieuData, isDataLoading: isLoadingThuongHieu, fetchData: fetchDataThuongHieu, isFetching: isFetchingThuongHieu } =
    useGetDataThuongHieu("0", "0");

  const brandCheckbox = useMemo(() => {
    if (thuongHieuData?.length > 0) {
      return thuongHieuData?.map((th) => {
        return {
          label: th.tenThuongHieu,
          value: th.id,
          name: "thuongHieu",
        }
      })
    }
    return []
  }, [thuongHieuData])

  const method = useForm({
    mode: "onSubmit",
  });

  const { getValues, setValue, reset, handleSubmit, watch, register } = method;

  const renderSanPham = () => {
    if (productData?.length > 0) {
      return <div className="grid grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-[10px] xl:gap-[20px]">
        {productData?.map((product, index) => {
          return <Shoe data={product} key={index} />;
        })}
      </div>;
    }
    return <Empty description="Không có sản phẩm phù hợp" />;
  };

  const handleSearch = (data) => {
    console.log('data', data)
    onFilter({
      giaSanPham: parseInt(data?.giaSanPham),
      thuongHieu: parseInt(data?.thuongHieu),
    });
  };

  useLoadingEffect(isDataLoading || isFetching);

  return (
    <div className="pb-[20px] min-h-[calc(100vh_-_300px)] flex justify-center">
      <FormProvider {...method}>
        <form
          className="grid grid-cols-3 2xl:grid-cols-4 gap-[10px] lg:gap-[20px] min-h-[calc(100%_-_150px)] px-[10px] py-[10px] md:px-[25px] md:py-[20px] w-full xl:w-[90%] 2xl:w-[80%]"
          onSubmit={handleSubmit(handleSearch)}
        >
          <div className="col-span-1 bg-[#eaeaea] rounded-[10px] px-[20px] py-[10px] grid grid-cols-1 gap-[20px] h-fit">
            <div>
              <h5 className="mb-[10px] text-[14px] lg:text-[17px] bg-[#000] text-[white] rounded-tl-[20px] rounded-br-[20px] px-[10px] py-[5px] w-fit">
                Giá
              </h5>
              <div className="grid grid-cols-1 gap-[10px] lg:gap-[15px]">
                <FilterItem data={priceRadio} type="radio" />
              </div>
            </div>
            <div>
              <h5 className="mb-[10px] text-[14px] lg:text-[17px] bg-[#000] text-[white] rounded-tl-[20px] rounded-br-[20px] px-[10px] py-[5px] w-fit">
                Thương hiệu
              </h5>
              <div className="grid grid-cols-1 gap-[10px] lg:gap-[15px]">
                <FilterItem data={brandCheckbox} type="checkbox" />
              </div>
            </div>
            <button
              type="submit"
              className="text-[14px] lg:text-[17px] bg-[#000] text-[white] rounded-[10px] lg:rounded-[20px] py-[5px] lg:py-[10px]"
            >
              Tìm kiếm
            </button>
          </div>
          <div className="col-span-2 2xl:col-span-3 rounded-[10px]">
            <div className="flex items-center bg-[#000] text-[#fff] h-fit py-[10px] rounded-tl-[20px] rounded-br-[20px] w-fit px-[20px]">
              <h4 className="mr-[10px]">Kết quả: </h4>
              <span>{productData?.length} sản phẩm</span>
            </div>
            <div className="pt-[20px]">{renderSanPham()}</div>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default AllShoe;
