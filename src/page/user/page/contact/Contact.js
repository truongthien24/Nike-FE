import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Icon } from "../../../../assets/icon";
import { COLOR } from "page/user/shareComponent/constant";
import { ModalContact } from "./components/ModalContact";
import { checkLogin } from "page/user/shareComponent/Function/checkLogin";
import toast from "react-hot-toast";

export const Contact = () => {
  const [isContact, setIsContact] = useState(false);
  const { t } = useTranslation();

  const onContact = () => {
    setIsContact(prev=> !prev)
  }

  const handleContact = () => {
    if(checkLogin()) {
        onContact()
    } else {
        toast.error('Bạn chưa đăng nhập')
    }
  }

  return (
    <div className="flex justify-center pb-[60px] flex-col items-center">
      <div className="flex justify-center items-center w-full lg:mt-[50px]">
        <div
          className="rounded-[20px] flex-col sm:flex-row w-[95%] md:w-[90%] lg:w-[80%] xl:w-[60%] bg-[white] shadow-gray-300 flex p-[7px]"
          style={{ boxShadow: "rgba(0, 0, 0, 0.15) 0px 5px 15px" }}
        >
          <div className="w-full sm:w-[50%] lg:w-[50%] 2xl:w-[35%] bg-[#3790c7] rounded-[20px] p-[30px] relative test">
            <div className="z-[2] relative">
              <h5 className="text-[20px] lg:text-[23px] text-[white]">
                Liên hệ với chúng tôi
              </h5>
              <p className="text-[13px] text-[#f0f0f0] mt-[13px] font-100">
                Điền vào form and chúng tôi sẽ phản hồi nhanh nhất trong vòng
                24h.
              </p>
            </div>
            <button className="bg-[#a3b409] my-[10px] text-[#fff] px-[10px] py-[5px] rounded-[30px] text-[11px] lg:text-[13px]" onClick={handleContact}>
              Gửi câu hỏi trực tiếp
            </button>
            <div className="grid grid-cols-1 grid-rows-3 gap-[30px] py-[30px] z-[2] relative">
              <div className="flex items-center text-[white]">
                <Icon name="phone" color="#fff" font="small" fill="#fff" />
                <span className="ml-[10px] text-[12px] lg:text-[14px]">
                  +0789 999 999
                </span>
              </div>
              <div className="flex items-center text-[white]">
                <Icon name="mail" color="#fff" font="small" fill="#fff" />
                <span className="ml-[10px] text-[12px] lg:text-[14px]">
                  email@gmail.com
                </span>
              </div>
              <div className="flex items-center text-[white]">
                <Icon name="location" color="#fff" font="small" fill="#fff" />
                <span className="ml-[10px] text-[12px] lg:text-[14px]">
                  Landmark 81, Ho Chi Minh City
                </span>
              </div>
            </div>
            <div className="mt-[50px] flex relative z-[2]">
              <a
                className="mr-[15px] w-[30px] h-[30px] flex items-center justify-center rounded-[50%] duration-500 hover:bg-[#a3b409] cursor-pointer"
                href=""
              >
                <Icon name="facebook" fill="#fff" font="small" />
              </a>
              <a
                className="mr-[15px] w-[30px] h-[30px] flex items-center justify-center rounded-[50%] duration-500 hover:bg-[#a3b409] cursor-pointer"
                href=""
              >
                <Icon name="instagram" fill="#fff" font="small" />
              </a>
              <a
                className="mr-[15px] w-[30px] h-[30px] flex items-center justify-center rounded-[50%] duration-500 hover:bg-[#a3b409] cursor-pointer"
                href=""
              >
                <Icon name="twitter" fill="#fff" font="small" />
              </a>
            </div>
          </div>
          <div className="w-full sm:w-[50%] lg:w-[50%] 2xl:w-[65%] p-[20px] flex items-center">
            <img src="/images/contact.png" />
            {/* <FormContact/> */}
          </div>
        </div>
      </div>
      <ModalContact open={isContact} methodCancel={onContact} title="Liên hệ với chúng tôi"/>
    </div>
  );
};
