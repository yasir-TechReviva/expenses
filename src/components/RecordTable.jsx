import { useState, useEffect } from "react";
import axios from "axios";

const RecordsTable = () => {
  const [records, setRecords] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  // Fetch records from the API when the component loads
  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const response = await axios.get("http://localhost:5050/record"); // Adjust the URL as necessary
        setRecords(response.data);
      } catch (error) {
        setErrorMessage("Error fetching records");
      }
    };

    fetchRecords();
  }, []);

  return (
    <div className="max-w-3xl mx-auto p-4 bg-white rounded shadow-md">
      <h2 className="text-xl font-semibold mb-4">Records</h2>

      {/* Display error message if there's an error */}
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}

      {/* Table for displaying records */}
      <table className="min-w-full border-collapse border border-gray-200">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-200 px-4 py-2 text-left">Name</th>
            <th className="border border-gray-200 px-4 py-2 text-left">Rate</th>
            <th className="border border-gray-200 px-4 py-2 text-left">Date</th>
          </tr>
        </thead>
        <tbody>
          {records.map((record) => (
            <tr key={record._id} className="hover:bg-gray-50">
              <td className="border border-gray-200 px-4 py-2">{record.name}</td>
              <td className="border border-gray-200 px-4 py-2">{record.rate}</td>
              <td className="border border-gray-200 px-4 py-2">{new Date(record.date).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RecordsTable;
