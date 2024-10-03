import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const RecordForm = () => {
  const [name, setName] = useState("");
  const [rate, setRate] = useState(0);
  const [currentBalance, setCurrentBalance] = useState(0);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Fetch the initial balance
  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const response = await axios.get("http://localhost:5050/balance");
        setCurrentBalance(response.data.balance);
      } catch (error) {
      }
    };

    fetchBalance();
  }, []); // Runs once on mount

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:5050/record", {
        name,
        rate,
        date: new Date().toISOString(), // Add current date as ISO string
      });

      // Update current balance with the response from the API
      setCurrentBalance(response.data.balance);
      // Clear form fields
      setName("");
      setRate(0);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative">
      {/* Background Animation */}
      <div className="background-animation"></div>

      <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-xl shadow-lg ring-1 ring-gray-900/5 transition-transform transform hover:scale-105 duration-300 z-10">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold text-gray-800">📄 Add Record</h2>
          <div className="flex items-center">
            <h3 className="text-lg font-semibold">
              Balance: ₹ {currentBalance.toFixed(2)} 
            </h3>
            <button
              onClick={() => navigate('/balance')}
              className="ml-2 text-green-500 text-lg font-bold"
            >
              +
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Name:</label>
            <input
              type="text"
              className="mt-1 block w-full border border-gray-300 p-2 rounded"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Rate:</label>
            <input
              type="number"
              className="mt-1 block w-full border border-gray-300 p-2 rounded"
              value={rate}
              onChange={(e) => setRate(parseFloat(e.target.value))}
              required
            />
          </div>

          <button
            type="submit"
            className={`w-full bg-green-500 text-white rounded p-2 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={loading}
          >
            {loading ? "Adding..." : "Add Record"}
          </button>
        </form>
        
        <button
          onClick={() => navigate('/record')}
          className="mt-4 w-full bg-blue-500 text-white rounded p-2"
        >
          Go to Records
        </button>
      </div>
    </div>
  );
};

export default RecordForm;
