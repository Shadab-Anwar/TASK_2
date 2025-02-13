import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateSpent } from "../redux/BudgetSlice";

const BudgetGoals = () => {
  const dispatch = useDispatch();
  const [category, setCategory] = useState("Food");
  const [goalAmount, setGoalAmount] = useState("");
  const [budgetGoals, setBudgetGoals] = useState({});

  const transactions = useSelector((state) => state.transactions?.transactions || []);
  const totalBudget = useSelector((state) => state.budget.budget);
  const spent = useSelector((state) => state.budget.spent);

  // Calculate spending for each category
  const categorySpending = transactions.reduce((acc, txn) => {
    if (!acc[txn.category]) acc[txn.category] = 0;
    acc[txn.category] += txn.amount;
    return acc;
  }, {});

  const handleGoalSubmit = (e) => {
    e.preventDefault();
    if (!goalAmount || isNaN(goalAmount) || goalAmount <= 0) {
      alert("Enter a valid goal amount");
      return;
    }
    setBudgetGoals((prevGoals) => ({
      ...prevGoals,
      [category]: parseFloat(goalAmount),
    }));
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

      {/* Overall Remaining Budget */}
      <div className="mt-4">
        <h3 className="text-lg font-bold">Overall Budget</h3>
        <p><b>Total Budget:</b> ${totalBudget}</p>
        <p><b>Total Spent:</b> ${spent}</p>
        <p><b>Remaining Budget:</b> ${totalBudget - spent}</p>
      </div>
    </div>
  );
};

export default BudgetGoals;
