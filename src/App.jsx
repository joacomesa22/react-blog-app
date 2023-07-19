import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useState } from "react";
import Home from "./pages/Home";
import CreatePost from "./pages/CreatePost";
import Login from "./pages/Login";
import { signOut } from "firebase/auth";
import { auth } from "./firebase-config";
import "./App.css";

function App() {
  const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuth"));

  const signUserOut = () => {
    signOut(auth)
      .then(() => {
        localStorage.clear();
        setIsAuth(false);
      })
      .then(() => {
        window.location.pathname = "/login";
      });
  };

  return (
    <Router>
      <nav className="nav">
        <div className="nav__links">
          <Link to={"/"}>Home</Link>
          {!isAuth ? (
            <Link to={"/login"}>Login</Link>
          ) : (
            <>
              <Link to={"/createpost"}>Create Post</Link>
              <button onClick={signUserOut} className="nav__links-logout">
                Log Out
              </button>
            </>
          )}
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<Home isAuth={isAuth} />} />
        <Route path="/createpost" element={<CreatePost isAuth={isAuth} />} />
        <Route path="/login" element={<Login setIsAuth={setIsAuth} />} />
      </Routes>
    </Router>
  );
}

export default App;
