import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './pages/Login';
import Register from './pages/Register';
import Board from "./pages/Board";
import ProtectedRoute from "./components/ProtectedRoute";
import EmailProvider from "./context/EmailContext";

function App() {
  return (
    <Router>
      <EmailProvider>
        <div className="flex flex-col items-center justify-center gap-6 bg-gray-100 min-h-screen p-6">
          <Routes>
            <Route path="/board" element={<ProtectedRoute><Board /></ProtectedRoute>} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </div>
      </EmailProvider>
    </Router>
  );
}

export default App;
