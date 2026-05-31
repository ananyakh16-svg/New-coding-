import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Members from "./pages/Members";
import Events from "./pages/Events";
import Meetings from "./pages/Meetings";
import Fees from "./pages/Fees.jsx";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";

function App() {
  return (
    <BrowserRouter>
    <Navbar/>
      <Routes>

        <Route path="/" element={<Dashboard />} />

        <Route path="/members" element={<Members />} />

        <Route path="/events" element={<Events />} />

        <Route path="/meetings" element={<Meetings />} />

        <Route path="/fees" element={<Fees />} />

        <Route path="/login" element={<Login />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
