import axiosWrapper from "../../services/jwtServices/jwtServices";

export default {
  userLogin: (params) => {
    return axiosWrapper.post(`/login`, {
      ...params,
    });
  },

  adminLogin: (params) => {
    return axiosWrapper.post(`/login-admin`, {
      ...params,
    });
  },


  registerAccount: (params) => {
    return axiosWrapper.post(`/register-account`, {
      ...params,
    })
  }
};
