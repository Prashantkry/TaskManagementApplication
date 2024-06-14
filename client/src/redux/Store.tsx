import { combineReducers, configureStore } from "@reduxjs/toolkit";
import UserData from "./UserData";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";

const persistConfig = {
    key: "root",
    version: 1,
    storage,
};

const reducer = combineReducers({
    UserDetails: UserData,
});

const persistedReducer = persistReducer(persistConfig, reducer);

const Store = configureStore({
    reducer: persistedReducer,
});

export type RootState = ReturnType<typeof Store.getState>
export default Store;