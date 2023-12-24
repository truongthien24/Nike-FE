import axiosWrapper from "../../services/jwtServices/jwtServices";

export default {
  getAllKichCo: (params) => {
    return axiosWrapper.get(`/get-all-kichCo`, {
      ...params,
    });
  },

  findProduct: (params) => {
    return axiosWrapper.post(`/find-product`, {
      ...params,
    });
  },

  createKichCo: (params) => {
    return axiosWrapper.post(`/create-kichCo`, {
      ...params,
    });
  },

  getKichCoByID: (params) => {
    return axiosWrapper.get(`/getKichCoByID/${params?.data}`, {
      ...params,
    });
  },

  updateKichCo: (params) => {
    return axiosWrapper.patch(`/update-kichCo/${params?.id}`, {
      ...params,
    });
  },

  deleteKichCo: (params) => {
    return axiosWrapper.delete(`/delete-kichCo/${params?.id}`, {
      ...params,
    });
  },
};
