import axiosWrapper from "../../services/jwtServices/jwtServices";

export default {
  getAllDanhGia: (params) => {
    return axiosWrapper.get(`/get-all-danhGia`, {
      ...params,
    });
  },

  findProduct: (params) => {
    return axiosWrapper.post(`/find-product`, {
      ...params,
    });
  },

  createDanhGia: (params) => {
    return axiosWrapper.post(`/create-danhGia`, {
      ...params,
    });
  },

  getDanhGiaByID: (params) => {
    return axiosWrapper.get(`/get-danhGia-byID/${params?.data?.idSanPham}`, {
      ...params,
    });
  },

  updateDanhGia: (params) => {
    return axiosWrapper.patch(`/update-danhGia/${params?.id}`, {
      ...params,
    });
  },

  deleteDanhGia: (params) => {
    return axiosWrapper.delete(`/delete-danhGia/${params?.id}`, {
      ...params,
    });
  },
};
