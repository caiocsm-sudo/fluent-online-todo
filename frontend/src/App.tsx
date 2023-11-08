import Header from "./partials/Header";
import { MainPanel } from "./components/MainPanel";

function App() {
  return (
    <div className="application">
      <Header />
      <main className="main-wrapper">
        <MainPanel />
      </main>
    </div>
  );
}

export default App;
