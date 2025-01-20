import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import SecureRouter from './auth/SecureRouter'
import Login from './components/login/Login'
import Post from './components/post/Post';

function App() {

  return (
    <Router>
      <Routes>
        {/* public route */}
        <Route path='/public/login' element={<Login />} />

        {/* Secured route */}
        <Route path='/secure/post/update' element={
          <SecureRouter requiredRole='ADMIN'>
            <Post />
          </SecureRouter>
        }
        />
      </Routes>
    </Router>
  );

}

export default App
