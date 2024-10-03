import { useState, useEffect } from "react";
import axios from "axios";
import html2pdf from "html2pdf.js"; // Import html2pdf

const RecordsTable = () => {
  const [records, setRecords] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(10); // Number of records per page

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

  // Pagination logic
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = records.slice(indexOfFirstRecord, indexOfLastRecord);
  const totalPages = Math.ceil(records.length / recordsPerPage);

  // Calculate total rate for the current page
  const totalRate = currentRecords.reduce((acc, record) => acc + record.rate, 0);

  // Function to download the current records as a PDF
  const downloadPDF = () => {
    const element = document.getElementById("records-table"); // Get the table element
    const opt = {
      margin: 1,
      filename: 'records.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };

    // Use html2pdf to generate PDF
    html2pdf().from(element).set(opt).save();
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-lg ring-1 ring-gray-900/5 transition-transform transform hover:scale-105 duration-300">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">📋 Records</h2>

      {/* Display error message if there's an error */}
      {errorMessage && <p className="text-red-500 font-semibold">{errorMessage}</p>}

      {/* Table for displaying records */}
      <div id="records-table">
        <table className="min-w-full border-collapse border border-gray-200 mb-4">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 px-4 py-2 text-left text-gray-700 font-medium">Name</th>
              <th className="border border-gray-300 px-4 py-2 text-left text-gray-700 font-medium">Rate</th>
              <th className="border border-gray-300 px-4 py-2 text-left text-gray-700 font-medium">Date</th>
            </tr>
          </thead>
          <tbody>
            {currentRecords.length > 0 ? (
              currentRecords.map((record) => (
                <tr key={record._id} className="hover:bg-gray-100 transition-colors duration-300">
                  <td className="border border-gray-300 px-4 py-2 text-gray-800">{record.name}</td>
                  <td className="border border-gray-300 px-4 py-2 text-gray-800">{record.rate}</td>
                  <td className="border border-gray-300 px-4 py-2 text-gray-800">{new Date(record.date).toLocaleDateString()}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="border border-gray-300 px-4 py-2 text-center text-gray-500">No records found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Action Buttons at the bottom */}
      <div className="flex justify-between mt-6">
        {/* Total Rate Button */}
        <button
          className="p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200 font-semibold"
        >
          Total Rate: ${totalRate.toFixed(2)}
        </button>

        {/* Download Button */}
        <button
          onClick={downloadPDF}
          className="p-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition duration-200 font-semibold"
        >
          Download as PDF
        </button>
      </div>

      {/* Centered Pagination controls */}
      <div className="flex justify-center items-center mt-6">
        <button
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="mx-2 p-2 bg-blue-600 text-white rounded-md disabled:opacity-50 hover:bg-blue-700 transition duration-200"
        >
          Previous
        </button>
        <span className="text-sm font-medium">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="mx-2 p-2 bg-blue-600 text-white rounded-md disabled:opacity-50 hover:bg-blue-700 transition duration-200"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default RecordsTable;
