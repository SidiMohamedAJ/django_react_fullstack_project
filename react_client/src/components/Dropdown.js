import React from "react";
import MenuItems from "./MenuItems";

const Dropdown = ({ submenus, dropdown, depthLevel }) => {
  const updatedDepthLevel = depthLevel + 1;
  const dropdownClass = updatedDepthLevel > 1 ? "dropdown-submenu" : "";

  return (
    <ul className={`dropdown ${dropdownClass} ${dropdown ? "show" : ""}`}>
      {Array.isArray(submenus) && submenus.length > 0 && submenus.map((submenu, index) => (
        <MenuItems key={index} items={submenu} depthLevel={updatedDepthLevel} />
      ))}
    </ul>
  );
};

export default Dropdown;
