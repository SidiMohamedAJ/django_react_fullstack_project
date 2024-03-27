import React, {useState, useEffect} from 'react';
import { Card } from 'react-bootstrap';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ShowCategories = () => {
  const [categories, setCategories] = useState([]);

  const fetchCategories = async () => {
    const result = await axios.get('http://localhost:8000/categories/');
    console.log(result.data);
    setCategories(result.data);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="cards-container">
      {categories.map((categorie, index) => (
        <Link to={`details_categorie/${categorie.id}`}>
          <Card className="m-3 rounded shadow-lg" style={{ width: '22em' }}>
            <Card.Body>
              <Card.Title>{categorie.name}</Card.Title>
              <Card.Text>{categorie.description}</Card.Text>
            </Card.Body>
          </Card>
        </Link>
      ))}
    </div>
  );
};

export default ShowCategories;
