import { useSelector, useDispatch } from "react-redux";
import { deleteTransaction } from "../redux/TransactionSlice";

const TransactionsList = () => {
  const transactions = useSelector((state) => state.transactions.transactions);
  const dispatch = useDispatch();

  console.log("Transactions Data:", transactions); // ✅ Debugging Log

  return (
    <div className="p-4 border rounded-lg shadow-md bg-white">
      <h2 className="text-xl font-bold mb-4">Transaction History</h2>

      {transactions.length === 0 ? (
        <p className="text-gray-500">No transactions recorded.</p>
      ) : (
        <ul>
          {transactions.map((txn) => {
            // ✅ Ensure amount is a number
            const amount = parseFloat(txn.amount) || 0;
            const originalAmount = parseFloat(txn.originalAmount) || 0;

            return (
              <li key={txn.id} className="flex justify-between items-center border p-3 my-2 rounded">
                <div>
                  <p className="font-bold">
                    {txn.desc} - ${amount.toFixed(2)} USD  
                    <span className={txn.type === "income" ? "text-green-500" : "text-red-500"}>
                      {" "}({txn.type})
                    </span>
                  </p>
                  <p className="text-sm text-gray-600">
                    💰 Original: {originalAmount.toFixed(2)} {txn.originalCurrency ? txn.originalCurrency : ""}
                  </p>
                  <p className="text-sm text-gray-600">📌 Category: {txn.category ? txn.category : "Unknown"}</p>
                </div>

                <button
                  onClick={() => dispatch(deleteTransaction(txn.id))}
                  className="bg-red-500 text-white px-3 py-1 rounded"
                >
                  ❌ Delete
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default TransactionsList;




