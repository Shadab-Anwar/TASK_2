import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setBudget, updateSpent } from "../redux/BudgetSlice";
import BudgetGoals from "../components/BudgetGoals";

const Budget = () => {
  const dispatch = useDispatch();
  const budget = useSelector((state) => state.budget.budget);
  const spent = useSelector((state) => state.budget.spent);
  const [newBudget, setNewBudget] = useState("");

  const handleSetBudget = () => {
    dispatch(setBudget(parseFloat(newBudget)));
    setNewBudget("");
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold">Budget Management</h2>
      <BudgetGoals />  {/* ✅ Ensure this component is included */}
    </div>
  );
};

export default Budget;












