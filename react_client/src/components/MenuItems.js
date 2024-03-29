import axios from 'axios';
import React, { useState, useEffect, useRef } from "react";
import Dropdown from "./Dropdown";
import { Link } from 'react-router-dom';

const MenuItems = ({ items, depthLevel }) => {
  const [dropdown, setDropdown] = useState(false);
  const [courses, setCourses] = useState([]);
  const ref = useRef(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    const fetchCourses = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/coursesby_subcategory/${items.id}`, { signal });
        if (!signal.aborted) {
          setCourses(response.data);
          setError(null);
        }
      } catch (error) {
        if (!signal.aborted) {
          console.error('Error fetching courses:', error);
          setError('Error fetching courses. Please try again later.');
        }
      }
    };

    fetchCourses();

    return () => {
      abortController.abort(); // Annuler la requête en cours lorsque le composant est démonté
    };
  }, [items.id]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdown && ref.current && !ref.current.contains(event.target)) {
        setDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [dropdown]);

  const onMouseEnter = () => {
    if (window.innerWidth > 960) {
      setDropdown(true);
    }
  };

  const onMouseLeave = () => {
    if (window.innerWidth > 960) {
      setDropdown(false);
    }
  };

  return (
    <li
      className="menu-items"
      ref={ref}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {items.submenu ? (
        <>
          <button
            type="button"
            aria-haspopup="menu"
            aria-expanded={dropdown ? "true" : "false"}
            onClick={() => setDropdown((prev) => !prev)}
          >
            {items.title} {depthLevel > 0 ? <span>&raquo;</span> : <span className="arrow" />}
          </button>
          <Dropdown depthLevel={depthLevel} submenus={items.submenu} dropdown={dropdown} />
        </>
      ) : (
        <Link to={`coursesby_subcategory/${items.id}`} className="submenu-link">
          {items.title}
        </Link>
      )}
      <div className="courses-container">
        {error && <p>{error}</p>}
        {courses.map(course => (
          <div key={course.id} className="course">
            
            {/* Affichez d'autres détails du cours ici */}
          </div>
        ))}
      </div>
    </li>
  );
};

export default MenuItems;
