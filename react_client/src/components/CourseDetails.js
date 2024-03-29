import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Card, Row, Col } from 'react-bootstrap';

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
        <div style={{ paddingTop: '60px' }}>
            {error && <p>{error}</p>}
            <h1>{courseData.title}</h1>
            <p>{courseData.description || 'No description available'}</p> {/* Null check for description */}
            <h2>Instructors</h2>
            <Row>
                {instructors.map(instructor => (
                    <Col key={instructor.id} xs={6} md={6} lg={4} style={{ marginBottom: '20px' }}>
                        <Card style={{ width: '100%' }}>
                            <Card.Img variant="top" src={instructor.image_url} style={{ maxHeight: '150px', objectFit: 'cover' }} />
                            <Card.Body>
                                <Card.Title>{instructor.name}</Card.Title>
                                <Card.Text style={{ fontSize: '14px' }}>{instructor.description || 'No description available'}</Card.Text> {/* Null check for description */}
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
            <h2>Organizations</h2>
            <Row>
                {organizations.map(organization => (
                    <Col key={organization.id} xs={6} md={6} lg={4} style={{ marginBottom: '20px' }}>
                        <Card style={{ width: '100%' }}>
                            <Card.Img variant="top" src={organization.img_url} style={{ maxHeight: '150px', objectFit: 'cover' }} />
                            <Card.Body>
                                <Card.Title>{organization.name}</Card.Title>
                                <Card.Text style={{ fontSize: '14px' }}>{organization.description || 'No description available'}</Card.Text> {/* Null check for description */}
                                <Card.Link href={organization.contact_url}>Contact</Card.Link>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </div>
    );
}

export default CourseDetails;
