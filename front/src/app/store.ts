import { combineReducers, configureStore } from '@reduxjs/toolkit';
import {currenciesReducer} from "../features/currencies/currenciesSlice";

const rootReducer = combineReducers({
  currencies: currenciesReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
