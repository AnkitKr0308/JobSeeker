import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { verifySession } from "./store/authSlice";
import Navbar from "./components/Navbar/Navbar";
import { Outlet } from "react-router-dom";

let hasVerifiedSession = false;

function App() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    if (!hasVerifiedSession && !auth.data) {
      dispatch(verifySession());
      hasVerifiedSession = true;
    }
  }, [dispatch, auth.data]);

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
