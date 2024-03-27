import React, { useState, useEffect } from "react";
import MenuItems from "./MenuItems";
import { fetchMenuItems } from "../menuItems";

const Navbar = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [isCursorOnCategories, setIsCursorOnCategories] = useState(false);

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const responseData = await fetchMenuItems();

        if (responseData && responseData.Categories) {
          setMenuItems([
            {
              title: "Categories",
              submenu: responseData.Categories
            }
          ]);
        } else {
          console.error("No category data found.");
        }
      } catch (error) {
        console.error("Error fetching menu items:", error);
      }
    };
    fetchMenu();
  }, []);

  return (
    <nav>
      <ul className="menus">
        {menuItems.map((menu, index) => (
          <li
            key={index}
            onMouseEnter={() => setIsCursorOnCategories(true)}
            onMouseLeave={() => setIsCursorOnCategories(false)}
          >
            <MenuItems
              items={menu}
              depthLevel={0}
              showSubmenu={isCursorOnCategories}
            />
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
