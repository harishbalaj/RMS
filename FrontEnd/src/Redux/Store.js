import { configureStore} from "@reduxjs/toolkit";
import userReducer from "./Slices/userSlice";
import {combineReducers} from "@reduxjs/toolkit";

const rootReducer = combineReducers({
    user: userReducer
})

const store = configureStore({
    reducer: rootReducer
})

export default store