import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FormBaseRegister } from "../../component/Form/FormBaseRegister";
import * as yup from "yup";
import { useTranslation } from "react-i18next";
import axios from "axios";
import useRegister from "./hook/useRegister";
import { toast } from "react-hot-toast";
import useLoadingEffect from "fuse/hook/useLoadingEffect";
import { message } from "antd";

export const Register = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const { mutate, isLoading: isSubmitting } = useRegister();

  const initialValue = {
    tenDangNhap: "",
    matKhau: "",
    loaiTaiKhoan: "guest", //user
  };

  const formField = [
    {
      label: 'Username',
      name: "tenDangNhap",
      type: "string",
    },
    {
      label: 'Password',
      name: "matKhau",
      type: "password",
    },
    {
      label: 'Confirm password',
      name: "confirmPassword",
      type: "password",
    },
    {
      label: 'Email',
      name: "email",
      type: "email",
    },
  ];

  const validationSchema = yup.object().shape({
    tenDangNhap: yup.string().required("Please input...."), //Reuired: bắt buộc nhập, string là kiểu kí tự chuỗi
    matKhau: yup
      .string()
      .required("Please input....")
      .test("len", "Must be 6-24 characters", (data) => {
        if (data.toString().length >= 6 && data.toString().length <= 24) {
          return true; //Hợp lệ
        }
        return false; //Không hợp lệ
      }),
    confirmPassword: yup
      .string()
      .required("Please input....")
      .oneOf([yup.ref("matKhau")], "Password does not match")
      .test("len", "Must be 6-24 characters", (data) => {
        if (data.toString().length >= 6 && data.toString().length <= 24) {
          return true;
        }
        return false;
      }),
    email: yup
      .string()
      .email("Please input abc@gmail...")
      .required("Please input..."),
  });

  // useEffect(()=> {
  //   if(window.location.pathname === "/user/login") {
  //     window.onclick = () => navigate("/user");
  //   }
  // })

  const registerUserTest = async (data) => {
    // axios.post("http://localhost:3001/create-TaiKhoan", data?.data).then(result=>
    await mutate({
      Data: { ...data?.data, loaiTaiKhoan: "user" },
      onSuccess: async (msg) => {
        toast.success(msg.data.message);
      },
      onError: async (err) => {
        toast.error(err?.message);
      },
    });
  };
  useLoadingEffect(isSubmitting);
  return (
    <div className="fixed top-0 left-0 w-screen h-screen bg-[white] z-[101] flex flex-col lg:flex-row items-center lg:justify-center">
      <div className="mr-[10px] my-[20px] flex justify-center lg:flex-1">
        <img src="/images/nike-logo.png" className="w-[200px] md:w-[250px]" />
      </div>
      <div className="lg:flex-1 w-full flex justify-center">
        <div
          className="bg-[white] w-[85%] md:w-[70%] lg:w-[80%] xl:w-[70%] 2xl:w-[70%] rounded-[10px] px-[15px] lg:px-[30px] py-[20px]"
          style={{ boxShadow: "rgba(0, 0, 0, 0.26) 0px 5px 40px" }}
        >
          <div className="flex items-center justify-between mb-[20px] md:mb-[30px]">
            <h3 className="text-[20px] md:text-[25px] font-[500] text-[#498374]">
              {t("register")}
            </h3>
            <span
              className="text-[25px] md:text-[30px] font-[500] translate-y-[-5px] text-[#498374] cursor-pointer"
              onClick={() => {
                navigate("/login");
              }}
            >
              &times;
            </span>
          </div>
          <div className="flex items-center justify-center">
            <FormBaseRegister
              initialValue={initialValue}
              formField={formField}
              validationSchema={validationSchema}
              methodSubmit={registerUserTest}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

// Xúất ra giao diện
