import {createAsyncThunk} from "@reduxjs/toolkit";
import axiosApi from "../../axiosApi";
import {apiKey} from "../../constants";
import {ApiCurrency, ApiExchangeRates} from "../../types";

export const fetchAll = createAsyncThunk<ApiCurrency[]>(
  'currencies/fetchAll',
  async () => {
    const response = await axiosApi.get(`currencies${apiKey}`);
    return Object.values(response.data.data);
  },
);

export const fetchExchangeRates = createAsyncThunk<ApiExchangeRates[], string>(
  'currencies/fetchExchangeRates',
  async (baseCurrency) => {
    const response = await axiosApi.get(`latest${apiKey}&currencies=&base_currency=${baseCurrency}`);
    const keys: string[] = Object.keys(response.data.data);
    const values: number[] = Object.values(response.data.data);
    const data = [];
    for (let i = 0; i < values.length; i++) {
      data.push({code: keys[i], value: values[i]});
    }
    return data;
  },
);