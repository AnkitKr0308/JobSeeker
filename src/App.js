import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { verifySession } from "./store/authSlice";
import Navbar from "./components/Navbar/Navbar";
import { Outlet } from "react-router-dom";

function App() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const hasVerifiedSession = useRef(false);

  useEffect(() => {
    if (!hasVerifiedSession.current && !auth.data) {
      dispatch(verifySession());
      hasVerifiedSession.current = true;
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
