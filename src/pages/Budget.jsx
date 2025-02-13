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
    if (!newBudget || isNaN(newBudget) || newBudget <= 0) {
      alert("Please enter a valid budget amount");
      return;
    }
    dispatch(setBudget(parseFloat(newBudget)));
    setNewBudget("");
  };

  return (
    <div className="p-4 mt-20 ">
      
      <div className="bg-gray-50 p-4 rounded-2xl shadow-md mb-10">
      <h2 className="text-xl font-bold mb-4">Budget Overview</h2>
      <p><b>Total Budget:</b> ${budget}</p>
      <p><b>Spent:</b> ${spent}</p>
      <p><b>Remaining:</b> ${budget - spent}</p>
     

      {/* Input for Budget */}
      <div className="mt-4">
        <input
          type="number"
          value={newBudget}
          onChange={(e) => setNewBudget(e.target.value)}
          placeholder="Enter Budget"
          className="p-2 bg-gray-200 rounded-2xl"
        />
        <button
          onClick={handleSetBudget}
          className="bg-blue-400 text-white px-4 py-2 rounded-full ml-2 hover:scale-105 transition"
        >
          <b>
          Set Budget
          </b>
        </button>
      </div>
      </div>

      {/* Budget Goals Component */}
      <BudgetGoals />
    </div>
  );
};

export default Budget;












