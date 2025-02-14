import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateSpent, setBudgetGoal } from "../redux/BudgetSlice";

const BudgetGoals = () => {
  const dispatch = useDispatch();
  const [category, setCategory] = useState("Food");
  const [goalAmount, setGoalAmount] = useState("");

  const transactions = useSelector((state) => state.transactions?.transactions || []);
  const budgetGoals = useSelector((state) => state.budget.budgetGoals);
  const totalBudget = useSelector((state) => state.budget.budget);
  const spent = useSelector((state) => Number(state.budget.spent) || 0);

  // Calculate spending for each category
  const categorySpending = transactions.reduce((acc, txn) => {
    if (txn.type !== "income") { // Exclude income transactions
      if (!acc[txn.category]) acc[txn.category] = 0;
      acc[txn.category] += Number(txn.amount); // Convert to number before adding
    }
    return acc;
  }, {});
  

  // Update `spent` in Redux whenever transactions change
  useEffect(() => {
    const totalSpent = transactions
      .filter((txn) => txn.type !== "income") // Exclude income transactions
      .reduce((sum, txn) => sum + Number(txn.amount), 0);
  
    dispatch(updateSpent(totalSpent)); // Set spent correctly
  }, [transactions, dispatch]);
  
  

  const handleGoalSubmit = (e) => {
    e.preventDefault();
    const numericGoal = parseFloat(goalAmount);
    if (!goalAmount || isNaN(numericGoal) || numericGoal <= 0) {
      alert("Enter a valid goal amount");
      return;
    }

    dispatch(setBudgetGoal({ category, goalAmount: numericGoal })); // Store in Redux
    setGoalAmount("");
  };

  return (
    <div className="p-4 rounded-lg shadow-md bg-gray-50 flex flex-col">
      <h2 className="text-xl font-bold mb-4">Budget Goals</h2>

      {/* Form to Set Budget Goals */}
      <form onSubmit={handleGoalSubmit} className="mb-4">
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="p-2 rounded-2xl mr-2 bg-gray-200"
        >
          <option value="Food">Food</option>
          <option value="Rent">Rent</option>
          <option value="Entertainment">Entertainment</option>
          <option value="Utilities">Utilities</option>
        </select>
        <input
          type="number"
          value={goalAmount}
          onChange={(e) => setGoalAmount(e.target.value)}
          placeholder="Set Goal Amount"
          required
          className="p-2 rounded-2xl mr-2 bg-gray-200 mt-2"
        />
        <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded-full hover:scale-105 transition-all my-2">
          <b>Submit</b>
        </button>
      </form>

      {/* Display Budget Goals & Progress */}
      <div>
        {Object.keys(budgetGoals).map((cat) => (
          <div key={cat} className="p-3 rounded-2xl my-2 bg-gray-200">
            <p className="font-bold">{cat}</p>
            <p>Goal: ${budgetGoals[cat]}</p>
            <p>Spent: ${categorySpending[cat] || 0}</p>
            <p>Remaining: ${budgetGoals[cat] - (categorySpending[cat] || 0)}</p>

            {categorySpending[cat] > budgetGoals[cat] && (
              <p className="text-red-400 font-bold">You have exceeded your budget for {cat}!</p>
            )}
          </div>
        ))}
      </div>

      
    </div>
  );
};

export default BudgetGoals;

