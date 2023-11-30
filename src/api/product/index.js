import axiosWrapper from "../../services/jwtServices/jwtServices";

export default {
  getAllProduct: (params) => {
    return axiosWrapper.get(`/get-all-product`, {
      ...params,
    });
  },

  findProduct: (params) => {
    return axiosWrapper.post(`/find-product`, {
      ...params,
    });
  },

  createProduct: (params) => {
    return axiosWrapper.post(`/create-product`, {
      ...params,
    });
  },

  getProductByID: (params) => {
    return axiosWrapper.get(`/getProductByID/${params?.data}`, {
      ...params,
    });
  },

  updateProduct: (params) => {
    return axiosWrapper.patch(`/updateProduct/${params?._id}`, {
      ...params,
    });
  },

  deleteProduct: (params) => {
    return axiosWrapper.delete(`/deleteProduct/${params?._id}`, {
      ...params,
    });
  },
};