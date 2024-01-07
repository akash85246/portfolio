import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Home from "../src/components/home/home";
export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
}
