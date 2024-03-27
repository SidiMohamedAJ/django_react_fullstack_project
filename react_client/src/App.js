import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import NavbarMenu from './components/Navbar';
import ShowCategories from './components/showCategories';

function App() {
  return (
    <div className="App">
      <div>
        <Router>
          <NavbarMenu />
          <Routes>
            <Route path="/" element={<ShowCategories />} />
          </Routes>
        </Router>
      </div>
    </div>
  );
}

export default App;