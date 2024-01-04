import { Button, Modal } from "antd";
import TextArea from "antd/es/input/TextArea";
import React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as yup from "yup";

export const ModalContact = ({
  methodSubmit,
  methodCancel,
  open,
  childrenForm,
  title,
}) => {
  // State

  // Form
  const {
    register,
    watch,
    setValue,
    reset,
    formState: { error },
    handleSubmit,
  } = useForm({
    method: "onChange",
    defaultValues: {},
  });

  // Method
  const submitForm = () => {
    toast('Chức năng đang phát triển')
  };

  const handleOk = (data) => {
    console.log('data', data)
    methodSubmit();
  };

  const handleCancel = () => {
    methodCancel();
  };

  // Return
  return (
    <Modal
      title={title}
      open={open}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={null}
      width={800}
    >
      <form onSubmit={handleSubmit(submitForm)}>
        <div className="grid grid-cols-5 gap-[15px]">
          <div className="col-span-5">
            <TextArea
              rows={7}
              placeholder="Gửi phản hồi đến chúng tôi ở đây..."
              name="noiDung"
            />
          </div>
          <div className="col-span-5">
            <Button type="primary" loading={false} style={{width: '100%'}} htmlType="submit">
              Gửi phản hồi
            </Button>
          </div>
        </div>
      </form>
    </Modal>
  );
};
