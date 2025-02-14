import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  budget: 0,
  spent: 0,
  budgetGoals: {},
};

const budgetSlice = createSlice({
  name: "budget",
  initialState,
  reducers: {
    setBudget: (state, action) => {
      state.budget = Number(action.payload);
    },
    updateSpent: (state, action) => {
      state.spent = action.payload; // Set spent directly
    },
    
    setBudgetGoal: (state, action) => {
      const { category, goalAmount } = action.payload;
      state.budgetGoals[category] = Number(goalAmount);
    },
  },
});

export const { setBudget, updateSpent, setBudgetGoal } = budgetSlice.actions;
export default budgetSlice.reducer;



