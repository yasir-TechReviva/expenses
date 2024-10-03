// import { useState } from "react";
// import axios from "axios";

// const RecordsForm = () => {
//   const [name, setName] = useState("");
//   const [rate, setRate] = useState("");
//   const [errorMessage, setErrorMessage] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [balance, setBalance] = useState(0);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setErrorMessage(""); // Reset error message

//     // Get current date
//     const currentDate = new Date().toISOString();

//     // Create the record object
//     const recordData = {
//       name,
//       rate: parseFloat(rate), // Ensure rate is a number
//       date: currentDate,
//     };

//     setLoading(true); // Start loading animation

//     try {
//       const response = await axios.post("http://localhost:5050/record", recordData);
//       setBalance(response.data.balance);
//       // Reset form fields
//       setName("");
//       setRate("");
//     } catch (error) {
//       setErrorMessage(error.response ? error.response.data : "Error adding record");
//     } finally {
//       setLoading(false); // Stop loading animation
//     }
//   };

//   return (
//     <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-lg ring-1 ring-gray-900/5">
//       <h2 className="text-2xl font-semibold mb-4 text-gray-800">📝 Add New Record</h2>

//       {/* Display loading animation */}
//       {loading && (
//         <div className="flex justify-center">
//           <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
//         </div>
//       )}

//       {/* Display error message if there's an error */}
//       {errorMessage && <p className="text-red-500 font-semibold">{errorMessage}</p>}

//       <form onSubmit={handleSubmit} className="space-y-4">
//         <div>
//           <label className="block text-sm font-medium text-gray-700">Name</label>
//           <input
//             type="text"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             required
//             className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
//           />
//         </div>
//         <div>
//           <label className="block text-sm font-medium text-gray-700">Rate</label>
//           <input
//             type="number"
//             value={rate}
//             onChange={(e) => setRate(e.target.value)}
//             required
//             className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
//           />
//         </div>

//         <button
//           type="submit"
//           className="w-full p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-200"
//         >
//           Add Record
//         </button>
//       </form>

//       {/* Display current balance */}
//       {balance > 0 && (
//         <div className="mt-4 text-green-600 font-medium">
//           Remaining Balance: <span className="font-bold">${balance.toFixed(2)}</span>
//         </div>
//       )}
//     </div>
//   );
// };

// export default RecordsForm;
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const RecordsForm = () => {
  const [name, setName] = useState("");
  const [rate, setRate] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [balance, setBalance] = useState(0);
  const navigate = useNavigate(); // Initialize useNavigate hook

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(""); // Reset error message

    // Get current date
    const currentDate = new Date().toISOString();

    // Create the record object
    const recordData = {
      name,
      rate: parseFloat(rate), // Ensure rate is a number
      date: currentDate,
    };

    setLoading(true); // Start loading animation

    try {
      const response = await axios.post("http://localhost:5050/record", recordData);
      setBalance(response.data.balance);
      // Reset form fields
      setName("");
      setRate("");
    } catch (error) {
      setErrorMessage(error.response ? error.response.data : "Error adding record");
    } finally {
      setLoading(false); // Stop loading animation
    }
  };

  const handleGoToRecords = () => {
    navigate("/record"); // Redirect to the records page using useNavigate
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-lg ring-1 ring-gray-900/5">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">📝 Add New Record</h2>

      {/* Display loading animation */}
      {loading && (
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        </div>
      )}

      {/* Display error message if there's an error */}
      {errorMessage && <p className="text-red-500 font-semibold">{errorMessage}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Rate</label>
          <input
            type="number"
            value={rate}
            onChange={(e) => setRate(e.target.value)}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          className="w-full p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-200"
        >
          Add Record
        </button>
      </form>

      {/* Display current balance */}
      {balance > 0 && (
        <div className="mt-4 text-green-600 font-medium">
          Remaining Balance: <span className="font-bold">${balance.toFixed(2)}</span>
        </div>
      )}

      {/* Button to go to records page */}
      <div className="mt-6">
        <button
          onClick={handleGoToRecords}
          className="w-full p-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition duration-200"
        >
          Go to Records
        </button>
      </div>
    </div>
  );
};

export default RecordsForm;
