import axiosWrapper from "../../services/jwtServices/jwtServices";

export default {
  getAllThuongHieu: (params) => {
    return axiosWrapper.get(`/get-all-thuongHieu`, {
      ...params,
    });
  },

  findProduct: (params) => {
    return axiosWrapper.post(`/find-product`, {
      ...params,
    });
  },

  createThuongHieu: (params) => {
    return axiosWrapper.post(`/create-thuongHieu`, {
      ...params,
    });
  },

  getBannerByID: (params) => {
    return axiosWrapper.get(`/get-thuongHieu-byID/${params?.data}`, {
      ...params,
    });
  },

  updateThuongHieu: (params) => {
    return axiosWrapper.patch(`/update-thuongHieu`, {
      ...params,
    });
  },

  deleteThuongHieu: (params) => {
    return axiosWrapper.delete(`/delete-thuongHieu/${params?.id}`, {
      ...params,
    });
  },
};
