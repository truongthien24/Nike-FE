import { jwtDecode } from "jwt-decode";

export const getUser = (data) => async (dispatch) => {
  try {
    dispatch({
      type: "IS-LAY_DU_LIEU_USER",
      payload: data
    });
  } catch (error) {}
};
