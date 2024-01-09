export const columns = (onClickFuncc) => {
  return [
    {
      title: "Tên sản phẩm",
      dataIndex: "tenSanPham",
      key: "tenSanPham",
    },
    {
      title: "Số lượng",
      dataIndex: "soLuong",
      key: "soLuong",
      width: "10%",
    },
    {
      title: "Hình ảnh",
      dataIndex: "hinhAnh",
      key: "hinhAnh",
    },
  ];
};

export const columnsKichCoDetail = () => [
  {
    title: "Số kích cở",
    dataIndex: "soKichCo",
    editable: true,
    render: (text, record) => {
      return {
        children: <button>1323213</button>,
      };
    },
    // <select>
    //   <option value={0}>123</option>
    //   <option value={1}>456</option>
    // </select>
  },
  {
    title: "Số lượng sản phẩm",
    dataIndex: "soLuong",
    editable: true,
  },
];

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
