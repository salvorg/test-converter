import axios, { AxiosHeaders, InternalAxiosRequestConfig } from 'axios';
import { apiURL } from './constants';
import {Store} from "@reduxjs/toolkit";
import {RootState} from "./app/store";

const axiosApi = axios.create({
  baseURL: apiURL,
});

export const addInterceptors = (store: Store<RootState>) => {
  axiosApi.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    const headers = config.headers as AxiosHeaders;
    headers.set('apikey', "fca_live_InVUhbOymdH2ROZYTc9NSXga82J5CeVXC6L1J41e");

    return config;
  });
};

export default axiosApi;
