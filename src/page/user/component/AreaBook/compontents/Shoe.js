import { Icon } from "assets/icon";
import { COLOR } from "page/user/shareComponent/constant";
import React, { useContext, useState } from "react";
import { toast } from "react-hot-toast";
import ModalReviewProduct from "../modal/ModalReviewProduct";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import _ from "lodash";
import useUpdateAccount from "page/admin/page/accountManagement/hook/useUpdateAccount";
import { LayoutContext } from "page/user/layout/Layout1";
import useCreateChiTietGioHang from "page/admin/page/GioHangManagement/hook/useCreateDetailCart";

const Shoe = (props) => {
  const { data } = props;

  const navigate = useNavigate();

  const { userInfo } = useSelector((state) => state.home);

  const { fetchDataAccount, fetchDataGioHang } = useContext(LayoutContext);

  const { mutate, isLoading } = useUpdateAccount();

  const { mutate: themGioHang, isLoading: isLoadingThemGioHang } = useCreateChiTietGioHang();


  const [review, onReview] = useState({
    open: false,
    data: null,
  });

  const addFavourite = async () => {
    // Check login
    if (!_.isEmpty(userInfo)) {
      const newList = userInfo?.danhSachYeuThich;
      if (newList?.findIndex((item) => item === data?.id) == -1) {
        newList.push(data?.id);
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

  const addCart = async (data) => {
    await themGioHang({
      Data: {
        idSanPham: parseInt(data?.id),
        idCart: parseInt(userInfo?.cartId),
        soLuong: 1,
        thanhTien: 1 * parseInt(data?.giaSanPham),
      },
      onSuccess: async (res) => {
        await fetchDataGioHang();
        toast.success(res?.data?.message);
      },
      onError: (err) => {
        toast.error(err?.message);
      }
    })
  }

  const handleReview = (data) => {
    // onReview({
    //   open: true,
    //   data,
    // });
    navigate(`/infoShoe/${data?.id}`);
  };

  return (
    <>
      <div className="rounded-[5px] bg-[white] book cursor-pointer">
        <div className="relative w-full book__heading">
          <img
            src={data?.hinhAnh}
            className="w-full h-[220px] md:h-[260px] 2xl:h-[300px] rounded-[5px] book__heading-img"
          />
          <div className="book__heading-option">
            <div className="flex items-center justify-center h-full w-ful">
              <button
                className="bg-[#fff] book__heading-option-button rounded-[10px] w-[40px] h-[40px] flex items-center justify-center mx-[5px]"
                onClick={() => {
                  addCart(data);
                }}
              >
                <Icon name="shoppingCart" color="#000" />
              </button>
              <button
                className="bg-[#fff] book__heading-option-button rounded-[10px] w-[40px] h-[40px] flex items-center justify-center mx-[5px]"
                onClick={addFavourite}
              >
                <Icon name="heart" color="#000" />
              </button>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center mt-[5px]" onClick={() => {
          handleReview(data);
        }}>
          <h5>{data?.tenSanPham}</h5>
          <span style={{ color: `${COLOR.primaryColor}` }} className="my-[7px] font-[500]">
            {data?.khuyenMai ? (data?.giaSanPham - ((data?.giaSanPham * data?.khuyenMai?.phanTramKhuyenMai) / 100))?.toLocaleString() : data?.giaSanPham?.toLocaleString()} VND
          </span>
          <p className="leading-[20px] text-[12px] md:text-[13px] lg:text-[14px] h-[20px]">{data?.khuyenMai ? <>
            <span className="text-[#a5a4a4] line-through mr-[10px]">{data?.giaSanPham?.toLocaleString()}</span>
            <span>-{data?.khuyenMai?.phanTramKhuyenMai}%</span>
          </> : ""}</p>
          <span className="text-[13px] text-[#f7941d] mt-[10px]">
            {data?.soLuong > 0 ? "In Stock" : "Sold out"}
          </span>
        </div>
      </div>
      {review?.open && (
        <ModalReviewProduct
          open={review?.open}
          data={review?.data}
          title=""
          onReview={onReview}
        />
      )}
    </>
  );
};

export default Shoe;
