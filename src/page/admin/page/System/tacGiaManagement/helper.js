export const columns = (onClickFuncc) => {
  return [
    {
      title: "Tên tác  giả",
      dataIndex: "tenTacGia",
      key: "tenTacGia",
      width: "25%",
    },
    {
      title: "Chi tiết tác giả",
      dataIndex: "chiTietTacGia",
      key: "chiTietTacGia",
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
