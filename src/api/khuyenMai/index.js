import axiosWrapper from "../../services/jwtServices/jwtServices";

export default {
  getAllKhuyenMai: (params) => {
    return axiosWrapper.get(`/get-all-khuyenMai`, {
      ...params,
    });
  },

  findProduct: (params) => {
    return axiosWrapper.post(`/find-product`, {
      ...params,
    });
  },

  createKhuyenMai: (params) => {
    return axiosWrapper.post(`/create-khuyenMai`, {
      ...params,
    });
  },

  getDanhGiaByID: (params) => {
    return axiosWrapper.get(`/get-khuyenMai-byID/${params?.data}`, {
      ...params,
    });
  },

  updateKhuyenMai: (params) => {
    return axiosWrapper.patch(`/update-khuyenMai/${params?.id}`, {
      ...params,
    });
  },

  deleteKhuyenMai: (params) => {
    return axiosWrapper.delete(`/delete-khuyenMai/${params?.id}`, {
      ...params,
    });
  },
};
