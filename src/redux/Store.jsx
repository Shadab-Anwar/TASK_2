import { configureStore } from "@reduxjs/toolkit";
import transactionsReducer from "./TransactionSlice";
import budgetReducer from "./BudgetSlice";
import currencyApi from "./CurrencySlice";  

export const store = configureStore({
  reducer: {
    transactions: transactionsReducer,
    budget: budgetReducer,
    [currencyApi.reducerPath]: currencyApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(currencyApi.middleware), 
});

