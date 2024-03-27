import axios from 'axios';

export const fetchMenuItems = async () => {
  try {
    const response = await axios.get('http://localhost:8000/subcategories/');
    const data = response.data; // Récupérer les données
    // Envelopper les données dans un objet avec une clé "Catégories"
    return { Categories: data };
  } catch (error) {
    console.error('Erreur lors de la récupération des données du menu:', error);
    return { Categories: [] }; // Retourner une liste vide en cas d'erreur
  }
};
