import React, { useEffect, useMemo, useState } from "react";
import { Avatar, Empty, Tooltip } from "antd";
import { formateDate } from "../../../method/formatDate";
import { Icon } from "../../../assets/icon";
import Swal from "sweetalert2";
import { useTranslation } from "react-i18next";
import { COLOR } from "../shareComponent/constant";
import { toast } from "react-hot-toast";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import _ from "lodash";

export const Reaction = (props) => {
  // Props
  const { data, onSubmitReply } = props;

  // State
  const [isReply, setIsReply] = useState(false);
  const [isSeenReply, setIsSeenReply] = useState(false);

  // Somethings
  const { t } = useTranslation();

  const method = useForm({
    mode: "onSubmit",
    defaultValues: {
      noiDung: "",
      idDanhGiaFather: data?.id,
    },
    resolver: yupResolver(
      yup.object().shape({
        noiDung: yup.string().required("Please input"),
      })
    ),
  });

  const isAdmin = useMemo(() => {
    return data?.admin;
  }, [data]);

  const {
    handleSubmit,
    register,
    formState: { errors },
    watch,
    reset,
  } = method;

  // Method
  const renderSoSao = () => {
    let arr = [];
    for (let i = 0; i < 5; i++) {
      arr.push({});
    }
    return arr.map((item, index) => {
      return <Icon name="star" fill="#ffd902" font="small" key={index} />;
    });
  };

  const renderReply = () => {
    if (!_.isEmpty(data?.danhSachTraLoi)) {
      return data?.danhSachTraLoi?.map((reply, index) => {
        const admin = reply?.admin;
        return (
          <div>
            <div className="flex items-start">
              <Avatar
                size={40}
                style={{
                  backgroundColor: `${admin ? "#f56a00" : "#fde3cf"}`,
                  color: `${admin ? "#fde3cf" : "#f56a00"}`
                }}
              >
                {admin ? 'Q' : reply?.taiKhoan?.tenDangNhap
                  ?.toString()
                  .toUpperCase()
                  .charAt(0)}
              </Avatar>
              <div className="ml-[8px] h-max">
                <h5 className="text-[11px] md:text-[13px] font-bold" style={{color: `${admin ? "#f56a00" : "#000"}`}}>
                  {admin ? "Quản trị viên" :reply?.taiKhoan?.tenDangNhap}
                </h5>
                <p className="text-[10px] md:text-[12px]">
                  {new Date(reply?.ngayTao)?.toLocaleDateString("en-GB")}
                </p>
              </div>
            </div>
            <p
              className="text-white rounded-[15px] py-[7px] px-[15px] mt-[8px] mx-[10px] text-[12px] md:text-[14px] w-fit"
              style={{ backgroundColor: `${COLOR.primaryColor}` }}
            >
              {reply?.noiDung}
            </p>
          </div>
        );
      });
    } else {
      return <Empty description="Chưa có bình luận nào" />;
    }
  };

  const handleLikeReaction = () => {
    toast("Chức năng đang phát triển");
  };

  const handleReplyReaction = () => {
    setIsReply(true, reset);
  };

  const handleSeenReply = () => {
    setIsSeenReply((prev) => !prev);
  };

  const onReplyReaction = (data) => {
    onSubmitReply(data, reset);
  };

  // Return
  return (
    <div className="bg-[#f4f7f8] p-[10px] rounded-[15px]">
      <div className="flex items-start justify-between">
        <div className="flex items-start">
          <Avatar
            size={40}
            style={{
              backgroundColor: `${isAdmin ? "red" : "#fde3cf"}`,
              color: "#f56a00",
            }}
          >
            {/* charAt lấy ký tự ở vị trí đầu tiên
              hình ảnh hiển thị */}
            {data?.taiKhoan?.tenDangNhap?.toString().toUpperCase().charAt(0)}
          </Avatar>
          <div className="ml-[8px] h-max">
            <h5 className="text-[11px] md:text-[13px] font-bold">
              {/* Tên hiển thị */}
              {data?.taiKhoan?.tenDangNhap}
            </h5>
            <p className="text-[10px] md:text-[12px]">
              {new Date(data?.ngayTao)?.toLocaleDateString("en-GB")}
            </p>
          </div>
        </div>
        <div className="flex">{renderSoSao()}</div>
      </div>
      <p
        className="text-white rounded-[15px] py-[7px] px-[15px] mt-[8px] mx-[10px] text-[12px] md:text-[14px] w-fit"
        style={{ backgroundColor: `${COLOR.primaryColor}` }}
      >
        {data?.noiDung}
      </p>
      <div className="mt-[10px]">
        {isSeenReply && (
          <div className="grid grid-cols-1 gap-[10px] pl-[40px]">
            {renderReply()}
          </div>
        )}
      </div>
      <div className="flex items-center mt-[15px]">
        {isReply ? (
          <div className="w-full border-[1px] border-dashed border-[#979797] rounded-[10px] shadow-md p-[10px] flex relative">
            <FormProvider {...method}>
              <form
                onSubmit={handleSubmit(onReplyReaction)}
                className="w-full h-full flex items-center"
              >
                <input
                  className="bg-transparent w-[calc(100%_-_40px)] h-[30px] p-[10px] outline-none"
                  {...register("noiDung")}
                  placeholder="Nhập ở đây"
                />
                <button className="h-[30px] w-[40px]">
                  <Icon name="paper" />
                </button>
              </form>
            </FormProvider>
            <button
              className="absolute right-[-10px] top-[-10px] bg-[white] border-[#979797] border-dashed  flex items-center justify-center border-[1px] w-[20px] h-[20px] rounded-[50%] text-[15px]"
              onClick={() => {
                setIsReply(false);
              }}
            >
              x
            </button>
          </div>
        ) : (
          <>
            <Tooltip placement="top" title={t("like")}>
              <button className="mx-[10px]" onClick={handleLikeReaction}>
                <Icon name="like" font="small" />
              </button>
            </Tooltip>
            <Tooltip placement="top" title={t("reply")}>
              <button className="mx-[10px]" onClick={handleReplyReaction}>
                <Icon name="reply" font="small" />
              </button>
            </Tooltip>
            <Tooltip placement="top" title={t("Bình luận")}>
              <button className="mx-[10px] relative" onClick={handleSeenReply}>
                <Icon name="chat" font="small" />
                {data?.danhSachTraLoi?.length > 0 && (
                  <span className="absolute right-[-10px] top-[-5px] bg-[red] text-[white] text-[9px] rounded-[50%] px-[5px]">
                    {data?.danhSachTraLoi?.length}
                  </span>
                )}
              </button>
            </Tooltip>
          </>
        )}
      </div>
    </div>
  );
};
