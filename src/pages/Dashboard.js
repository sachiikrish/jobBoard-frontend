import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CandidateDash } from "./CandidateDash";
import { EmployerDash } from "./EmployerDash";
import { AuthContext } from "../context/authContext";
import { useContext } from "react";
import BlueSpinner from "../components/Spinner";
import { useLocation } from "react-router-dom";

export const Dashboard = () => {
  const navigate = useNavigate();
  const { user, loading, setUser } = useContext(AuthContext);

  useEffect(() => {
    if (!user || !user.role) {
      console.log("USER NOT PRESENT IN THE DASHBOARD PAGE");
    }
  }, [user, navigate]);

  if (loading) {
    return (
      <>
       <div style={{height:'100vh', width:'100vw'}} className="d-flex justify-content-center align-items-center">
        <BlueSpinner />
       </div>
      </>
    ); // Show loading until user data is fetched
  }

  if (user.role === "candidate") {
    return <CandidateDash />;
  } else if (user.role === "employer") {
    return <EmployerDash />;
  } else {
    navigate("/home"); // Redirect to home if role is unrecognized
    return null;
  }
};
