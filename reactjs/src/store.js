import { legacy_createStore as createStore } from "redux";
import appReducers from "./redux/reducers/reducers";

const store = createStore(appReducers); //tạo cửa hàng redux bằng hàm createStore
export default store;