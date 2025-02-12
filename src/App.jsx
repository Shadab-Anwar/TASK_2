import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Home from "./pages/Home";
import Transactions from "./pages/Transactions";
import Budget from "./pages/Budget";
import CurrencyConverter from "./components/CurrencyConverter";
import ExpenseInsights from "./components/ExpenseInsights";  // ✅ Import Expense Insights
import Navbar from "./UI/Navbar";

function App() {
  return (
    <Router>
      <Navbar/>
      <div className="p-6 max-w-4xl mx-auto">
        

        {/* ✅ Define Routes */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/transactions" element={<Transactions />} />
          <Route path="/budget" element={<Budget />} />
        </Routes>

        {/* ✅ Currency Converter (Always Visible) */}
        <div className="mt-6">
          <CurrencyConverter />
        </div>

        {/* ✅ Expense Insights Section (Always Visible) */}
        <ExpenseInsights />  
      </div>
    </Router>
  );
}

export default App;


