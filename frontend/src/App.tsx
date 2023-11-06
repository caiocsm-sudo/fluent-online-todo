import Header from "./partials/Header";
import { MainPanel } from "./components/MainPanel";
import Modal from "./components/Modal";

function App() {
  const loggedIn: boolean = true;

  return (
    <div className="application">
      <Header />
      <main className="main-wrapper">
        {
          loggedIn ? <MainPanel /> : <Modal />
        }
      </main>
    </div>
  );
}

export default App;
