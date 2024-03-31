import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import NavbarMenu from './components/Navbar';
import CoursesBySubcategory from './components/CoursesBySubcategory';
import TopRatedCourses from './components/TopRatedCourses';
import CourseDetails from './components/CourseDetails'
import SearchQuery from "./components/SearchQuery";

function App() {
  return (
    <div className="App">
      <div>
        <Router>
          <NavbarMenu />
          <Routes>
            <Route path="/" element={<TopRatedCourses />} />
            <Route path="/SearchQuery" element={<SearchQuery />} />
            <Route path="/coursesby_subcategory/:id/" element={<CoursesBySubcategory />} />
            <Route path="/detail_courses/:id/" element={<CourseDetails />} />
          </Routes>
        </Router>
      </div>
    </div>
  );
}

export default App;