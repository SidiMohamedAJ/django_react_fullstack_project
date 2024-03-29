import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const TopRatedCourses = () => {
  const [courses, setCourses] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [coursesPerPage] = useState(20); // Display 6 cards per page
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
          setError('Error fetching courses. Please try again later.');
        }
      }
    };

    fetchCourses();

    return () => {
      abortController.abort(); // Annuler la requête en cours lorsque le composant est démonté
    };
  }, []);

  // Get current courses
  const indexOfLastCourse = currentPage * coursesPerPage;
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
  const currentCourses = courses.slice(indexOfFirstCourse, indexOfLastCourse);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div style={{ paddingTop: '60px' }}>
      <h2>Top Rated Courses</h2>
      {error && <p>{error}</p>} {/* Afficher un message d'erreur en cas d'échec de la requête */}
      <div className="cards-container">
        {currentCourses.map((course, index) => (
          <Link key={index} to={`/detail_courses/${course.id}`} className="card-link">
            <Card className="m-3 rounded shadow-lg" style={{ width: '22em' }}>
              <Card.Body>
                <Card.Title>{course.title}</Card.Title>
                <Card.Text>{course.description}</Card.Text>
                <Card.Text>Rating: {course.rating}</Card.Text>
                <Card.Text>Duration: {course.duration}</Card.Text>
                <Card.Text>Price: {course.price}</Card.Text>
                <Card.Text>Type: {course.type}</Card.Text>
              </Card.Body>
            </Card>
          </Link>
        ))}
      </div>
      <div>
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
