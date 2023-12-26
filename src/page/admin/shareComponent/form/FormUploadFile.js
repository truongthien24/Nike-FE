import React from "react";
import { UploadOutlined } from "@ant-design/icons";
import { useFormContext } from "react-hook-form";
import { convertToBase64 } from "page/user/shareComponent/Function/convertBase64";

const FormUploadFile = ({ handleChange, name, title, styles }) => {
  const { watch, setValue } = useFormContext();

  const handleChangeImage = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertToBase64(file);
    setValue(name, base64);
    if (handleChange) {
      handleChange(e);
    }
  };

  return (
    <div className="w-full">
      <h5 className="mb-[7px] ml-[3px]">
        Photo
        <span className="text-[red]">*</span>
      </h5>
      <div className="rounded-[10px] border-solid border-[1px] border-[#cdcdcd] shadow-lg shadow-gray-400" style={styles}>
        <div className="p-[10px] w-full h-[calc(100%_-_40px)]">
          <img src={watch(name)} className="h-full w-full rounded-[5px]" />
        </div>
        <label
          className="w-full py-[10px] px-[20px] cursor-pointer bg-[#3790c7] block rounded-b-[10px]"
          htmlFor="imageRoom"
        >
          <UploadOutlined
            style={{
              color: "white",
              fontWeight: "bold",
              fontSize: "20px",
            }}
          />
        </label>
        <input
          type="file"
          accept="image/png, image/jpg, image/jpeg"
          id="imageRoom"
          className="hidden z-[-1] "
          onChange={handleChangeImage}
        />
      </div>
    </div>
  );
};

export default FormUploadFile;
