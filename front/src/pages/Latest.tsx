import React, {useEffect, useState} from 'react';
import {
  FormControl,
  FormHelperText, Grid,
  InputLabel,
  List,
  ListItem,
  MenuItem,
  Select,
  SelectChangeEvent, Typography
} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../app/hooks";
import {selectCurrencies, selectExchangeRates} from "../features/currencies/currenciesSlice";
import {fetchAll, fetchExchangeRates} from "../features/currencies/currenciesThunks";
import dayjs from 'dayjs'

const Latest = () => {
  const dispatch = useAppDispatch();
  const currencies = useAppSelector(selectCurrencies);
  const rates = useAppSelector(selectExchangeRates);
  const [baseCurrency, setBaseCurrency] = useState<string>('USD');
  const [today, setToday] = useState<Date>(new Date());

  useEffect(() => {
    dispatch(fetchAll());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchExchangeRates(baseCurrency));
  }, [dispatch, baseCurrency]);

  const handleChange = async (event: SelectChangeEvent) => {
    setBaseCurrency(event.target.value);
    setToday(new Date());
  };

  return (
    <Grid container flexDirection={"column"} alignItems={"center"} sx={{ mt: 5 }}>
      <Typography variant="h4">Exchange Rates: </Typography>
      <FormControl sx={{ mt: 4, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-helper-label">Choose currency</InputLabel>
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          value={baseCurrency}
          label="Choose currency"
          onChange={handleChange}
          sx={{minWidth: "200px"}}
        >
          {currencies ? currencies.map((el) => (
            <MenuItem key={el.code} value={el.code}>{el.code}: {el.name_plural}</MenuItem>
          )) : null}
        </Select>
        <FormHelperText>actual rates for {dayjs(today).format('D/M/YYYY')}</FormHelperText>
      </FormControl>
      <List>
        {rates ? rates.map((el) => <ListItem key={el.code}>{el.code} - {el.value.toFixed(2)}</ListItem>) : null}
      </List>
    </Grid>
  );
};

export default Latest;