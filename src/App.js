
import { BrowserRouter, Route, Routes, HashRouter } from "react-router-dom";
import './App.css'
import { LoadingPage } from "./Page/Loading";


function App() {

  return (
    <section className="vh-100 vw-100">
        <HashRouter>
          <Routes>
          {/* <Route path="/" element={<Login />} /> */}
            <Route path="/" element={<LoadingPage />} />
          </Routes>
        </HashRouter>
      </section>
  );
}

export default App;