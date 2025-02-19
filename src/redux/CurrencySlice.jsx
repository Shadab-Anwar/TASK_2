import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const API_KEY = "e3a32b15f677108a8391c90b"; 

export const currencyApi = createApi({
  reducerPath: "currencyApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://v6.exchangerate-api.com/v6/" }),
  endpoints: (builder) => ({
    getExchangeRates: builder.query({
      query: () => `${API_KEY}/latest/USD`, 
    }),
  }),
});


export const { useGetExchangeRatesQuery } = currencyApi;
export default currencyApi;




