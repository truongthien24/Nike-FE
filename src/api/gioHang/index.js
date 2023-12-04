import axiosWrapper from "../../services/jwtServices/jwtServices";

export default {
  getAllGioHang: (params) => {
    return axiosWrapper.get(`/get-all-cart`, {
      ...params,
    });
  },

  findGioHang: (params) => {
    return axiosWrapper.post(`/find-cart`, {
      ...params,
    });
  },

  createGioHang: (params) => {
    return axiosWrapper.post(`/create-cart`, {
      ...params,
    });
  },

  getGioHangByID: (params) => {
    return axiosWrapper.get(`/getGioHangByID/${params?.data}`, {
      ...params,
    });
  },

  updateGioHang: (params) => {
    return axiosWrapper.patch(`/update-cart/${params?._id}`, {
      ...params,
    });
  },

  deleteGioHang: (params) => {
    return axiosWrapper.delete(`/delete-cart/${params?._id}`, {
      ...params,
    });
  },

  checkSanPham: (params) => {
    return axiosWrapper.post(`/checkSanPham`, {
      ...params,
    });
  },
};
