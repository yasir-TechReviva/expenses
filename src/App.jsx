import React from "react";
import { Route, Routes } from "react-router-dom";
import BalanceForm from "./components/BalanceForm";
import RecordsTable from "./components/RecordTable";
import RecordForm from "./components/RecordForm";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<BalanceForm />} />
      <Route path="/record" element={<RecordsTable/>} />
      <Route path="/recordform" element={<RecordForm/>} />
    </Routes>
  );
};

export default App;
