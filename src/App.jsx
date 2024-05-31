import React, { useContext } from "react";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Home from "./views/Home";
import ManageAnime from "./views/ManageAnime";
import AddAnime from "./views/AddAnime";
import NavBar from "./components/NavBar";
import AllAnime from "./views/AllAnime";
import { AuthContext } from "./contexts/AuthContext";
import { UserProvider } from "./contexts/UserContext.jsx";
import Login from "./views/Login";
import AnimeDet from "./views/AnimeDet.jsx";

const PrivateRoute = ({ children }) => {
  const { token } = useContext(AuthContext);

  return token ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <>
      <Router>
        <UserProvider>
          <NavBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/detail/:id" element={<AnimeDet />} />
            {/* <Route path="/manageanime" element={<ManageAnime />} /> */}
            <Route
              path="/manageanime"
              element={
                <PrivateRoute>
                  <ManageAnime />
                </PrivateRoute>
              }
            />
            <Route
              path="/addanime"
              element={
                <PrivateRoute>
                  <AddAnime />
                </PrivateRoute>
              }
            />
            <Route path="/allanime" element={<AllAnime />} />
          </Routes>
        </UserProvider>
      </Router>
    </>
  );
}

export default App;
