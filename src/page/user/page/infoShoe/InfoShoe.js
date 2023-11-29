import useLoadingEffect from "fuse/hook/useLoadingEffect";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { COLOR } from "page/user/shareComponent/constant";
import { FormProvider, useForm, useFormContext } from "react-hook-form";
import { toast } from "react-hot-toast";
import { Tabs } from "antd";
import { Empty } from "antd";
import _ from "lodash";
import useFindDataProduct from "page/admin/page/ProductManagement/hook/useFindProduct";


const SizeProduct = ({ data, name }) => {
  const { register, watch } = useFormContext();
  console.log('watch("kichCoSanPham")', watch("kichCoSanPham"));
  return (
    <>
      <label
        htmlFor={`${data?.maKichCo}`}
        className="rounded-[5px] p-[10px] flex items-center justify-center cursor-pointer"
        style={{
          boxShadow:
            "rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px",
          border: `${watch("kichCoSanPham") === data?.maKichCo
              ? "1px solid #000"
              : "1px solid transparent"
            }`,
        }}
      >
        EU
        <span className="ml-[7px]">{data?.soKichCo}</span>
      </label>
      <input
        type="radio"
        className="hidden"
        id={data?.maKichCo}
        value={data?.maKichCo}
        {...register(name)}
      />
    </>
  );
};

const fakeDataSize = [
  {
    maKichCo: "38",
    maSanPham: "NIKE00",
    soKichCo: 38,
    trangThai: true,
  },
  {
    maKichCo: "39",
    maSanPham: "NIKE00",
    soKichCo: 39,
    trangThai: true,
  },
  {
    maKichCo: "40",
    maSanPham: "NIKE00",
    soKichCo: 40,
    trangThai: true,
  },
  {
    maKichCo: "41",
    maSanPham: "NIKE00",
    soKichCo: 41,
    trangThai: true,
  },
  {
    maKichCo: "42",
    maSanPham: "NIKE00",
    soKichCo: 42,
    trangThai: true,
  },
  {
    maKichCo: "43",
    maSanPham: "NIKE00",
    soKichCo: 43,
    trangThai: true,
  },
];

const InfoShoe = () => {
  const { id } = useParams();

  const { productData, isDataLoading, fetchData, isFetching } =
    useFindDataProduct({
      id,
    });

  const navigate = useNavigate();

  const method = useForm({
    mode: "onSubmit",
    defaultValues: {
      // soLuong: 1,
    },
    // resolver: yupResolver(
    //   // yup.object().shape({
    //   //   soLuong: yup
    //   //     .number()
    //   //     .required("Please input")
    //   //     .min(1, "Số lượng phải lớn hơn 0")
    //   //     .max(
    //   //       10,
    //   //       "Không được thuê quá 10 cuốn sách. Liên hệ:xxx để được tư vấn "
    //   //     ),
    //   // })
    // ),
  });

  const { handleSubmit, setValue, getValues } = method;

  const addToCart = (data) => {
    // if (data?.soLuong > productData?.soLuong) {
    //   toast.error(
    //     `Số lượng không đủ. Chỉ còn ${productData?.soLuong} quyển :((`
    //   );
    // } else {
    //   // toast.error("Chức năng đang phát triển");
    //   navigate("/cart/123213123");
    // }
    console.log("data", data);
  };

  const handleChangeQuantity = (type) => {
    let soLuong = getValues("soLuong");
    switch (type) {
      case "plus":
        return setValue("soLuong", ++soLuong);
      case "minas":
        return setValue("soLuong", --soLuong);
      default:
        return;
    }
  };

  const items = [
    {
      key: "1",
      label: "Mô tả",
      children: !_.isEmpty(productData?.noiDung) ? (
        <div>{productData?.noiDung}</div>
      ) : (
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
      ),
    },
    {
      key: "2",
      label: "Đánh giá",
      children: (
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          description="Chức năng đang được phát triển"
        />
      ),
    },
  ];

  const renderSize = () => {
    return fakeDataSize?.map((size, index) => {
      return <SizeProduct data={size} key={index} name="kichCoSanPham" />;
    });
  };

  const onChange = (key) => {
    // toast("Chức năng đang phát triển");
  };

  const addToFavourite = () => {
    toast("Chức năng đang phát triển");
  };

  useLoadingEffect(isDataLoading);

  return (
    <div className="pb-[20px] min-h-[calc(100vh_-_300px)] flex justify-center">
      <div className="flex flex-col bg-[#f1f1f1] w-[95%] xl:w-[90%] 2xl:w-[70%] px-[25px] py-[20px]">
        <FormProvider {...method}>
          <form
            className="grid md:grid-cols-2 gap-[50px]"
            onSubmit={handleSubmit(addToCart)}
          >
            <div className="w-full h-300px overflow-hidden">
              <img
                src={productData?.hinhAnh}
                className="h-full rounded-[10px] w-[100%] hover:scale-110 duration-500"
              />
            </div>
            <div className="flex flex-col md:justify-between">
              <div>
                <h2 className="lg:text-[25px]">{productData?.tenSanPham}</h2>
                <div className="flex items-center">
                  <div className="flex items-center">
                    <p className="text-[gray] text-[11px] md:text-[13px] 2xl:text-[14px">
                      Tình trạng:{" "}
                      <span className="text-[#000]">
                        {productData?.soLuong > 0 ? "Còn hàng" : "Hết hàng"}
                      </span>
                    </p>
                  </div>
                </div>
                <div
                  className="text-[white] py-[5px] px-[12px] max-w-fit my-[20px] lg:my-[30px] ml-[5px]"
                  style={{
                    backgroundColor: `${COLOR.secondaryColor}`,
                    transform: "skew(10deg)",
                  }}
                >
                  <span
                    className="inline-block text-[18px] md:text-[22px] text-bold"
                    style={{ transform: "skew(-10deg)" }}
                  >
                    {productData?.giaSanPham?.toLocaleString()}
                  </span>
                </div>
                <div className="mb-[20px] lg:mb-[30px]">
                  <h5 className="mb-[10px] font-[500] md:text-[17px]">
                    Select Size
                  </h5>
                  <div className="grid grid-cols-5 gap-[10px]">
                    {renderSize()}
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-[20px]">
                <button
                  className="w-full p-[10px] rounded-[25px] flex items-center justify-center"
                  style={{
                    border: `1px solid #000`,
                    color: `#000`,
                  }}
                  type="button"
                  onClick={addToFavourite}
                >
                  Thêm vào yêu thích
                </button>
                <button
                  disabled={productData?.soLuong < 1}
                  className="text-[#fff] w-full p-[10px] rounded-[25px] flex items-center justify-center"
                  style={{
                    backgroundColor: `${productData?.soLuong > 0 ? "#000" : "gray"
                      }`,
                  }}
                >
                  Thêm vào giỏ hàng
                </button>
              </div>
              {/* <div className="flex justify-center">
              <button
                disabled={productData?.soLuong < 1}
                className="w-full p-[10px] rounded-[25px] lg:w-[50%] flex items-center justify-center mt-[10px]"
                style={{
                  border: `1px solid ${COLOR.primaryColor}`,
                  color: `${COLOR.primaryColor}`,
                }}
              >
                Thêm vào danh sách yêu thích
              </button>
            </div> */}
            </div>
          </form>
        </FormProvider>
        <Tabs
          defaultActiveKey="1"
          items={items}
          onChange={onChange}
          className="mt-[20px]"
        />
      </div>
    </div>
  );
};

export default InfoShoe;
