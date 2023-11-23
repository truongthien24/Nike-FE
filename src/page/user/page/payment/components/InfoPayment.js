import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import React, { useMemo } from 'react'
import { FormProvider, useForm } from 'react-hook-form';

const InfoPayment = () => {
  const jwt = localStorage.getItem("jwt");

  const userInfo = useMemo(() => {
    if (jwt) {
      const jwtDC = jwtDecode(jwt);
      return jwtDC?.users;
    }
  }, [jwt]);

  const method = useForm({
    mode: 'onSubmit',
    defaultValues: {},
  })

  const { handleSubmit } = method;

  const handleSubmitForm = (data) => {

  }

  return (
    <FormProvider {...method}>
      <form className="" onSubmit={handleSubmit(handleSubmitForm)}>
        <div className="mb-[10px] md:mb-[20px] flex justify-between">
          {/* <h2 className="font-[500] md:text-[22px]">
            Thông tin nhận hàng
          </h2> */}
          {/* <div className="flex items-center">
                {
                  !isEdit
                    ?
                    <Tooltip title="Chỉnh sửa">
                      <Button type="primary" shape="circle" icon={<EditFilled />} onClick={() => {
                        setIsEdit(prev => { return !prev })
                      }} />
                    </Tooltip>
                    :
                    <>
                      <Tooltip title="Huỷ bỏ">
                        <Button type="cancel" shape="circle" icon={<CloseOutlined />} onClick={handleCancel} />
                      </Tooltip>
                      <Tooltip title="Lưu">
                        <Button type="primary" className="ml-[10px]" shape="circle" icon={<SaveOutlined />} onClick={async () => {
                          // setIsEdit(prev => { return !prev })
                          await mutateUpdateGioHang({
                            Data: {
                              id: userInfo?.gioHang,
                              sach: watch('danhSach'),
                              insert: false,
                              update: true,
                            },
                            onSuccess: async (res) => {
                              await fetchData();
                              toast.success(res?.data?.message);
                              setIsEdit(false)
                            },
                            onError: (err) => {
                              toast.error(err?.error?.message)
                            }
                          })
                        }} />
                      </Tooltip>
                    </>

                }

              </div> */}
        </div>
      </form>
    </FormProvider>
  )
}

export default InfoPayment