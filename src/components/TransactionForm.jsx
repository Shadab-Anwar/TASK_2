import { useState } from "react";
import { useDispatch } from "react-redux";
import { addTransaction } from "../redux/TransactionSlice";
import { useGetExchangeRatesQuery } from "../redux/CurrencySlice";

const TransactionForm = () => {
  const { data: exchangeRates, error, isLoading } = useGetExchangeRatesQuery();
  
  const [desc, setDesc] = useState("");
  const [amount, setAmount] = useState("");
  const [currency, setCurrency] = useState("USD");
  const [type, setType] = useState("income");
  const [category, setCategory] = useState("Food");

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    try {
      if (!amount || isNaN(amount) || amount <= 0) {
        alert("Please enter a valid amount.");
        return;
      }

      if (!exchangeRates || !exchangeRates.conversion_rates) {
        alert("Exchange rates are not available. Try again later.");
        return;
      }

      // Convert amount to USD
      const rate = exchangeRates.conversion_rates[currency] || 1;
      const convertedAmount = parseFloat(amount) / rate;

      dispatch(addTransaction({
        id: Date.now(),
        desc,
        amount: convertedAmount.toFixed(2),
        type,
        category,
        originalAmount: amount,
        originalCurrency: currency,
      }));

      // Reset Form
      setDesc("");
      setAmount("");
      setCurrency("USD");

    } catch (err) {
      console.error("Error adding transaction:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 rounded-lg shadow-md bg-gray-50 mb-6">
      <h2 className="text-xl font-bold mb-4">Add Transaction</h2>
      
      {isLoading && <p>Loading exchange rates...</p>}
      {error && <p className="text-red-500">Error fetching exchange rates.</p>}

      <input type="text" value={desc} onChange={(e) => setDesc(e.target.value)} placeholder="Description" required className="bg-gray-200 p-2 w-full mb-2 rounded-2xl" />
      <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Amount" required className="bg-gray-200 p-2 w-full mb-2 rounded-2xl" />
      
      {/* Currency Selection Dropdown */}
      <select value={currency} onChange={(e) => setCurrency(e.target.value)} className="bg-gray-200 p-2 w-full mb-2 rounded-2xl">
        {exchangeRates && Object.keys(exchangeRates.conversion_rates).map((cur) => (
          <option key={cur} value={cur}>{cur}</option>
        ))}
      </select>

      <select value={type} onChange={(e) => setType(e.target.value)} className="bg-gray-200 p-2 w-full mb-2 rounded-2xl">
        <option value="income">Income</option>
        <option value="expense">Expense</option>
      </select>

      <select value={category} onChange={(e) => setCategory(e.target.value)} className="bg-gray-200 p-2 w-full mb-2 rounded-2xl">
        <option value="Food">Food</option>
        <option value="Rent">Rent</option>
        <option value="Entertainment">Entertainment</option>
        <option value="Utilities">Utilities</option>
      </select>

      <button type="submit" className="bg-blue-200 text-black py-2 w-30 rounded-full hover:scale-105 transition-all"><b>Submit</b></button>
    </form>
  );
};

export default TransactionForm;


