import './App.css';
import {Routes, Route} from "react-router-dom";
import Signup from "./pages/Signup";
import RequireAuth from './components/auth/RequireAuth';
import { ToastContainer } from "react-toastify";
import Login from "./pages/Login";
import Layout from './Layout';
import UserHomePage from './pages/UserHomePage';

function App() {
  return (
    <>
    <Routes>
      <Route path="/" element={<Layout/>}>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<UserHomePage/>} />
        {/* Protected Routes */}
        <Route element={<RequireAuth />}>
          {/* <Route path="/home" element={<UserHomePage/>} /> */}
        </Route>
      </Route>
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
    </>
  );
}

export default App;
