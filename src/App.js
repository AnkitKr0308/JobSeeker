import "./css/App.css";
import ProtectedRoute from "./components/Authentication/ProtectedRoute";

function App() {
  return (
    <div className="App">
      <ProtectedRoute></ProtectedRoute>
    </div>
  );
}

export default App;
