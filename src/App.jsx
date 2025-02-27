import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Component/Home/Home";
import Auth from "./Component/Auth/Auth";

function App() {
  return (
    <div className="app">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Auth signup={false} />} />
          <Route path="/signup" element={<Auth signup={true} />} />
          <Route path="/account" element={<h1>account</h1>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
