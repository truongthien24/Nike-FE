import axiosWrapper from "../../services/jwtServices/jwtServices";

export default {
  getAllBanner: (params) => {
    return axiosWrapper.get(`/get-all-banner`, {
      ...params,
    });
  },

  findProduct: (params) => {
    return axiosWrapper.post(`/find-product`, {
      ...params,
    });
  },

  createBanner: (params) => {
    return axiosWrapper.post(`/create-banner`, {
      ...params,
    });
  },

  getBannerByID: (params) => {
    return axiosWrapper.get(`/get-banner-byID/${params?.data}`, {
      ...params,
    });
  },

  updateBanner: (params) => {
    return axiosWrapper.patch(`/update-banner`, {
      ...params,
    });
  },

  deleteBanner: (params) => {
    return axiosWrapper.delete(`/delete-banner/${params?.id}`, {
      ...params,
    });
  },
};
