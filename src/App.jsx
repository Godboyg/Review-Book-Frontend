import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from '../pages/Home';
import UserProfile from '../pages/UserProfile';
import Book from '../pages/Book';
// import BookList from '../pages/BookList';
import Login from '../pages/Login';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/user/:id" element={<UserProfile />} />
        {/* <Route path="/books" element={<BookList />} /> */}
        <Route path="/books/:id" element={<Book />} />
        <Route path="/home" element={<Home />} />
        <Route path="/" element={<Login />} />
        {/* <Route path="/about" element={<About />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
