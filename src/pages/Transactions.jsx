import TransactionForm from "../components/TransactionForm";
import TransactionsList from "../components/TransactionList";

const Transactions = () => {
  return (
    <div className="p-4 mt-20">


      {/* ✅ Show Add Transaction Form Here */}
      <TransactionForm />

      {/* ✅ Show Transaction List */}
      <TransactionsList />
    </div>
  );
};

export default Transactions;

