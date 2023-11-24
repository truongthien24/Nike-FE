import { jwtDecode } from "jwt-decode";

export const getUser = (data) => async (dispatch) => {
  try {
    const jwtDC = jwtDecode(data);
    dispatch({
      type: "IS-LAY_DU_LIEU_USER",
      payload: jwtDC?.users
    });
  } catch (error) {}
};
