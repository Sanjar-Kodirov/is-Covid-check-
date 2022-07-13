import { Route, Routes } from "react-router-dom";
import { Login, AddPersonFormPage, Admin, PrintPage } from "./pages";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/addperson" element={<AddPersonFormPage />} />
        <Route path="/printpage/:id" element={<PrintPage />} />
        <Route path="/printpage/" element={<PrintPage />} />
      </Routes>
    </div>
  );
}

export default App;
