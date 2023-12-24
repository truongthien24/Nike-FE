import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import * as yup from "yup";

export const FormAddKichCo = (props) => {
  // Props
  const { arrRoom, setValue, handleOpenChange } = props;

  // Somethings
  const { t } = useTranslation();

  const {kichCo} = useSelector((state)=> state.commonCode)

  // Form

  const validationSchema = yup.object().shape({
    soLuong: yup.number().typeError("Please input number").required(),
    kichCo: yup.string().required(),
  });

  const {
    register,
    getValues,
    error,
    formState: { errors },
    handleSubmit,
  } = useForm({
    method: "onChange",
    resolver: yupResolver(validationSchema),
  });

  // Method
  const handleSubmitData = () => {
    // let a = new Object();
    // a = {
    //   ...a,
    //   tinhTrang: getValues("tinhTrang") === "true" ? true : false,
    //   soPhong: parseInt(getValues("soPhong")),
    // };
    // setValue("soLuongPhong", [...arrRoom, a]);
    // handleOpenChange(false);
  };

  // Return
  return (
    <form className="py-[10px]">
      <div className="mb-[10px]">
        <h5 className="mb-[5px]">
          Kích cở
          <span className="text-[red]">*</span>
        </h5>
        <select
          {...register("kichCo")}
          className={`border-[1px] border-solid border-[#b4b4b4] rounded-[5px] px-[10px] py-[5px] ${
            errors?.kichCo?.message ? "border-orange-400" : ""
          } outline-none w-full`}
        >
          {
            kichCo?.map((sl)=> {
              return <option value={sl?.id}>{sl?.soKichCo}</option>
            })
          }
        </select>
      </div>
      <div className="mb-[5px]">
        <h5 className="mb-[5px]">
          Số lượng
          <span className="text-[red]">*</span>
        </h5>
        <input
          {...register("soPhong")}
          type="number"
          min={100}
          className={`border-[1px] border-solid border-[#b4b4b4] ${
            errors?.soPhong?.message ? "border-orange-400" : ""
          } rounded-[5px] px-[10px] py-[5px] outline-none w-full`}
        />
      </div>
      <div className="flex justify-end items-center">
        <button
          className="flex items-center justify-center bg-[#3790c7] text-white py-[5px] px-[10px] rounded-[7px] duration-300 hover:shadow-[#3790c7a6] hover:shadow-lg hover:translate-y-[-3px]"
          type="button"
          onClick={handleSubmitData}
        >
          {t("save")}
        </button>
      </div>
    </form>
  );
};
