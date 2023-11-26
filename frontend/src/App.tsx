import { FC, useState, useEffect } from "react";

import Header from "./partials/Header";
import { MainPanel } from "./components/MainPanel";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Authentication from "./pages/Auth/Auth";
import Profile from "./pages/User/Profile";

import { useSelector } from "react-redux";
import { LoginContext } from "./utils/Context";
import HomePage from "./components/non-logged/HomePage";
import { UserReducer } from "./app/store";

const App: FC = () => {
  const user = useSelector((state: UserReducer) => state.user);

  const [loggedIn, setLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    setLoggedIn(user.user_email ? true : false);
  }, [user]);

  const isAuthenticated = () => {
    return user.user_email ? true : false;
  };

  return (
    <LoginContext.Provider value={{ loggedIn, setLoggedIn }}>
      <Router>
        <div className="application">
          <Header />
          <main className="main-wrapper">
            <Routes>
              <Route path="/" Component={loggedIn ? MainPanel : HomePage} />
              <Route path="/login/:mode" Component={Authentication} />
              {isAuthenticated() ? (
                <Route path="/profile" Component={Profile} />
              ) : (
                ""
              )}
            </Routes>
          </main>
        </div>
      </Router>
    </LoginContext.Provider>
  );
};

export default App;
