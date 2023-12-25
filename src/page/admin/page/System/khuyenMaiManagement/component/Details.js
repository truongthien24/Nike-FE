import { yupResolver } from "@hookform/resolvers/yup";
import useLoadingEffect from "fuse/hook/useLoadingEffect";
import _ from "lodash";
import CustomButton from "page/admin/shareComponent/button/CustomButton";
import FormTextField from "page/admin/shareComponent/form/FormTextField";
import React, { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import * as yup from "yup";
import useUpdateKichCo from "../hook/useUpdateKichCo";
import useCreateKhuyenMai from "../hook/useCreateKhuyenMai";
import { Select } from "antd";

const Details = ({
  data = {},
  fetchDetail,
  fetcher,
  showSlice,
  onShowSlice,
}) => {
  const { mutate, isLoading: isSubmitting } = useCreateKhuyenMai();

  const { mutate: mutateUpdate, isLoading: isSubmittingUpdate } =
    useUpdateKichCo();

  const method = useForm({
    method: "onSubmit",
    defaultValues: {
      maKhuyenMai: "",
      tenKhuyenMai: "",
      phanTramKhuyenMai: null,
      loaiKhuyenMai: 1,
    },
    resolver: yupResolver(
      yup.object().shape({
        maKhuyenMai: yup.string().required("Nhập mã khuyến mãi vào đi"),
        tenKhuyenMai: yup.string().required("Nhập tên khuyến mãi vào đi"),
        phanTramKhuyenMai: yup
          .number()
          .required("Nhập phần trăm khuyến mãi vào đi"),
        loaiKhuyenMai: yup.number().required("Nhập loại khuyến mãi vào đi"),
      })
    ),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
    setValue,
  } = method;

  console.log('errors', errors)

  useEffect(() => {
    if (!_.isEmpty(data)) {
      reset(data);
    }
  }, [data]);

  useEffect(() => {
    if (showSlice) {
      if (!_.isEmpty(data)) {
        reset(data);
      } else {
        reset({ tenNgonNgu: "" });
      }
    }
  }, [showSlice]);

  useEffect(() => {
    return () => reset();
  }, []);

  const submitForm = async (data) => {
    if (showSlice?.initData?._id) {
      await mutateUpdate({
        Data: data,
        onSuccess: async (res) => {
          toast.success(res?.data?.message);
          fetcher();
          fetchDetail();
        },
        onError: async (error) => {
          toast.error(error?.error?.message);
        },
      });
    } else {
      await mutate({
        Data: data,
        onSuccess: async (res) => {
          toast.success(res?.data?.message);
          fetcher();
          onShowSlice((prev) => {
            return { ...prev, open: false, initData: null };
          });
        },
        onError: async (error) => {
          toast.error(error?.error?.message);
        },
      });
    }
  };

  useLoadingEffect(isSubmitting || isSubmittingUpdate);

  return (
    <FormProvider {...method}>
      <form
        className="grid grid-cols-3 gap-[5px]"
        onSubmit={handleSubmit(submitForm)}
      >
        {/* Có 3 cột */}
        <div className="col-span-1">
          <FormTextField
            label="Mã khuyến mãi"
            name="maKhuyenMai"
            errors={errors}
            required
            control={control}
          />
        </div>
        <div className="col-span-1">
          <FormTextField
            label="Tên khuyến mãi"
            name="tenKhuyenMai"
            errors={errors}
            required
            control={control}
          />
        </div>
        <div className="col-span-1">
          <FormTextField
            label="Phần trăm khuyến mãi"
            name="phanTramKhuyenMai"
            errors={errors}
            required
            control={control}
            type="number"
          />
        </div>
        <div className="col-span-1">
          <Select
            defaultValue={1}
            style={{ width: "100%" }}
            onChange={(value) => {
              setValue("loaiKhuyenMai", value);
            }}
            options={[
              { value: 1, label: "1" },
              { value: 2, label: "2" },
            ]}
          />
        </div>

        <div className="col-span-3 mt-[20px]">
          <CustomButton
            label="Lưu"
            type="submit"
            loading={isSubmitting || isSubmittingUpdate}
          />
        </div>
      </form>
    </FormProvider>
  );
};

export default Details;
