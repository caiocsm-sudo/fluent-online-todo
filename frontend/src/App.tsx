import React from "react";

import Header from "./partials/Header";
import { MainPanel } from "./components/MainPanel";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Authentication from "./pages/Auth/Auth";

const App: React.FC = () => {
  return (
    <Router>
      <div className="application">
        <Header />
        <main className="main-wrapper">
          <Routes>
            <Route path="/" Component={MainPanel} />
            <Route path="/login/:mode" Component={Authentication} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
