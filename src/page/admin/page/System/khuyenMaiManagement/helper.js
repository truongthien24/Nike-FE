export const columns = (onClickFuncc) => {
  return [
    {
      title: "Mã khuyến mai",
      dataIndex: "maKhuyenMai",
      key: "maKhuyenMai",
    },
    {
      title: "Tên khuyến mai",
      dataIndex: "tenKhuyenMai",
      key: "tenKhuyenMai",
    },
    {
      title: "Loại khuyến mai",
      dataIndex: "loaiKhuyenMai",
      key: "loaiKhuyenMai",
    },
    {
      title: "Phần trăm khuyến mai",
      dataIndex: "phanTramKhuyenMai",
      key: "phanTramKhuyenMai",
    },
  ];
};

// getDataTable
export const getDataTable = (data) => {
  const dataResult = [];
  data?.length > 0 &&
    data.map((item, index) => {
      const obj = { ...item, key: index };
      return dataResult.push(obj);
    });
  return dataResult;
};

export const setGridColumn = (size) => {
  if (size === "3") {
    return "col-span-3";
  } else if (size === "2") {
    return "col-span-2";
  } else {
    return "col-span-1";
  }
};
