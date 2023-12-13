import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './index.css';

import Layout from "./pages/Layout";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Admin from "./pages/Admin";
import NoPage from "./pages/NoPage";

export default function App() {
  const userConnected = localStorage.getItem("user_connect") === "true";

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="contact" element={<Contact />} />
          <Route path="login" element={<Login />} />
          {userConnected ? <Route path="admin" element={<Admin />} /> : null}
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

const root = document.getElementById('root');
ReactDOM.render(<App />, root);
