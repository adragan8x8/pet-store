import React from "react";
import { Link } from "react-router-dom";

export default function TableEdit({ link, icon }) {
  return (
    <Link style={{ textDecoration: "none", color: "#333" }} to={link}>
      <img width={"20px"} src={icon} alt="edit" />
    </Link>
  );
}
