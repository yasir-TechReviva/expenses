import React, { useEffect, useState } from "react";

const Balance = () => {
  const [balance, setBalance] = useState(0);
  const [amount, setAmount] = useState(0);

  // Fetch the current balance from the server
  const fetchBalance = async () => {
    try {
      const response = await fetch("http://localhost:5050/balance"); // Adjust your server URL
      const data = await response.json();
      setBalance(data.balance);
    } catch (error) {
      console.error("Error fetching balance:", error);
    }
  };

  // Function to handle adding balance
  const handleAddBalance = async () => {
    try {
      const response = await fetch("http://localhost:5050/balance", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ amount: parseFloat(amount) }),
      });

      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(errorResponse.message || "Failed to add balance");
      }

      const data = await response.json();
      setBalance(data.balance);
      setAmount(0); // Reset input field
    } catch (error) {
      console.error("Error adding balance:", error);
    }
  };

  useEffect(() => {
    fetchBalance();
  }, []);

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 mt-6">
      <h1 className="text-2xl font-bold mb-4">Balance: <span className="text-green-600">${balance.toFixed(2)}</span></h1>
      <div className="flex items-center">
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Enter amount to add"
          className="border border-gray-300 rounded-md p-2 mr-2 flex-grow"
        />
        <button
          onClick={handleAddBalance}
          className="bg-green-600 text-white rounded-md px-4 py-2 hover:bg-green-700 transition duration-200"
        >
          Add Balance
        </button>
      </div>
    </div>
  );
};

export default Balance;
