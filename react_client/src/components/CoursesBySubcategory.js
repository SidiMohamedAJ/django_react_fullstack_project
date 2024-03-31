import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';


const CoursesBySubcategory = () => {
    const [courses, setCourses] = useState([]);
    const { id } = useParams();
    const [error, setError] = useState(null);

    useEffect(() => {
        const abortController = new AbortController();
        const signal = abortController.signal;

        const fetchCourses = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/coursesby_subcategory/${id}/`, { signal });
                if (!signal.aborted) {
                    setCourses(response.data);
                    setError(null);
                }
            } catch (error) {
                if (!signal.aborted) {
                    console.error('Error fetching courses:', error);
                    setError('Error fetching courses');
                }
            }
        };

        fetchCourses();

        return () => {
            abortController.abort();
        };
    }, [id]);

    return (
        <div style={{ paddingTop: '60px' }}>
            <div className="container-fluid bg-transparent my-4 p-3">
                <div className="row row-cols-1 row-cols-xs-2 row-cols-sm-2 row-cols-lg-4 g-3">
                    {courses.map((course, index) => (
                        <div key={index} className="col">
                            <div className="card h-80 shadow-sm">
                                {/* <img src="https://www.freepnglogos.com/uploads/notebook-png/download-laptop-notebook-png-image-png-image-pngimg-2.png" className="card-img-top" alt="Course Image" /> */}
                                <div className="card-body">
                                    <div className="clearfix mb-3">
                                        <h5 className="card-title">{course.title}</h5>
                                        <span class="float-start badge rounded-pill bg-primary">{course.rating}</span> 
                                        <span className="float-end price-hp">{course.price}</span>
                                    </div>
                                    <h5 className="card-title">{course.description}</h5>
                                    <h5 className="card-title">Duration: {course.duration}</h5>
                                    <h5 className="card-title">Type : {course.type}</h5>
                                    <div className="text-center my-4">
                                        <Link to={`/detail_courses/${course.id}`} class="btn btn-warning">Details</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CoursesBySubcategory;
