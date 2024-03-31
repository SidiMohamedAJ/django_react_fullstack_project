import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaStar } from 'react-icons/fa'; 
import { Button } from 'react-bootstrap';

const TopRatedCourses = () => {
  const [courses, setCourses] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [coursesPerPage] = useState(20); // Afficher 20 cours par page
  const [error, setError] = useState(null);

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    const fetchCourses = async () => {
      try {
        const result = await axios.get(`http://localhost:8000/top_rated_courses/`, { signal });
        if (!signal.aborted) {
          setCourses(result.data);
          setError(null); // Réinitialiser les erreurs si la requête réussit
        }
      } catch (error) {
        if (!signal.aborted) {
          console.error('Error fetching courses:', error);
        }
      }
    };

    fetchCourses();

    return () => {
      abortController.abort(); // Annuler la requête en cours lorsque le composant est démonté
    };
  }, []);

  // Fonction pour générer les étoiles de notation visuelle
  const renderRatingStars = (rating) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      if (i < rating) {
        stars.push(<FaStar key={i} color="#ffc107" />);
      } else {
        stars.push(<FaStar key={i} color="#e4e5e9" />);
      }
    }
    return stars;
  };

  // Fonction pour paginer les cours
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Calculer l'index de début et de fin des cours à afficher sur la page actuelle
  const indexOfLastCourse = currentPage * coursesPerPage;
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
  const currentCourses = courses.slice(indexOfFirstCourse, indexOfLastCourse);

  return (
    <div style={{ paddingTop: '60px' }}>
      <h2>Top Rated Courses</h2>
      <div className="container-fluid bg-transparent my-4 p-3">
        <div className="row row-cols-1 row-cols-xs-2 row-cols-sm-2 row-cols-lg-4 g-3">
          {currentCourses.map((course, index) => (
            <div key={index} className="col">
              <div className="card h-100 shadow-sm">
                <div className="card-body">
                  <div className="clearfix mb-3">
                    <h5 className="card-title">{course.title}</h5>
                    <div className="float-start">
                      {renderRatingStars(course.rating)}
                    </div>
                    <span className="float-end price-hp">Price: {course.price}</span>
                  </div>
                  <h5 className="card-title">{course.description}</h5>
                  <h5 className="card-title">Duration: {course.duration}</h5>
                  <h5 className="card-title">Type : {course.type}</h5>
                  <div className="d-grid gap-2 my-4">
                    <Link to={`/detail_courses/${course.id}`} className="btn btn-warning">
                      <h2>Details</h2>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div>
        {/* Pagination */}
        {courses.length > coursesPerPage && (
          <ul className="pagination">
            {Array.from({ length: Math.ceil(courses.length / coursesPerPage) }, (_, i) => (
              <li key={i} className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}>
                <Button onClick={() => paginate(i + 1)} className="page-link">{i + 1}</Button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default TopRatedCourses;
