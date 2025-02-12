import { useGetExchangeRatesQuery } from "../redux/CurrencySlice";

const CurrencyConverter = () => {
  const { data, error, isLoading } = useGetExchangeRatesQuery();

  if (isLoading) return <p>Loading exchange rates...</p>;
  if (error) return <p className="text-red-500">Error fetching exchange rates.</p>;

  return (
    <div className="p-4  rounded-lg shadow-md bg-green-100">
      <h2 className="text-xl font-bold mb-4 ">Live Currency Exchange Rates</h2>
      <ul>
        {data ? Object.entries(data.conversion_rates).slice(0, 5).map(([currency, rate]) => (
          <li key={currency}>
            1 USD = {rate} {currency}
          </li>
        )) : <p>No data available</p>}
      </ul>
    </div>
  );
};

export default CurrencyConverter;


