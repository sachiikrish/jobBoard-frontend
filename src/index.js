import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { Route, BrowserRouter as Router, Routes, Navigate } from "react-router-dom";
import { Home } from "./pages/Home";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Dashboard } from "./pages/Dashboard";
import { AuthProvider } from "./context/authContext";
import { Jobs } from "./pages/Jobs";
import { JobDetails } from "./pages/JobDetails";
import { ApplyJobDetails } from "./pages/ApplyJobDetails";
import { ApplicationDetails } from "./pages/ApplicationDetails";
import { ForgotPassword } from "./pages/ForgotPassword";

const App = () => {
  // const [user, setUser] = useState(null);
  // const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   // Fetch user data if access token exists
  //   const fetchUser = async () => {
  //     const token = localStorage.getItem("accessToken");
  //     if (token) {
  //       try {
  //         const response = await axiosIns.get("/dashboard");
  //         setUser(response.data);
  //       } catch (error) {
  //         console.error("Error while fetching user details:", error);
  //       } finally {
  //         setLoading(false);
  //       }
  //     }

  //   };

  //   fetchUser();
  // }, []);

  const ProtectedRoute = ({ component }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(null);

    useEffect(() => {
      let token = localStorage.getItem("accessToken");
      setIsAuthenticated(!!token);
    }, []);
    if (isAuthenticated === null) return null;

    return isAuthenticated ? component : <Navigate to="/home" replace />;
  };

  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route
            path="/dashboard"
            element={<ProtectedRoute component={<Dashboard />} />}
            //element={<Dashboard />}
          />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/employer/jobs/:id" element={<JobDetails />} />
          <Route path="/employer/applications/:id" element={<ApplicationDetails />}></Route>
          <Route path="/jobs/:id" element={<ApplyJobDetails />} />
          <Route path="/forgot-password" element={<ForgotPassword />}></Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
