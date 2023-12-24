import { Button } from "antd";
import { jwtDecode } from "jwt-decode";
import React, { useMemo, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { PlusOutlined } from "@ant-design/icons";
import ModalAddInfoPayment from "./modals/ModalAddInfoPayment";
import { useSelector } from "react-redux";
import { Icon } from "assets/icon";
import { COLOR } from "page/user/shareComponent/constant";

const InfoPayment = ({step, onStep}) => {
  const jwt = localStorage.getItem("jwt");

  const [open, setOpen] = useState(false);

  const { userInfo } = useSelector((state) => state.home);

  const method = useForm({
    mode: "onSubmit",
    defaultValues: {
      id: 1,
    },
  });

  const { handleSubmit, watch, setValue } = method;

  const onOpen = (event) => {
    setOpen(event);
  };

  const handleSubmitForm = (data) => {};

  const renderThongTinGiaoHang = () => {
    return userInfo?.thongTinNhanHang?.map((diaChi, index) => {
      return (
        <>
          <label
            htmlFor={`info${diaChi?.id}`}
            className="w-full px-[10px] py-[7px] rounded-[10px] cursor-pointer border-solid border-[1px]"
            style={{
              borderColor: `${
                diaChi?.id === watch("id") ? COLOR.primaryColor : ""
              }`,
              backgroundColor: `${
                diaChi?.id === watch("id") ? "#66b5a14a" : ""
              }`,
              boxShadow:
                "rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px",
            }}
          >
            <div className="flex justify-between">
              <span>{diaChi?.hoTen}</span>
              <div className="text-[13px] flex">
                <Icon name="location" font="small" color={COLOR.primaryColor} />
                <span className="ml-[5px]">{diaChi?.diaChi}</span>
              </div>
            </div>
            <div>
              <span className="text-[13px] text-[#868686]">
                +84 {diaChi?.soDt}
              </span>
            </div>
          </label>
          <input
            type="radio"
            id={`info${diaChi?.id}`}
            hidden
            name="id"
            value={diaChi?.id}
            onChange={() => {
              setValue("id", diaChi?.id);
              onStep(prev=> {
                return {
                  ...prev,
                  data: {
                    thongTinGiaoHang: {
                      thongTinNguoiNhan: {
                        tenNguoiNhan: diaChi?.hoTen,
                        diaChi: diaChi?.diaChi,
                        sdt: diaChi?.soDt,
                    }
                    }
                  }
                }
              })
            }}
          />
        </>
      );
    });
  };

  return (
    <>
      <FormProvider {...method}>
        <form className="" onSubmit={handleSubmit(handleSubmitForm)}>
          <div className="mb-[10px] md:mb-[20px] grid grid-cols-1 gap-[10px]">
            {renderThongTinGiaoHang()}
            <div
              className="w-full md:w-[300px] px-[10px] py-[7px] rounded-[10px] cursor-pointer"
              style={{
                boxShadow:
                  "rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px",
              }}
              onClick={() => onOpen(true)}
            >
              <Button
                type="primary"
                icon={<PlusOutlined />}
                className="mr-[10px]"
              />
              <span>Thêm thông tin giao hàng</span>
            </div>
          </div>
        </form>
      </FormProvider>
      <ModalAddInfoPayment open={open} onOpen={onOpen} />
    </>
  );
};

export default InfoPayment;
