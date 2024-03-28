import React, { useState, useEffect } from 'react';
import { Card } from 'react-bootstrap';
import axios from 'axios';
import { Link } from 'react-router-dom';

const TopRatedCourses = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const result = await axios.get(`http://localhost:8000/top_rated_courses/`);
        console.log(result.data); // Vérifiez les données reçues dans la console
        setCourses(result.data);
      } catch (error) {
        console.error('Error fetching courses:', error); // Gérez les erreurs de l'API
      }
    };

    fetchCourses();
  }, []);

  return (
    <div>
      <h2>Top Rated Courses</h2>
      <div className="cards-container">
        {courses.map((course, index) => (
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
        ))}
      </div>
    </div>
  );
};

export default TopRatedCourses;
