import logo from "./logo.svg";
import "./App.css";
import ResevationForm from "./components/ResevationForm";
import ParentComponent from "./components/ParentComponent";
import Register from "./components/Register";
import Login from "./components/Login";
import LinkPage from "./components/LinkPage";
import Anauthorized from "./components/Anauthorized";
import Home from "./components/Home";
import Editor from "./components/Editor";
import Admin from "./components/Admin";
import Lounge from "./components/Lounge";
import Missing from "./components/Missing";
import Stats from "./components/Stats";
import Layout from "./components/Layout";
import RequireAuth from "./components/RequireAuth";
import PersistLogin from "./components/PersistLogin";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* Public Routes */}
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="linkpage" element={<LinkPage />} />
        <Route path="anauthorized" element={<Anauthorized />} />

        {/* Protected Routes */}
        <Route element={<PersistLogin />}>
          <Route element={<RequireAuth allowedRoles={[2001]} />}>
            <Route path="/" element={<Home />} />
          </Route>
          <Route element={<RequireAuth allowedRoles={[1984]} />}>
            <Route path="editor" element={<Editor />} />
          </Route>
          <Route element={<RequireAuth allowedRoles={[5050]} />}>
            <Route path="admin" element={<Admin />} />
          </Route>
          <Route element={<RequireAuth allowedRoles={[1984, 5050]} />}>
            <Route path="lounge" element={<Lounge />} />
          </Route>
          <Route element={<RequireAuth allowedRoles={[1984, 5050]} />}>
            <Route path="stats" element={<Stats />} />
          </Route>
        </Route>

        {/* Catch All */}
        <Route path="*" element={<Missing />} />
      </Route>
    </Routes>
  );
}

export default App;
