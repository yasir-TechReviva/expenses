// import { useState, useEffect } from "react";
// import axios from "axios";

// function BalanceForm() {
//   const [balance, setBalance] = useState(null);
//   const [amount, setAmount] = useState("");
//   const [errorMessage, setErrorMessage] = useState("");
//   const [successMessage, setSuccessMessage] = useState("");

//   // Fetch the current balance when the component loads
//   useEffect(() => {
//     async function fetchBalance() {
//       try {
//         const response = await axios.get("http://localhost:5050/balance");
//         setBalance(response.data.balance);
//       } catch (error) {
//         setErrorMessage("Error fetching balance");
//       }
//     }
//     fetchBalance();
//   }, []);

//   // Update the balance when the form is submitted
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Simple client-side validation
//     const parsedAmount = parseFloat(amount);
//     if (isNaN(parsedAmount)) {
//       setErrorMessage("Please enter a valid number");
//       return;
//     }

//     try {
//       const response = await axios.post("http://localhost:5050/balance", { amount: parsedAmount });
//       setBalance(response.data.balance);
//       setAmount(""); // Clear the input field
//       setSuccessMessage("Balance updated successfully!");
//       setErrorMessage("");
//     } catch (error) {
//       setErrorMessage("Error updating balance");
//       setSuccessMessage("");
//     }
//   };

//   return (
//     <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-xl shadow-lg ring-1 ring-gray-900/5 text-gray-700 transform hover:scale-105 transition-transform duration-300">
      
//       {/* Display current balance */}
//       <div className="mb-6 text-center">
//         <h3 className="text-2xl font-bold tracking-wide text-gray-800">💰 Current Balance</h3>
//         {balance !== null ? (
//           <p className="text-4xl font-extrabold mt-2 text-green-500">₹.{balance}</p>
//         ) : (
//           <p className="text-lg text-gray-500">Loading...</p>
//         )}
//       </div>

//       {/* Update balance form */}
//       <form onSubmit={handleSubmit} className="space-y-6">
//         <div className="relative">
//           <label htmlFor="amount" className="block text-lg font-medium text-gray-600">
//             Amount to Add:
//           </label>
//           <input
//             type="number"
//             id="amount"
//             name="amount"
//             value={amount}
//             onChange={(e) => setAmount(e.target.value)}
//             className="mt-2 p-3 w-full bg-gray-50 border border-gray-300 rounded-lg shadow-inner focus:ring-4 focus:ring-blue-300 focus:outline-none text-gray-700"
//             placeholder="Enter amount"
//           />
//         </div>

//         {/* Display error or success messages */}
//         {errorMessage && <p className="text-red-600 font-semibold text-sm">{errorMessage}</p>}
//         {successMessage && <p className="text-green-600 font-semibold text-sm">{successMessage}</p>}

//         <button
//           type="submit"
//           className="w-full py-3 bg-gradient-to-r from-purple-500 to-indigo-600 text-lg font-bold text-white rounded-lg shadow-md transform hover:scale-105 hover:shadow-xl transition-all duration-300"
//         >
//           Update Balance
//         </button>
//       </form>
//     </div>
//   );
// }

// export default BalanceForm;

import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate

function BalanceForm() {
  const [balance, setBalance] = useState(null);
  const [amount, setAmount] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate(); // Initialize useNavigate

  // Fetch the current balance when the component loads
  useEffect(() => {
    async function fetchBalance() {
      try {
        const response = await axios.get("http://localhost:5050/balance");
        setBalance(response.data.balance);
      } catch (error) {
        setErrorMessage("Error fetching balance");
      }
    }
    fetchBalance();
  }, []);

  // Update the balance when the form is submitted
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Simple client-side validation
    const parsedAmount = parseFloat(amount);
    if (isNaN(parsedAmount)) {
      setErrorMessage("Please enter a valid number");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5050/balance", { amount: parsedAmount });
      setBalance(response.data.balance);
      setAmount(""); // Clear the input field
      setSuccessMessage("Balance updated successfully!");
      setErrorMessage("");

      // Redirect to default route after successful update
      setTimeout(() => {
        navigate("/"); // Redirect to default page
      }, 1000); // Adjust delay as needed

    } catch (error) {
      setErrorMessage("Error updating balance");
      setSuccessMessage("");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-xl shadow-lg ring-1 ring-gray-900/5 text-gray-700 transform hover:scale-105 transition-transform duration-300">
      
      {/* Display current balance */}
      <div className="mb-6 text-center">
        <h3 className="text-2xl font-bold tracking-wide text-gray-800">💰 Current Balance</h3>
        {balance !== null ? (
          <p className="text-4xl font-extrabold mt-2 text-green-500">₹{balance}</p>
        ) : (
          <p className="text-lg text-gray-500">Loading...</p>
        )}
      </div>

      {/* Update balance form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="relative">
          <label htmlFor="amount" className="block text-lg font-medium text-gray-600">
            Amount to Add:
          </label>
          <input
            type="number"
            id="amount"
            name="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="mt-2 p-3 w-full bg-gray-50 border border-gray-300 rounded-lg shadow-inner focus:ring-4 focus:ring-blue-300 focus:outline-none text-gray-700"
            placeholder="Enter amount"
          />
        </div>

        {/* Display error or success messages */}
        {errorMessage && <p className="text-red-600 font-semibold text-sm">{errorMessage}</p>}
        {successMessage && <p className="text-green-600 font-semibold text-sm">{successMessage}</p>}

        <button
          type="submit"
          className="w-full py-3 bg-gradient-to-r from-purple-500 to-indigo-600 text-lg font-bold text-white rounded-lg shadow-md transform hover:scale-105 hover:shadow-xl transition-all duration-300"
        >
          Update Balance
        </button>
      </form>
    </div>
  );
}

export default BalanceForm;
