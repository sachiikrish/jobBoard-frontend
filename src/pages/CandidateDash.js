import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useContext } from "react";
import { AuthContext } from "../context/authContext";

export const CandidateDash = () => {
  const { user, setUser } = useContext(AuthContext);
  return (
    <div className="candidatePage">
      <div className="header">
        <Header />
      </div>
      <div className="body">WELCOME {user.name}</div>
      <div className="footer">
        <Footer />
      </div>
    </div>
  );
};
