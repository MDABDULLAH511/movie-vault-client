import React from "react";
import { NavLink } from "react-router";

const MyNavLink = ({ to, className, children }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        isActive
          ? "fJost text-primary text-[16px] hover:text-primary hover:bg-transparent font-semibold py-2"
          : `${className} text-white text-[16px] fJost hover:text-primary hover:bg-transparent font-semibold py-2 duration-300`
      }
    >
      {children}
    </NavLink>
  );
};

export default MyNavLink;
