import { configureStore } from "@reduxjs/toolkit";
import transactionsReducer from "./TransactionSlice";
import budgetReducer from "./BudgetSlice";
import currencyApi from "./CurrencySlice";  // ✅ Import RTK Query API

export const store = configureStore({
  reducer: {
    transactions: transactionsReducer,
    budget: budgetReducer,
    [currencyApi.reducerPath]: currencyApi.reducer,  // ✅ Add RTK Query Reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(currencyApi.middleware),  // ✅ Add Middleware
});

