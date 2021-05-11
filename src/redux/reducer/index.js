import { combineReducers } from "redux";
import pincodes from "./pincode";
import result from "./result";
const combinedReducer = combineReducers({ pincodes, result });

export default combinedReducer;
