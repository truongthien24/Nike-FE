import { Confirm } from "component/Confirm/Confirm";
import useLoadingEffect from "fuse/hook/useLoadingEffect";
import _ from "lodash";
import { TableMain } from "page/admin/shareComponent/table/TableMain";
import PopupMain from "page/user/shareComponent/Popup/PopupMain";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { setConfirm } from "redux/action/homeAction";
import Details from "./component/Details";
import { columns } from "./helper";
import useGetDataBanner from "./hook/useGetDataBanner";
import useGetDetailBanner from "./hook/useGetDetailBanner";
import useDeleteBanner from "./hook/useDeleteBanner";

const BannerManagement = () => {
  // State
  const [showSlice, onShowSlice] = useState({ open: false, initData: {} });

  const { t } = useTranslation();

  const dispatch = useDispatch();

  // Get Data
  const { bannerData, isDataLoading, fetchData, isFetching } =
    useGetDataBanner("0", "0");

  const {
    bannerDataDetail,
    isDataDetailLoading,
    fetchData: fetchDataDetail,
    isFetching: isFetchDetail,
  } = useGetDetailBanner("0", "0", showSlice?.initData?.id);

  const { mutate: mutateDelete, isLoading: isSubmittingDelete } =
    useDeleteBanner();

  // Method
  const handleAdd = () => {
    onShowSlice({
      open: true,
      initData: null,
    });
  };

  const handleEdit = (data) => {
    onShowSlice({
      open: true,
      initData: data,
    });
  };

  const handleDelete = async (data) => {
    await dispatch(
      setConfirm({
        status: "open",
        method: async () =>
          await mutateDelete({
            Data: { id: data?.id },
            onSuccess: async (res) => {
              toast.success(res?.data?.message);
              fetchData();
              dispatch(
                setConfirm({
                  status: "close",
                  method: () => {},
                })
              );
            },
            onError: async (error) => {
              toast.error(error?.message);
            },
          }),
      })
    );
  };

  useLoadingEffect(isDataLoading || isDataDetailLoading || isSubmittingDelete);

  return (
    <>
      <div className="h-[12%] flex justify-between items-center">
        <h3 className="text-[20px] text-[#3790c7] font-bold">
          {t("Quản lý banner")}
        </h3>
        <button
          className="flex items-center justify-center bg-[#3790c7] text-white py-[10px] px-[20px] rounded-[7px] duration-300 hover:shadow-[#3790c7a6] hover:shadow-lg hover:translate-y-[-3px]"
          type="submit"
          onClick={handleAdd}
        >
          {t("add")}
        </button>
      </div>
      <div className="h-[88%]">
        <TableMain
          data={bannerData}
          columns={columns()}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
        />
      </div>
      <PopupMain
        title={
          _.isEmpty(showSlice?.initData?.id) ? "Thêm banner" : "Sửa banner"
        }
        showSlice={showSlice}
        onShowSlice={onShowSlice}
        fullWidth
        children={
          <Details
            data={bannerDataDetail}
            fetcher={fetchData}
            fetchDetail={fetchDataDetail}
            showSlice={showSlice}
            onShowSlice={onShowSlice}
          />
        }
      />
      <Confirm />
    </>
  );
};

export default BannerManagement;
