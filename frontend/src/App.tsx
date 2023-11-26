import { FC, useState, useEffect } from "react";

import Header from "./partials/Header";
import { MainPanel } from "./components/MainPanel";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Authentication from "./pages/Auth/Auth";
import Profile from "./pages/User/Profile";

import { useSelector } from "react-redux";
import { LoginContext } from "./utils/Context";
import HomePage from "./components/non-logged/HomePage";

const App: FC = () => {
  // Type state later
  const user = useSelector((state) => state.user);

  const [loggedIn, setLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    setLoggedIn(user.user_email ? true : false);
  }, [user]);

  return (
    <LoginContext.Provider value={{ loggedIn, setLoggedIn }}>
      <Router>
        <div className="application">
          <Header />
          <main className="main-wrapper">
            <Routes>
              <Route path="/" Component={loggedIn ? MainPanel : HomePage} />
              <Route path="/login/:mode" Component={Authentication} />
              <Route path="/profile" Component={Profile} />
            </Routes>
          </main>
        </div>
      </Router>
    </LoginContext.Provider>
  );
};

export default App;
