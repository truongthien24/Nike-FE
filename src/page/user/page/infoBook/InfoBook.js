import useLoadingEffect from "fuse/hook/useLoadingEffect";
import useGetDetailBook from "page/admin/page/RoomManagement/hook/useGetDetailBook";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import ReviewInfoItem from "page/user/component/AreaBook/modal/components/ReviewInfoItem";
import { COLOR } from "page/user/shareComponent/constant";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from 'yup';
import { toast } from "react-hot-toast";
import { Tabs } from "antd";
import { Empty } from 'antd';
import _ from "lodash";

const InfoBook = () => {
  const { id } = useParams();

  const {
    sachDataDetail,
    isDataDetailLoading,
    fetchData: fetchDetail,
    isFetching: isFetchingDetail,
  } = useGetDetailBook("0", "0", id);

  const navigate = useNavigate();

  const {
    handleSubmit,
    register,
    setValue,
    getValues,
    formState: { errors },
  } = useForm({
    mode: "onSubmit",
    defaultValues: {
      soLuong: 1,
    },
    resolver: yupResolver(
      yup.object().shape({
        soLuong: yup
          .number()
          .required("Please input")
          .min(1, "Số lượng phải lớn hơn 0")
          .max(
            10,
            "Không được thuê quá 10 cuốn sách. Liên hệ:xxx để được tư vấn "
          ),
      })
    ),
  });

  const addToCart = (data) => {
    if (data?.soLuong > sachDataDetail.soLuong) {
      toast.error(
        `Số lượng không đủ. Chỉ còn ${sachDataDetail.soLuong} quyển :((`
      );
    } else {
      // toast.error("Chức năng đang phát triển");
      navigate("/cart/123213123");
    }
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
      key: '1',
      label: 'Mô tả',
      children: !_.isEmpty(sachDataDetail?.noiDung) ? <div>{sachDataDetail?.noiDung}</div> : <Empty image={Empty.PRESENTED_IMAGE_SIMPLE}/>,
    },
    {
      key: '2',
      label: 'Đánh giá',
      children: <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="Chức năng đang được phát triển"/>,
    },
  ];

  const onChange = (key) => {
    console.log(key);
  };
  
  

  useLoadingEffect(isDataDetailLoading);

  return (
    <div className="md:pt-[150px] pb-[20px] min-h-[calc(100vh_-_300px)] flex justify-center">
      <div className="flex flex-col bg-[#eaeaea] w-[95%] xl:w-[90%] 2xl:w-[70%] px-[25px] py-[20px]">
        <form className="grid md:grid-cols-2 lg:grid-cols-5 2xl:grid-cols-3 gap-[30px]" onSubmit={handleSubmit(addToCart)}>
          <img src={sachDataDetail?.hinhAnh?.url} className="lg:col-span-2 h-full" />
          <div className="lg:col-span-3 2xl:col-span-2 flex flex-col">
            <h2 className="">{sachDataDetail?.tenSach}</h2>
            <div className="flex items-center">
              <div className="flex items-center">
                <p className="text-[gray] text-[11px] md:text-[13px] 2xl:text-[14px]">
                  Tác giả: <span className="text-[#000]">{sachDataDetail?.tenTacGia}</span>
                </p>
              </div>
              <span className="mx-[10px]">|</span>
              <div className="flex items-center">
                <p className="text-[gray] text-[11px] md:text-[13px] 2xl:text-[14px">
                  Tình trạng:{" "}
                  <span className="text-[#000]">
                    {sachDataDetail?.soLuong > 0 ? "Còn hàng" : "Hết hàng"}
                  </span>
                </p>
              </div>
            </div>
            <div
              className="text-[white] py-[5px] px-[12px] max-w-fit my-[20px] ml-[5px]"
              style={{
                backgroundColor: `${COLOR.secondaryColor}`,
                transform: "skew(10deg)",
              }}
            >
              <span
                className="inline-block text-[18px] md:text-[22px] text-bold"
                style={{ transform: "skew(-10deg)" }}
              >
                {sachDataDetail?.gia?.toLocaleString()}đ
              </span>
            </div>
            <div className="flex flex-col">
              <ReviewInfoItem title="Nhà cung cấp" data={sachDataDetail?.tenNhaCungCap} />
              <ReviewInfoItem title="Thể loại" data={sachDataDetail?.tenTheLoai} />
              <ReviewInfoItem title="Ngôn ngữ" data={sachDataDetail?.tenNgonNgu} />
              <ReviewInfoItem title="Nhà xuất bản" data={sachDataDetail?.tenNhaXuatBan} />
              <ReviewInfoItem title="Năm xuất bản" data={sachDataDetail?.namXuatBan} />
              <ReviewInfoItem title="Số trang" data={sachDataDetail?.soTrang} />
              <ReviewInfoItem title="Kích thước" data={sachDataDetail?.kichThuoc} />
            </div>
            <div>
              <div className="flex items-center my-[10px]">
                <h5
                  style={{
                    color: `${COLOR.primaryColor}`,
                    marginRight: "10px",
                  }}
                >
                  Số lượng
                </h5>
                <div className="flex items-center">
                  <button
                    type="button"
                    className="bg-[#dcdbdb] w-[35px] h-[35px] flex items-center justify-center"
                    onClick={() => handleChangeQuantity("minas")}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-4 h-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M18 12H6"
                      />
                    </svg>
                  </button>
                  <input
                    className="bg-[white] w-[35px] h-[35px] text-center"
                    {...register("soLuong")}
                    onError={errors["soLuong"]}
                  />
                  <button
                    type="button"
                    className="bg-[#dcdbdb] w-[35px] h-[35px] flex items-center justify-center"
                    onClick={() => handleChangeQuantity("plus")}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-4 h-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 6v12m6-6H6"
                      />
                    </svg>
                  </button>
                </div>
                {errors["soLuong"] && (
                  <span className="text-[red] ml-[10px] text-[10px]">
                    {errors["soLuong"].message}
                  </span>
                )}
              </div>
              <button
                disabled={sachDataDetail?.soLuong < 1}
                className="text-[#fff] w-full p-[10px] rounded-[5px] flex items-center justify-center"
                style={{
                  backgroundColor: `${sachDataDetail?.soLuong > 0 ? COLOR.primaryColor : "gray"
                    }`,
                }}
              >
                Thêm vào giỏ hàng
              </button>
            </div>
          </div>
        </form>
        <Tabs defaultActiveKey="1" items={items} onChange={onChange} className="mt-[20px]"/>
      </div>
    </div>
  );
};

export default InfoBook;
