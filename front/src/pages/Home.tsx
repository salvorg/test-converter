import React, {useState} from 'react';
import {Box, Button, Container, Grid, TextField} from "@mui/material";
import axiosApi from "../axiosApi";
import { apiKey } from "../constants";
import {ApiConverted} from "../types";
import {Link} from "react-router-dom";

const Home = () => {
  const [inputState, setInputState] = useState<string>('');
  const [converted, setConverted] = useState<string | null>();
  const [error, setError] = useState<string | null>(null);

  const convertHandler = async () => {
    try {
      setError(null);
      const sum = parseInt(inputState);
      const withoutNumbers = inputState.replace(/[0-9]/g, "");
      const firstCurr = withoutNumbers.slice(1, 4).toUpperCase();
      const secondCurr = withoutNumbers.slice(8, 11).toUpperCase();
      const response = await axiosApi.get(`latest${apiKey}&currencies=${secondCurr}&base_currency=${firstCurr}`);
      const data: ApiConverted = response.data;
      const value = Object.values(data.data);
      setConverted(`${sum} ${firstCurr} = ${(value[0] * sum).toFixed(2)} ${secondCurr}`);
    } catch (e) {
      setError('Wrong format or wrong currency. Try again');
    }
  };

  const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInputState(value);
  };

  return (
    <Container maxWidth="xl">
        <Box
          style={{
            marginTop: '20px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Link to="/latest">See latest currencies</Link>
          <TextField
            placeholder="100 usd in rub"
            label="enter currency"
            variant="outlined"
            value={inputState}
            onChange={inputChangeHandler}
            sx={{width: "400px", textAlign: "center", mt: 5}}
          />
          <Button onClick={convertHandler}>convert</Button>
          <Grid item sx={{ mt: 2 }}>
            {error ? (<span style={{ color: "red" }}>{error}</span>) : converted}
          </Grid>
        </Box>
    </Container>
  );
};

export default Home;