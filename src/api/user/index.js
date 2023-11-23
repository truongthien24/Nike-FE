import axiosWrapper from "../../services/jwtServices/jwtServices";

export default {
  userLogin: (params) => {
    return axiosWrapper.post(`/login-user`, {
      ...params,
    });
  },

  adminLogin: (params) => {
    return axiosWrapper.post(`/login-admin`, {
      ...params,
    });
  },


  userRegister: (params) => {
    return axiosWrapper.post(`/create-user`, {
      ...params,
    })
  }

  //   getDataProduction: (params: object) => {
  //     return axiosWrapper.post(`/Production/DataService/GetData`, {
  //       ...params,
  //     });
  //   },
  //   update: (params: object) => {
  //     return axiosWrapper.post(`/Purchasing/DataService/Update`, {
  //       ...params,
  //     });
  //   },
  //   updateProduction: (params: object) => {
  //     return axiosWrapper.post(`/Production/DataService/Update`, {
  //       ...params,
  //     });
  //   },

  //   export: (params: object) => {
  //     return axiosWrapper.post(
  //       `/Production/DataService/Export`,
  //       {
  //         ...params,
  //       },
  //       {
  //         responseType: "blob",
  //       }
  //     );
  //   },
  //   exportReport: (params: object) => {
  //     return axiosWrapper.post(
  //       `/Production/DataService/ExportReport`,
  //       {
  //         ...params,
  //       },
  //       {
  //         responseType: "blob",
  //       }
  //     );
  //   },
};
