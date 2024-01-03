import axiosWrapper from "../../services/jwtServices/jwtServices";

export default {
  getAllDonHang: (params) => {
    return axiosWrapper.post(`/getAllDonHang`, {
      ...params,
    });
  },

  createDonHang: (params) => {
    return axiosWrapper.post(`/create-donHang`, {
      ...params,
    });
  },

  getDonHangByID: (params) => {
    return axiosWrapper.get(`/getDonHangByID/${params?.data}`, {
      ...params,
    });
  },

  getDonHangByIDUser: (params) => {
    return axiosWrapper.get(`/get-donHang-byIdDUser/${params.userId}`);
  },

  updateDonHang: (params) => {
    return axiosWrapper.patch(`/update-donHang/${params?.id}`, {
      ...params,
    });
  },

  deleteDonHang: (params) => {
    return axiosWrapper.delete(`/deleteDonHang/${params?.id}`, {
      ...params,
    });
  },
};
