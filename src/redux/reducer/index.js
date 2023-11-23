import { combineReducers } from "redux";
import { AccountReducer } from "./accountReducer";
import { AreaReducer } from "./areaReducer";
import { homeReducer } from "./homeReducer";
import { PhongReducer } from "./phongReducer";
import { BookingReducer } from "./bookingReducer";
import { dichVuReducer } from "./dichVuReducer";
import { danhGiaReducer } from "./danhGiaReducer";
import { CommonCodeReducer } from "./commonCodeReducer";

const reducers = combineReducers({
    phong: PhongReducer,
    taiKhoan: AccountReducer,
    home: homeReducer,
    area: AreaReducer,
    booking: BookingReducer,
    dichVu: dichVuReducer,
    danhGia: danhGiaReducer,
    commonCode: CommonCodeReducer
})

export default reducers;