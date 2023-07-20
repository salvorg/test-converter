import {ApiCurrency, ApiExchangeRates} from "../../types";
import {createSlice} from "@reduxjs/toolkit";
import {RootState} from "../../app/store";
import {fetchAll, fetchExchangeRates} from "./currenciesThunks";

interface CurrenciesState {
  items: ApiCurrency[] | null;
  exchangeRates: ApiExchangeRates[] | null;
  fetching: boolean;
  fetchingRates: boolean;
}

const initialState: CurrenciesState = {
  items: null,
  exchangeRates: null,
  fetching: false,
  fetchingRates: false,
}

export const currenciesSlice = createSlice({
  name: 'currencies',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAll.pending, (state) => {
      state.fetching = true;
    });
    builder.addCase(fetchAll.fulfilled, (state, { payload: currencies }) => {
      state.fetching = false;
      state.items = currencies;
    });
    builder.addCase(fetchAll.rejected, (state) => {
      state.fetching = false;
    });

    builder.addCase(fetchExchangeRates.pending, (state) => {
      state.fetching = true;
    });
    builder.addCase(fetchExchangeRates.fulfilled, (state, { payload: rates }) => {
      state.fetching = false;
      state.exchangeRates = rates;
    });
    builder.addCase(fetchExchangeRates.rejected, (state) => {
      state.fetching = false;
    });
  },
});

export const currenciesReducer = currenciesSlice.reducer;

export const selectCurrencies = (state: RootState) => state.currencies.items;
export const selectExchangeRates = (state: RootState) => state.currencies.exchangeRates;
export const selectCurrenciesFetching = (state: RootState) => state.currencies.fetching;
export const selectExchangeRatesFetching = (state: RootState) => state.currencies.fetchingRates;