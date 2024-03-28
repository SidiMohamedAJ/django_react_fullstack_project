import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import NavbarMenu from './components/Navbar';
import CoursesBySubcategory from './components/CoursesBySubcategory';
import TopRatedCourses from './components/TopRatedCourses';

function App() {
  return (
    <div className="App">
      <div>
        <Router>
          <NavbarMenu />
          <Routes>
            <Route path="/" element={<TopRatedCourses />} />
            <Route path="/coursesby_subcategory/:id/" element={<CoursesBySubcategory />} />
          </Routes>
        </Router>
      </div>
    </div>
  );
}

export default App;