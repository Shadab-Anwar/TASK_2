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
    .reduce((sum, txn) => sum + txn.amount, 0);

  const expenses = transactions
    .filter((txn) => txn.type === "expense")
    .reduce((sum, txn) => sum + txn.amount, 0);

  const data = {
    labels: ["Income", "Expenses"],
    datasets: [{ data: [income, expenses], backgroundColor: ["green", "red"] }],
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold">Dashboard</h2>
      <p>Total Income: ${income}</p>
      <p>Total Expenses: ${expenses}</p>
      <p>Savings: ${income - expenses}</p>
      <Bar data={data} />
    </div>
  );
};

export default Home;

