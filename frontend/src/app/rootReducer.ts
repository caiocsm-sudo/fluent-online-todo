import { combineReducers } from "redux";
import { userSlice } from "./user/slice";

const rootReducer = combineReducers({ userSlice });

export default rootReducer;
