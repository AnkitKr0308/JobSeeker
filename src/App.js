import "./css/App.css";
import Navbar from "./components/Navbar/Navbar";
import { Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { verifySession } from "./store/authSlice";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(verifySession());
  }, [dispatch]);

  return (
    <div className="App">
      <Navbar />
      <div className="Outlet">
        <Outlet />
      </div>
    </div>
  );
}

export default App;
