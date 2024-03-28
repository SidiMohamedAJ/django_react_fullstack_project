import React, { useState, useEffect } from 'react';
import { Card, Button } from 'react-bootstrap';
import axios from 'axios';
import { Link } from 'react-router-dom';

const TopRatedCourses = () => {
  const [courses, setCourses] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [coursesPerPage] = useState(6); // Display 6 cards per page

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const result = await axios.get(`http://localhost:8000/top_rated_courses/`);
        setCourses(result.data);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };

    fetchCourses();
  }, []);

  // Get current courses
  const indexOfLastCourse = currentPage * coursesPerPage;
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
  const currentCourses = courses.slice(indexOfFirstCourse, indexOfLastCourse);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <h2>Top Rated Courses</h2>
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