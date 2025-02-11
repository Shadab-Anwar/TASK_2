import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Home from "./pages/Home";
import Transactions from "./pages/Transactions";
import Budget from "./pages/Budget";
import CurrencyConverter from "./components/CurrencyConverter";
import ExpenseInsights from "./components/ExpenseInsights";  // ✅ Import Expense Insights

function App() {
  return (
    <Router>
      <div className="p-6 max-w-4xl mx-auto">
        {/* ✅ Navigation Menu */}
        <nav className="flex justify-around bg-blue-500 text-white p-3 rounded-lg mb-6">
          <Link to="/" className="font-bold">Dashboard</Link>
          <Link to="/transactions" className="font-bold">Transactions</Link>
          <Link to="/budget" className="font-bold">Budget</Link>
        </nav>

        {/* ✅ Define Routes */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/transactions" element={<Transactions />} />
          <Route path="/budget" element={<Budget />} />
        </Routes>

        {/* ✅ Currency Converter (Always Visible) */}
        <div className="mt-6">
          <h2 className="text-xl font-bold mb-2">Live Currency Exchange Rates</h2>
          <CurrencyConverter />
        </div>

        {/* ✅ Expense Insights Section (Always Visible) */}
        <ExpenseInsights />  
      </div>
    </Router>
  );
}

export default App;


