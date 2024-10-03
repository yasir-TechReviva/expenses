import React from "react";
import { Route, Routes } from "react-router-dom";
import BalanceForm from "./components/BalanceForm";
import RecordsTable from "./components/RecordTable";
import RecordForm from "./components/RecordForm";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<RecordForm/>} />
      <Route path="/balance" element={<BalanceForm />} />
      <Route path="/record" element={<RecordsTable/>} />
    </Routes>
  );
};

export default App;
