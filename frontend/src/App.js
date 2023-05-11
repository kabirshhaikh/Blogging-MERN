import './App.css';
import { Routes, Route } from 'react-router-dom';
import Register from './Components/Register';
import Login from './Components/Login';
import AddBlog from './Components/Add-Blog';

const App = () => {
  return (
    <div className="rootContainer">
      <Routes>
        <Route path='/' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/add-blog' element={<AddBlog />} />
      </Routes>
    </div>
  );
}

export default App;
