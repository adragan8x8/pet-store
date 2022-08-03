import React from "react";
import { Link } from "react-router-dom";

import App from "../App";
import Pets from "./Pets";

import { NavContainer } from "../styled/NavContainer.styled";
import { NavItem } from "../styled/NavItem.styled";

export default function Navbar() {
  return (
    <NavContainer>
      <Link to="/">
        <NavItem>Home</NavItem>
      </Link>
      <Link to="/pets">
        <NavItem>Pets</NavItem>
      </Link>
    </NavContainer>
  );
}
