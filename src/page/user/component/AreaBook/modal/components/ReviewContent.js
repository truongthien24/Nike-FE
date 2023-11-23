import { COLOR } from "page/user/shareComponent/constant";
import React from "react";
import ReviewInfoItem from "./ReviewInfoItem";

const ReviewContent = ({ data }) => {
  return (
    <div>
      <h3 className="text-[22px] font-[400] mb-[10px]">{data?.tenSach}</h3>
      <div className="flex items-center">
        <div className="flex items-center">
          <p className="text-[gray] text-[11px] md:text-[13px] 2xl:text-[14px]">
            Tác giả: <span className="text-[#000]">{data?.tenTacGia}</span>
          </p>
        </div>
        <span className="mx-[10px]">|</span>
        <div className="flex items-center">
          <p className="text-[gray] text-[11px] md:text-[13px] 2xl:text-[14px">
            Tình trạng:{" "}
            <span className="text-[#000]">
              {data?.soLuong > 0 ? "Còn hàng" : "Hết hàng"}
            </span>
          </p>
        </div>
      </div>
      <div
        className="text-[white] py-[5px] px-[12px] max-w-fit my-[20px] ml-[5px]"
        style={{
          backgroundColor: `${COLOR.secondaryColor}`,
          transform: "skew(10deg)",
        }}
      >
        <span
          className="inline-block text-[18px] md:text-[22px] text-bold"
          style={{ transform: "skew(-10deg)" }}
        >
          {data?.gia?.toLocaleString()}đ
        </span>
      </div>
      <div className="flex flex-col">
        <ReviewInfoItem title="Nhà cung cấp" data={data?.tenNhaCungCap} />
        <ReviewInfoItem title="Thể loại" data={data?.tenTheLoai} />
        <ReviewInfoItem title="Ngôn ngữ" data={data?.tenNgonNgu} />
        <ReviewInfoItem title="Nhà xuất bản" data={data?.tenNhaXuatBan} />
        <ReviewInfoItem title="Năm xuất bản" data={data?.namXuatBan} />
        <ReviewInfoItem title="Số trang" data={data?.soTrang} />
        <ReviewInfoItem title="Kích thước" data={data?.kichThuoc} />
      </div>
    </div>
  );
};

export default ReviewContent;
