import { useSelector } from "react-redux";

const ExpenseInsights = () => {
  const transactions = useSelector((state) => state.transactions.transactions);

  // 🔹 Calculate Spending by Category
  const categorySpending = transactions.reduce((acc, txn) => {
    if (txn.type === "expense") {
      if (!acc[txn.category]) acc[txn.category] = 0;
      acc[txn.category] += parseFloat(txn.amount) || 0;  // Ensure valid number
    }
    return acc;
  }, {});

  // 🔹 Find the Highest Spending Category
  let highestCategory = null;
  let highestAmount = 0;

  for (let [category, amount] of Object.entries(categorySpending)) {
    if (amount > highestAmount) {
      highestAmount = amount;
      highestCategory = category;
    }
  }

  highestAmount = parseFloat(highestAmount) || 0;  // Ensure it's a number

  return (
    <div className="p-4 rounded-lg shadow-md bg-red-100 mt-6">
      <h2 className="text-xl font-bold mb-4">Expense Insights</h2>

      {highestCategory ? (
        <p className="text-gray-700">
          💸 <strong>Highest Spending:</strong> {highestCategory} (${highestAmount.toFixed(2)})  
        </p>
      ) : (
        <p className="text-gray-500">No expense data available.</p>
      )}

      {/* 🔹 Suggestion Based on Spending */}
      {highestCategory && highestAmount > 200 ? (
        <p className="text-red-500">
          You are spending a lot on {highestCategory}. Consider budgeting!
        </p>
      ) : highestCategory ? (
        <p className="text-green-500">Your spending is balanced!</p>
      ) : null}
    </div>
  );
};

export default ExpenseInsights;

