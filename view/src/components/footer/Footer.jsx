import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="bg-dark text-center text-lg-start mt-5 footer">
      <div className="text-light text-center p-2">
        J&J ✌ (Josue and Juan) {"  - "}
        <a className="text-light" href="https://">
          CERN Summer Intership
        </a>
      </div>
    </footer>
  );
};

export default Footer;
