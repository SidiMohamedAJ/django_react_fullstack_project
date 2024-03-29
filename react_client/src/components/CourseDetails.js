import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function CourseDetails() {
    const [courseData, setCourseData] = useState({});
    const [instructors, setInstructors] = useState([]);
    const [organizations, setOrganizations] = useState([]);
    const { id } = useParams();
    const [error, setError] = useState(null);

    useEffect(() => {
        const abortController = new AbortController();
        const signal = abortController.signal;

        async function fetchData() {
            try {
                const response = await axios.get(`http://localhost:8000/detail_courses/${id}/`, { signal });
                if (!signal.aborted) {
                  const { course, instructors, organizations } = response.data; // Destructure data from response
                  setCourseData(course);
                  setInstructors(instructors);
                  setOrganizations(organizations);
                  setError(null);
                }
            } catch (error) {
                if (!signal.aborted) {
                  console.error('Error fetching data:', error);
                  setError('Error fetching data. Please try again later.');
                }
            }
        }

        fetchData();

        return () => {
            abortController.abort();
        };
    }, [id]);

    return (
        <div>
            {error && <p>{error}</p>}
            <h1>{courseData.title}</h1>
            <p>{courseData.description || 'No description available'}</p> {/* Null check for description */}
            <h2>Instructors</h2>
            {instructors.map(instructor => (
                <div key={instructor.id}>
                    <h3>{instructor.name}</h3>
                    <img src={instructor.image_url} alt={instructor.name} 
                        style={{ width: '100px', height: '100px' }}/>
                    <p>{instructor.description || 'No description available'}</p> {/* Null check for description */}
                </div>
            ))}
            <h2>Organizations</h2>
            {organizations.map(organization => (
                <div key={organization.id}>
                    <h3>{organization.name}</h3>
                    <img 
                        src={organization.img_url} 
                        alt={organization.name} 
                        style={{ width: '100px', height: '100px' }} 
                    />
                    <p>{organization.description || 'No description available'}</p> {/* Null check for description */}
                    <a href={organization.contact_url}>Contact</a>
                </div>
            ))}
        </div>
    );
}

export default CourseDetails;
