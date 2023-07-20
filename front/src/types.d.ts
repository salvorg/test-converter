export interface Data {
  [key: string]: number;
}

export interface ApiConverted {
  data: Data;
}

export interface ApiCurrency {
  code: string;
  decimal_digits: number;
  name: string;
  name_plural: string;
  rounding: number;
  symbol: string;
  symbol_native: string;
}

export interface ApiCurrenciesData {
  [key: string]: ApiCurrency;
}