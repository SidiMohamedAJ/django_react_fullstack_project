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
            <h1>{courseData.title}</h1>
            {/* <p>{courseData.description || 'No description available'}</p> Null check for description */}
            <h2 style={{ paddingTop: '40px' }}>Instructors</h2>
            <Row>
                {instructors.map(instructor => (
                    <Col key={instructor.id} xs={6} md={6} lg={4} style={{ marginBottom: '20px' }}>
                        <Card style={{ width: '100%' }}>
                            <Card.Img  variant="top" src={instructor.image_url} className="card-img-top rounded-circle mx-auto d-block"  style={{ maxHeight: '250px', width: '250px', objectFit: 'cover' }}  />
                            <Card.Body>
                                <div className="clearfix mb-3">
                                    <span className="float-start badge rounded-pill bg-primary">{instructor.name}</span>
                                </div>
                                <h5 className="card-title">{instructor.description || 'No description available'}</h5>
                                
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
            <h2 style={{ paddingTop: '40px' }}>Organizations</h2>
            <Row>
                {organizations.map(organization => (
                    <Col key={organization.id} xs={6} md={6} lg={4} style={{ marginBottom: '20px' }}>
                          <Card style={{ width: '100%' }}>
                            <Card.Img  variant="top" src={organization.img_url} className="card-img-top mx-auto d-block"  style={{ maxHeight: '250px', width: '250px', objectFit: 'cover' }}  />
                            <Card.Body>
                                <div className="clearfix mb-3">
                                    <span className="float-start badge rounded-pill bg-primary">{organization.name}</span>
                                </div>
                                <h5 className="card-title">{organization.description || 'No description available'}</h5>
                                
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </div>
    );
}

export default CourseDetails;
