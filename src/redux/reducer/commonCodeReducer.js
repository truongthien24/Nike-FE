const initialValue = {
  kichCo: [],
  khuyenMai: [],
};

export const CommonCodeReducer = (state = initialValue, action) => {
  switch (action.type) {
    case "GET_COMMONCODE": {
      switch (action.payload.name) {
        case "kichCo": {
          state.kichCo = action.payload.Data;
          return { ...state };
        }
        case "khuyenMai": {
          state.khuyenMai = action.payload.Data;
          return { ...state };
        }
        default:
          return state;
      }
    }
    default:
      return state;
  }
};
