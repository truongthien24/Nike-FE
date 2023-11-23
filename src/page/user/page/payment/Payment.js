import { Steps } from "antd";
import {
  LoadingOutlined,
  SmileOutlined,
  SolutionOutlined,
} from "@ant-design/icons";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import InfoPayment from "./components/InfoPayment";
import MethodPayment from "./components/MethodPayment";
import ConfirmPayment from "./components/ConfirmPayment";

const Payment = () => {

  const {id} = useParams();

  const [paymentStep, setPaymentStep] = useState({
    step: 0,
    status: false,
  })

  const renderStepContent = () => {
    switch(paymentStep.step) {
      case 0: {
        return <InfoPayment/>
      }
      case 1: {
        return <MethodPayment/>
      }
      case 2: {
        return <ConfirmPayment/>
      }
      default: return <></>
    }
  };

  return (
    <div className="md:pt-[150px] pb-[20px] min-h-[calc(100vh_-_300px)] flex justify-center">
      <div className="flex flex-col items-center bg-[#eaeaea] w-[95%] xl:w-[90%] 2xl:w-[70%] px-[25px] py-[20px]">
        <h3 className="mb-[30px] text-[20px]">{paymentStep.step === 0 ? "Thông tin nhận hàng" : paymentStep.step === 1 ? 'Phương thức thanh toán' : 'Thanh toán'}</h3>
        <div className="w-full">
          <Steps
            items={[
              {
                title: "Verification",
                // status: "finish",
                status: "process",
                icon: <LoadingOutlined />,
              },
              {
                title: "Pay",
                status: "wait",
                icon: <SolutionOutlined />,
              },
              {
                title: "Done",
                status: "wait",
                icon: <SmileOutlined />,
              },
            ]}
          />
          <div className="pt-[30px]">{renderStepContent()}</div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
