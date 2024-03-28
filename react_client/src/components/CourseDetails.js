import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function CourseDetails() {
    const [courseData, setCourseData] = useState({});
    const [instructors, setInstructors] = useState([]);
    const [organizations, setOrganizations] = useState([]);
    const { id } = useParams();

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get(`http://localhost:8000/detail_courses/${id}/`);
                const { course, instructors, organizations } = response.data; // Destructure data from response
                setCourseData(course);
                setInstructors(instructors);
                setOrganizations(organizations);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }

        fetchData();
    }, [id]);

    return (
        <div>
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
