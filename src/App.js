import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearAuth, setAuthFromStorage } from "./store/authSlice";
import Navbar from "./components/Navbar/Navbar";
import { Outlet } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

function App() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  console.log(auth);

  useEffect(() => {
    const token = localStorage.getItem("jwt_token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        const now = Date.now() / 1000;
        if (decoded.exp < now) {
          dispatch(clearAuth());
          localStorage.removeItem("jwt_token");
          localStorage.removeItem("user");
        } else {
          // Optionally pull user info from decoded token or localStorage
          const user = JSON.parse(localStorage.getItem("user"));
          dispatch(setAuthFromStorage({ token, user }));
        }
      } catch (error) {
        dispatch(clearAuth());
        localStorage.removeItem("jwt_token");
        localStorage.removeItem("user");
      }
    } else {
      dispatch(clearAuth());
    }
  }, [dispatch]);

  if (auth.loading) return null;

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
