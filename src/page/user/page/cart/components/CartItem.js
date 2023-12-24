import { Button, Tooltip } from "antd";
import _ from "lodash";
import React, { useEffect, useMemo } from "react";
import { useFormContext } from "react-hook-form";
import { SearchOutlined, DeleteFilled, EditFilled } from '@ant-design/icons';
import { useDispatch } from "react-redux";
import { setConfirm } from "redux/action/homeAction";
import { toast } from "react-hot-toast";


const CartItem = ({ arrayData, data, columns, isEdit }) => {
  const {
    getValues,
    watch,
    setValue,
    register,
  } = useFormContext();

  const dispatch = useDispatch();

  useEffect(() => {
    if (!_.isEmpty(data)) {
      // reset({ ...data.sach, soLuongGioHang: data.soLuong });
    }
  }, [data]);

  const indexItem = useMemo(() => {
    if (getValues('danhSach')) {
      return getValues('danhSach')?.findIndex((i) => i === data);
    }
  }, [watch('danhSach')])

  const handleChangeQuantity = (method) => {
    let preValue = getValues(`danhSach[${indexItem}].soLuong`);
    switch (method) {
      case 'minas': {
        const nextValue = --preValue;
        setValue(`danhSach[${indexItem}].soLuong`, nextValue);
        setValue(`danhSach[${indexItem}].thanhTien`, nextValue * parseInt(getValues(`danhSach[${indexItem}].sanPham.giaSanPham`)))
        break;
      };
      case 'plus': {
        const nextValue = ++preValue;
        setValue(`danhSach[${indexItem}].soLuong`, nextValue)
        setValue(`danhSach[${indexItem}].thanhTien`, nextValue * parseInt(getValues(`danhSach[${indexItem}].sanPham.giaSanPham`)))
        break;
      };
      default: break;
    }
  };


  const deleteItemCart = async (item) => {
    // await dispatch(setConfirm({
    //   status: 'open',
    //   method: async () => {
    //     toast('Chức năng đang phát triển')
    //   }
    // }))
    await dispatch(
      setConfirm({
        status: "open",
        method: async () => {
          const index = watch("danhSach").findIndex((item)=> item.id == data.id);
          setValue(`danhSach[${indexItem}].useYN`, false);
          dispatch(
            setConfirm({
              status: "close",
              method: null,
            })
          );
        },
      })
    );
  }

  console.log('watch', watch())

  return (
    <div className="flex items-center justify-between w-full">
      {columns?.map((item, index) => {
        if (item.visible) {
          switch (item.name) {
            case "thongTinSanPham": {
              return (
                <div className="flex" style={{ width: `${item.width}` }}>
                  <img
                    src={data?.sanPham?.hinhAnh}
                    className="h-full w-[50px] md:w-[100px] mr-[10px] md:mr-[25px]"
                  />
                  <div>
                    <h4 className="max-w-[300px] text-[12.5px] md:text-[15px]">
                      {data?.sanPham?.tenSanPham}
                    </h4>
                    <span className="text-[#797979] text-[12px] md:text-[14px]">
                      {getValues("tenTheLoai")}
                    </span>
                  </div>
                </div>
              );
            }
            case "soLuong": {
              return (
                <div
                  className="flex items-center justify-center my-[10px]"
                  style={{ width: `${item.width}` }}
                >
                  <div className="flex items-center justify-center">
                    {
                      isEdit
                        ?
                        <>
                          <button
                            type="button"
                            className="bg-[#dcdbdb] w-[20px] h-[20px] md:w-[35px] md:h-[35px] flex items-center justify-center"
                            disabled={watch(`danhSach[${indexItem}].soLuong`) === 1}
                            onClick={() => handleChangeQuantity("minas")}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="currentColor"
                              className="w-4 h-4"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M18 12H6"
                              />
                            </svg>
                          </button>
                          <input
                            className="bg-[white] text-[11px] md:text-[13px] w-[20px] h-[20px] md:w-[35px] md:h-[35px] text-center"
                            disabled
                            // value={data?.soLuong}
                            {...register(`danhSach[${indexItem}].soLuong`)}
                          />
                          <button
                            type="button"
                            className="bg-[#dcdbdb] w-[20px] h-[20px] md:w-[35px] md:h-[35px] flex items-center justify-center"
                            onClick={() => handleChangeQuantity("plus")}
                            disabled={watch(`danhSach[${indexItem}].soLuong`) === 10}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="currentColor"
                              className="w-4 h-4"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M12 6v12m6-6H6"
                              />
                            </svg>
                          </button>
                        </>
                        :
                        <span className="text-[11px] md:text-[13px]">
                          {data?.soLuong}
                        </span>
                    }
                  </div>
                </div>
              );
            }
            case "gia": {
              return (
                <div
                  className="flex justify-center text-[11px] md:text-[13px]"
                  style={{ width: `${item.width}` }}
                >
                  {data?.sanPham?.giaSanPham?.toLocaleString()}
                </div>
              );
            }
            case "action": {
              return (
                <div
                  className="flex justify-center text-[11px] md:text-[13px]"
                  style={{ width: `${item.width}` }}
                >
                  <Tooltip title="Xoá" onClick={() => deleteItemCart(data?.sanPham?.id)}>
                    <Button type="delete" shape="circle" icon={<DeleteFilled />} />
                  </Tooltip>
                </div>
              );
            }
            case "thanhTien": {
              return (
                <div
                  className="flex justify-center text-[11px] md:text-[13px]"
                  style={{ width: `${item.width}` }}
                >
                  {(
                    parseInt(data?.sanPham?.giaSanPham) * watch(`danhSach[${indexItem}].soLuong`)
                  )?.toLocaleString()}
                </div>
              );
            }
          }
        }
      })}
    </div>
  );
};

export default CartItem;
