import { Icon } from "assets/icon";
import React, { useRef } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { setLoading } from "redux/action/homeAction";
import { COLOR } from "../shareComponent/constant";
import toast from "react-hot-toast";
import useFindDataBook from "page/admin/page/RoomManagement/hook/useFindBook";
import { Empty } from "antd";
import ResultSearch from "./ResultSearch";

const FormSearch = (props) => {
  // Props
  const { data } = props;

  const searchResultRef = useRef(null);
  const searchFormRef = useRef(null);

  const dispatch = useDispatch();

  const defaultValues = {
    valueSearch: "",
  };

  const method = useForm({
    defaultValues,
    mode: "onSubmit",
  });

  const { reset, register, setValue, getValues, watch, handleSubmit } = method;

  const onSubmit = (data) => {
    // toast.error("Chức năng đang phát triển");
  };

  return (
    <FormProvider {...method}>
      <form
        ref={searchFormRef}
        className={`min-w-[350px] rounded-[20px] relative flex items-center`}
        style={{boxShadow: "rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px"}}
        onSubmit={handleSubmit(onSubmit)}
      >
        <button
          className={`w-[50px] h-[40px] flex items-center justify-center text-[#000] rounded-[50%] border-none duration-200`}
        >
          <Icon name="search" />
        </button>
        <input
          type="text"
          className="w-[calc(100%_-_50px)] px-[10px] py-[8px] text-[12px] outline-none"
          placeholder="Nhập từ khoá tìm kiếm"
          {...register("valueSearch")}
          onKeyDown={(e) => {
            searchResultRef.current.style.display = "block";
          }}
          onFocus={(e) => {
            if (e.target.value) {
              searchResultRef.current.style.display = "block";
            }
          }}
        />
        <ResultSearch
          data={watch("valueSearch")}
          resultRef={searchResultRef}
          searchRef={searchFormRef}
        />
      </form>
    </FormProvider>
  );
};

export default FormSearch;
