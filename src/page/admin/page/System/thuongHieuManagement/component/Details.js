import { yupResolver } from "@hookform/resolvers/yup";
import useLoadingEffect from "fuse/hook/useLoadingEffect";
import _ from "lodash";
import CustomButton from "page/admin/shareComponent/button/CustomButton";
import FormTextField from "page/admin/shareComponent/form/FormTextField";
import React, { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import * as yup from "yup";
import { Select } from "antd";
import useCreateThuongHieu from "../hook/useCreateThuongHieu";
import useUpdateThuongHieu from "../hook/useUpdateThuongHieu";
import FormSelect from "page/admin/shareComponent/form/FormSelect";

const Details = ({
  data = {},
  fetchDetail,
  fetcher,
  showSlice,
  onShowSlice,
}) => {
  const { mutate, isLoading: isSubmitting } = useCreateThuongHieu();

  const { mutate: mutateUpdate, isLoading: isSubmittingUpdate } =
    useUpdateThuongHieu();

  const method = useForm({
    method: "onSubmit",
    defaultValues: {
      tenThuongHieu: "",
      moTaThuongHieu: "",
      quocGia: "",
      tinhTrang: 1,
    },
    resolver: yupResolver(
      yup.object().shape({
        moTaThuongHieu: yup.string().required("Nhập vào đi"),
        tenThuongHieu: yup.string().required("Nhập vào đi"),
        quocGia: yup.string().required("Nhập vào đi"),
        tinhTrang: yup.number().required("Nhập vào đi"),
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

  useEffect(() => {
    if (!_.isEmpty(data)) {
      reset(data);
    }
  }, [data]);

  console.log('errors', errors)

  useEffect(() => {
    if (showSlice) {
      if (!_.isEmpty(data)) {
        reset(data);
      } else {
        reset({
          tenThuongHieu: "",
          moTaThuongHieu: "",
          quocGia: "",
          tinhTrang: 1,
        });
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
            label="Tên thương hiệu"
            name="tenThuongHieu"
            errors={errors}
            required
            control={control}
          />
        </div>
        <div className="col-span-1">
          <FormTextField
            label="Quốc gia"
            name="quocGia"
            errors={errors}
            required
            control={control}
          />
        </div>
        <div className="col-span-1">
          {/* <Select
            defaultValue={1}
            style={{ width: "100%" }}
            onChange={(value) => {
              setValue("tinhTrang", value);
            }}
            options={[
              { value: 1, label: "Sử dụng" },
              { value: 2, label: "Không sử dụng" },
            ]}
          /> */}
          <FormSelect
            label="Tình trạng"
            name="tinhTrang"
            option={[
              { value: 1, label: "Sử dụng" },
              { value: 2, label: "Không sử dụng" },
            ]}
          />
        </div>
        <div className="col-span-3">
          <FormTextField
            label="Mô tả thương hiệu"
            name="moTaThuongHieu"
            errors={errors}
            required
            control={control}
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
