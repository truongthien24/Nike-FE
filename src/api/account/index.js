import axiosWrapper from "../../services/jwtServices/jwtServices";

export default {
  userLogin: (params) => {
    return axiosWrapper.post(`/login`, {
      ...params,
    });
  },

  getAccountByID: (params) => {
    return axiosWrapper.get(`/get-account-by-ID/${params}`)
  },

  adminLogin: (params) => {
    return axiosWrapper.post(`/login-admin`, {
      ...params,
    });
  },

  updateAccount: (params) => {
    return axiosWrapper.patch(`/update-account`, {
      ...params,
    });
  },

  registerAccount: (params) => {
    return axiosWrapper.post(`/register-account`, {
      ...params,
    });
  },
};
