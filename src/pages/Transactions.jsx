import TransactionForm from "../components/TransactionForm";
import TransactionsList from "../components/TransactionList";

const Transactions = () => {
  return (
    <div className="p-4">
      <h2 className="text-xl font-bold">Transactions</h2>

      {/* ✅ Show Add Transaction Form Here */}
      <TransactionForm />

      {/* ✅ Show Transaction List */}
      <TransactionsList />
    </div>
  );
};

export default Transactions;

