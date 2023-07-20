import React, {useState} from 'react';
import axiosApi from "../../axiosApi";
import {apiKey} from "../../constants";
import {Button} from "@mui/material";

const Latest = () => {
  const [baseCurrency, setBaseCurrency] = useState<string>('');
  const [currencies, setCurrencies] = useState<string>('');

  const a = `&currencies=EUR%2CUSD%2CCAD&base_currency=BGN`;

  const changeHandler = async () => {
    const response = await axiosApi.get(`latest${apiKey}&base_currency=USD`);
    console.log(response.data);
  };

  return (
    <div>
      <Button onClick={changeHandler}>Do</Button>
    </div>
  );
};

export default Latest;