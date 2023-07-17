import React, {useState} from 'react';
import './App.css';
import {Box, Button, TextField} from "@mui/material";
import axiosApi from "./axiosApi";

function App() {
  const [inputState, setInputState] = useState<string>('')
  const [baseCurrency, setBaseCurrency] = useState<string>('');
  const [currencies, setCurrencies] = useState<string>('');
  const apiKey = '?apikey=fca_live_InVUhbOymdH2ROZYTc9NSXga82J5CeVXC6L1J41e';

  const a = `&currencies=EUR%2CUSD%2CCAD&base_currency=BGN`;

  const changeHandler = async () => {
    const response = await axiosApi.get(`latest${apiKey}&currencies=EUR%2CRUB%2CCAD&base_currency=USD`);
    console.log(response.data);
  };

  const deleteNumbers = () => {
    const result = inputState.replace(/[0-9]/g, "");
    console.log(result);
  }

  const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInputState(value);
  };

  return (
    <div className="App">
      Hello World
      <Button onClick={deleteNumbers}>Delete numbers</Button>
      <Button onClick={changeHandler}>Give me rub</Button>
      <Box
        style={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <TextField
          placeholder="100 usd in rub"
          label="enter currency"
          variant="outlined"
          value={inputState}
          onChange={inputChangeHandler}
          sx={{width: "400px", textAlign: "center"}}
        />
      </Box>
    </div>
  );
}

export default App;
