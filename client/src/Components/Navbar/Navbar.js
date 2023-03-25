import PersonIcon from "@mui/icons-material/Person";
import InfoRoundedIcon from "@mui/icons-material/InfoRounded";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import PhoneEnabledRoundedIcon from "@mui/icons-material/PhoneEnabledRounded";
import ShoppingCartRoundedIcon from "@mui/icons-material/ShoppingCartRounded";
import React from "react";
import "./navbar.css";
import logoImg from "./images/agrokart.png";

function Navbar() {
  return (
    <>
      <div className="navRoot fd bg-dark">
        <div className="logo">
          <img src={logoImg} alt="Logo" />
        </div>
        <ul className="fd aic lhj">
          <a href="/" className="fd jcc aic">
            <li>
              <HomeRoundedIcon />
            </li>
          </a>
          <a href="/about-us" className="fd jcc aic">
            <li>
              <InfoRoundedIcon />
            </li>
          </a>
          <a href="/signup" className="fd jcc aic">
            <li>
              <PersonIcon />
            </li>
          </a>
          <a href="/contact-us" className="fd jcc aic">
            <li>
              <PhoneEnabledRoundedIcon />
            </li>
          </a>
          <a href="/cart" className="fd jcc aic">
            <li>
              <ShoppingCartRoundedIcon />
            </li>
          </a>
        </ul>
      </div>
    </>
  );
}

export default Navbar;
