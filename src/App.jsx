import React from "react";
import { Route, Routes } from "react-router-dom";
import BalanceForm from "./components/BalanceForm";
import RecordsTable from "./components/RecordTable";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<BalanceForm />} />
      <Route path="/record" element={<RecordsTable/>} />
    </Routes>
  );
};

export default App;
