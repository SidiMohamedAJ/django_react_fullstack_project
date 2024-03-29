import React, { useState, useEffect } from "react";
import MenuItems from "./MenuItems";
import { fetchMenuItems } from "../menuItems";
import axios from 'axios';

const Navbar = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [isCursorOnCategories, setIsCursorOnCategories] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

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

  const handleScroll = () => {
    const navbar = document.getElementById("navbar");
    if (window.scrollY > 100) { // ajustez la valeur en fonction de la quantité de défilement avant que le navbar ne soit fixé
      navbar.classList.add("navbar-fixed");
    } else {
      navbar.classList.remove("navbar-fixed");
    }
  };

  window.addEventListener("scroll", handleScroll);

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.get(`http://localhost:8000/search/?q=${searchQuery}`);
      console.log("Résultats de la recherche :", response.data);
      // Ajoutez le code pour traiter les résultats de la recherche ici
    } catch (error) {
      console.error("Erreur lors de la recherche :", error);
    }
  };

  return (
    <nav id="navbar">
      <div className="container">
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
        <form className="search-container" onSubmit={handleSearchSubmit}>
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={handleSearchInputChange}
          />
          <button type="submit">Search</button>
        </form>
      </div>
    </nav>
  );
};

export default Navbar;
