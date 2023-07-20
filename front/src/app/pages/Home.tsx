import React, {useState} from 'react';
import {Box, Button, Container, Grid, Link, TextField} from "@mui/material";
import axiosApi from "../../axiosApi";
import { apiKey } from "../../constants";

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
      const getObjectWithValue = response.data[Object.keys(response.data)[0]];
      const value = (getObjectWithValue[Object.keys(getObjectWithValue)[0]] * sum).toFixed(2);
      setConverted(`${sum} ${firstCurr} = ${value} ${secondCurr}`);
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
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Link href="/latest">See latest currencies</Link>
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