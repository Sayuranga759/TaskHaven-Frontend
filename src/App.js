import './App.css';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Signup from "./pages/Signup";
import { ToastContainer } from "react-toastify";
import Login from "./pages/Login";

function App() {
  return (
  <BrowserRouter>
    <Routes>
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
    </Routes>
    <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
  </BrowserRouter>
  );
}

export default App;
