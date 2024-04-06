import React from "react";
import { Route, Router, Routes } from "react-router-dom";
import FormBuilder from "./FormBuilder";
import FormPreview from "./FormPreview";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<FormBuilder />} />
        <Route path="/form-preview" element={<FormPreview />} />
      </Routes>
    </div>
  );
}

export default App;
