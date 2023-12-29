import useLoadingEffect from "fuse/hook/useLoadingEffect";
import React, { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { COLOR } from "page/user/shareComponent/constant";
import { FormProvider, useForm, useFormContext } from "react-hook-form";
import { toast } from "react-hot-toast";
import { Tabs } from "antd";
import { Empty } from "antd";
import _ from "lodash";
import useFindDataProduct from "page/admin/page/ProductManagement/hook/useFindProduct";
import { useSelector } from "react-redux";
import { LayoutContext } from "page/user/layout/Layout1";
import useUpdateAccount from "page/admin/page/accountManagement/hook/useUpdateAccount";
import FormReaction from "./components/FormReaction";
import useCreateChiTietGioHang from "page/admin/page/GioHangManagement/hook/useCreateDetailCart";
import useCreateDanhGia from "page/admin/page/danhGiaManagement/hook/useCreateDanhGia";
import useGetDataDanhGiaByIdSanPham from "page/admin/page/danhGiaManagement/hook/useGetDataDanhGiaByIdSanPham";
import { Reaction } from "page/user/component/Reaction";

const SizeProduct = ({ data, name }) => {
  const { register, watch } = useFormContext();
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

  const { userInfo } = useSelector((state) => state.home);

  const { fetchDataAccount, fetchDataGioHang } = useContext(LayoutContext);

  const { mutate, isLoading } = useUpdateAccount();

  const { mutate: themGioHang, isLoading: isLoadingThemGioHang } = useCreateChiTietGioHang();

  const {
    danhGiaDataDetail,
    isDataDetailLoading: isLoadingDanhGia,
    fetchData: fetchDanhGia,
    isFetching: isFetchingDanhGia,
  } = useGetDataDanhGiaByIdSanPham("0", "0", { idSanPham: id });

  const { mutate: createDanhGia, isLoading: isLoadingCreateDanhGia } =
    useCreateDanhGia();

  const navigate = useNavigate();

  const method = useForm({
    mode: "onSubmit",
    defaultValues: {
      soLuong: 1,
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

  const addToCart = async (data) => {
    // if (data?.soLuong > productData?.soLuong) {
    //   toast.error(
    //     `Số lượng không đủ. Chỉ còn ${productData?.soLuong} quyển :((`
    //   );
    // } else {
    //   // toast.error("Chức năng đang phát triển");
    //   navigate("/cart/123213123");
    // }
    await themGioHang({
      Data: {
        idSanPham: parseInt(productData?.id),
        idCart: parseInt(userInfo?.cartId),
        soLuong: data?.soLuong,
        thanhTien: data?.soLuong * parseInt(productData?.giaSanPham),
      },
      onSuccess: async (res) => {
        await fetchDataGioHang();
        toast.success(res?.data?.message);
      },
      onError: (err) => {
        toast.error(err?.message);
      }
    })
  };

  const handleDanhGia = async (data, reset) => {
    await createDanhGia({
      Data: {
        idUser: userInfo?.id,
        idSanPham:  productData?.id,
        noiDung: data?.noiDung,
        ...(data?.idDanhGiaFather && {
          idDanhGiaFather: data?.idDanhGiaFather,
        }),
      },
      onSuccess: async (res) => {
        await fetchDanhGia();
        await reset();
        toast.success(res?.data?.message);
      },
      onError: (err) => {
        toast.error(err?.Error?.message);
      },
    });
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
        <div className="grid grid-cols-1 gap-[10px]">
          {
            !_.isEmpty(danhGiaDataDetail)
              ?
              <div className="grid grid-cols-1 gap-[10px] md:gap-[15px]">
                {danhGiaDataDetail?.map((danhGia, index) => {
                  return (
                    // <div className="flex">
                    //   <img
                    //     className="w-[40px] h-[40px] rounded-[50%]"
                    //     src="https://cdn1.vectorstock.com/i/1000x1000/60/20/orange-cat-cartoon-cute-vector-45736020.jpg"
                    //   />
                    //   <div className="ml-[10px]">
                    //     <div className="flex item-center">
                    //       <h5 className="font-[500] mr-[10px]">
                    //         {danhGia?.idTaiKhoan?.email}
                    //       </h5>
                    //       <span>
                    //         {new Date(danhGia?.ngayTao)?.toLocaleDateString(
                    //           "en-GB"
                    //         )}
                    //       </span>
                    //     </div>
                    //     <p>{danhGia?.noiDung}</p>
                    //   </div>
                    // </div>
                    <Reaction
                      data={danhGia}
                      key={index}
                      onSubmitReply={handleDanhGia}
                    />
                  );
                })}
              </div>
              :
              <Empty
                image={Empty.PRESENTED_IMAGE_SIMPLE}
                description="Chưa có đánh giá nào"
              />
          }
          <div>
            <FormReaction fetch={fetchDanhGia} onSubmit={handleDanhGia} />
          </div>
        </div>

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

  const addToFavourite = async () => {
    if (!_.isEmpty(userInfo)) {
      const newList = userInfo?.danhSachYeuThich;
      if (newList?.findIndex((item) => item === productData?.id) == -1) {
        newList.push(productData?.id);
      }
      await mutate({
        Data: {
          id: userInfo?.id,
          danhSachYeuThich: newList,
        },
        onSuccess: async (res) => {
          await fetchDataAccount();
          toast.success("Add to favourite successfull");
        },
        onError: (err) => {
          toast.error(err?.message);
        },
      });
    } else {
      toast.error("Bạn chưa đăng nhập");
    }
  };

  useLoadingEffect(isDataLoading);

  return (
    <div className="pb-[20px] min-h-[calc(100vh_-_300px)] flex justify-center items-center">
      {!_.isEmpty(productData) ? (
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
      ) : (
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          description="Không tìm thấy sản phẩm"
        />
      )}
    </div>
  );
};

export default InfoShoe;
