import { useSelector } from "react-redux";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// ✅ Register necessary Chart.js components
ChartJS.register(BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

const Home = () => {
  const transactions = useSelector((state) => state.transactions.transactions);

  const income = transactions
    .filter((txn) => txn.type === "income")
    .reduce((sum, txn) => sum + Number(txn.amount), 0);

  const expenses = transactions
    .filter((txn) => txn.type === "expense")
    .reduce((sum, txn) => sum + Number(txn.amount), 0);

  const data = {
    labels: ["Income", "Expenses"],
    datasets: [{ data: [income, expenses], backgroundColor: ["#4CAF50", "#F44336"] }],
  };

  return (
    <div className="p-4 mt-20">
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="p-4 rounded-lg shadow-md bg-green-100 text-center hover:scale-105 transition-all">
          <h3 className="text-lg font-bold">${income.toFixed(2)}</h3>
          <p><b>Total Income</b></p>
        </div>
        <div className="p-4 rounded-lg shadow-md bg-red-100 text-center hover:scale-105 transition-all">
          <h3 className="text-lg font-bold">${expenses.toFixed(2)}</h3>
          <p><b>Total Expenses</b></p>
        </div>
        <div className="p-4 rounded-lg shadow-md bg-blue-100 text-center hover:scale-105 transition-all">
          <h3 className="text-lg font-bold">${(income - expenses).toFixed(2)}</h3>
          <p><b>Savings</b></p>
        </div>
      </div>
      <div className="bg-gray-100 p-4 rounded-2xl shadow-md hover:scale-105 transition-all">
      <Bar data={data} />
      </div>
    </div>
  );
};

export default Home;

