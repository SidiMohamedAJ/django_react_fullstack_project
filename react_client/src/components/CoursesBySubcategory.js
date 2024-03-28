import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Card } from 'react-bootstrap';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';

const CoursesBySubcategory = () => {
    const [courses, setCourses] = useState([]);
    const { id } = useParams();

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const { data } = await axios.get(`http://127.0.0.1:8000/coursesby_subcategory/${id}/`);
                setCourses(data);
            } catch (error) {
                console.error('Error fetching courses:', error);
            }
        };
        fetchCourses();
    }, [id]);

    return (
      
        <div className="cards-container">
            {courses.map((course, index) => (
                <div key={index} className="course-card">
                    <Link to={`details_course/${course.id}`} className="card-link">
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
                </div>
            ))}
        </div>
    );
};

export default CoursesBySubcategory;
