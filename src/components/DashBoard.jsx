import { useSelector } from "react-redux";
import { Bar } from "react-chartjs-2";

const Dashboard = () => {
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
    <div>
      <h2>Dashboard</h2>
      <p>Total Income: ${income}</p>
      <p>Total Expenses: ${expenses}</p>
      <Bar data={data} />
    </div>
  );
};

export default Dashboard;
