import { Icon } from "assets/icon";
import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { COLOR } from "../shareComponent/constant";
import { checkLogin } from "../shareComponent/Function/checkLogin";
import toast from "react-hot-toast";
import { jwtDecode } from "jwt-decode";
import useGetDetailGioHang from "page/admin/page/GioHangManagement/hook/userGetDetailGioHang";
import { useSelector } from "react-redux";

const Cart = () => {
  const navigate = useNavigate();

  const { userInfo, gioHangInfo } = useSelector((state) => state.home);

  const handleClick = () => {
    if (checkLogin()) {
      navigate("/cart/1231332132");
    } else {
      toast.error("Rất tiếc! Bạn chưa đăng nhập");
    }
  };

  return (
    <button className="relative" onClick={handleClick}>
      <Icon name="cart" color={COLOR.primaryColor} />
      {userInfo?.cartId && (
        <div className="text-[#fff] p-[2px] min-w-[20px] box-border text-[10px] rounded-[50%] flex items-center justify-center absolute top-0 left-[70%] bg-[#498374]">
          {gioHangInfo?.danhSach?.length}
        </div>
      )}
    </button>
  );
};

export default Cart;
