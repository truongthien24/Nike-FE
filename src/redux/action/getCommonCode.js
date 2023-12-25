import axios from "axios";
import { toast } from "react-hot-toast";
import axiosWrapper from "services/jwtServices/jwtServices";

export const getCommonCode = (name) => async (dispatch) => {
  try {
    let routerCommonCode = "";
    switch (name) {
      case "kichCo": {
        routerCommonCode = "/get-all-kichCo";
        break;
      }
      case "khuyenMai": {
        routerCommonCode = "/get-all-khuyenMai";
        break;
      }
      default:
        break;
    }
    const result = await axiosWrapper.get(routerCommonCode);
    dispatch({
      type: "GET_COMMONCODE",
      payload: {
        Data: result?.data?.data,
        name,
      },
    });
  } catch (error) {
    toast.error(error);
  }
};
