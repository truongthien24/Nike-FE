import { yupResolver } from "@hookform/resolvers/yup";
import useLoadingEffect from "fuse/hook/useLoadingEffect";
import _ from "lodash";
import CustomButton from "page/admin/shareComponent/button/CustomButton";
import FormTextField from "page/admin/shareComponent/form/FormTextField";
import React, { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import * as yup from "yup";
import useUpdateKichCo from "../hook/useUpdateBanner";
import { Select } from "antd";
import useCreateBanner from "../hook/useCreateBanner";
import FormUploadFile from "page/admin/shareComponent/form/FormUploadFile";
import FormSelect from "page/admin/shareComponent/form/FormSelect";
import useUpdateBanner from "../hook/useUpdateBanner";

const Details = ({
  data = {},
  fetchDetail,
  fetcher,
  showSlice,
  onShowSlice,
}) => {
  const { mutate, isLoading: isSubmitting } = useCreateBanner();

  const { mutate: mutateUpdate, isLoading: isSubmittingUpdate } =
    useUpdateBanner();

  const method = useForm({
    method: "onSubmit",
    defaultValues: {
      tenBanner: "",
      moTaBanner: "",
      tinhTrang: 2,
      hinhAnh: "",
      reuploadImage: false,
    },
    resolver: yupResolver(
      yup.object().shape({
        tenBanner: yup.string().required("Nhập tên vào đi"),
        moTaBanner: yup.string().required("Nhập mô tả vào đi"),
        tinhTrang: yup.number().required(""),
        hinhAnh: yup.string().required(""),
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
    getValues,
  } = method;

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
        reset({ tenBanner: "", moTaBanner: "", tinhTrang: 2, hinhAnh: "" });
      }
    }
  }, [showSlice]);

  useEffect(() => {
    return () => reset();
  }, []);

  const submitForm = async (value) => {
    if (showSlice?.initData?.id) {
      await mutateUpdate({
        Data: { ...value, id: data?.id },
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
        Data: value,
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
            label="Tên banner"
            name="tenBanner"
            errors={errors}
            required
            control={control}
          />
        </div>
        <div className="col-span-2">
          <FormTextField
            label="Mô tả"
            name="moTaBanner"
            errors={errors}
            required
            control={control}
          />
        </div>
        <div className="col-span-1">
          <FormSelect
            name="tinhTrang"
            style={{ width: "100%" }}
            option={[
              { value: 1, label: "Ẩn" },
              { value: 2, label: "Hiện" },
            ]}
          />
        </div>
        <div className="col-span-3">
          <FormUploadFile
            name="hinhAnh"
            title="Hình ảnh"
            styles={{ height: "300px" }}
            handleChange={(e)=> {
              setValue("reuploadImage", true)
            }}
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
