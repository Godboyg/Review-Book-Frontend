import React, { use, useEffect, useRef, useState } from 'react'
import axios from "axios"
import "../src/App.css"
import { Link } from 'react-router-dom';
import AddBook from '../Components/AddBook';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function Home() {
    const [books, setBooks] = useState([]);
    const [ password, setPassword ] = useState();
    const [ search, setSearch ] = useState();
    const [loading, setLoading] = useState(true);
    const [isVisible , setIsVisible] = useState(false);
    const [BisVisible , setBIsVisible] = useState(false);
    const navigate = useNavigate()

    const { user , isAuthenticated} = useSelector((state) => state.demoAuth);
    console.log(user);
    useEffect(()=>{
      if(isAuthenticated){
        console.log("logged in");
      }else{
        navigate("/");
      }
    },[])

    const api = import.meta.env.VITE_URL;

  useEffect(() => {
    const fetchFeaturedBooks = async () => {
      try {
        const res = await fetch(`${api}/books?limit=10`);
        const data = await res.json();
        console.log("data",data.books);
        if (res.ok) setBooks(data.books || []);
        else console.error(data.error);
      } catch (err) {
        console.error('Error fetching books:', err);
      } finally {
        setTimeout(()=>{
          setLoading(false);
        },500);
      }
    };

    fetchFeaturedBooks();
  }, []);

    useEffect(()=>{
        axios.get(`${api}/`).then((res)=>{
            console.log("response",res);
        })
    },[])

    const handleAddBook = (e) => {
      e.preventDefault();
      setIsVisible(!isVisible);
    }

    const handleCheckPass = (e) => {
      e.preventDefault()
      if(password === "admin_here"){
        console.log("correct password");
        alert("U Can Add Books");
        setBIsVisible(true);
      }
      else{
        alert("contact admin || Wrong Password");
      }
    }

    useEffect(()=>{

      const res = async() => {
        const response = await axios.post(`${api}/book`,{ title : search });
        if (response.ok === undefined) setBooks(response.data || []);
      }

      res();

    },[search])
    
  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="relative flex items-center justify-between bg-black p-3">
       <h1 className="text-3xl max-sm:text-2xl font-black hover:cursor-pointer" onClick={() => window.location.reload()}>📚 Featured Books</h1>
       <div className="h-12 p-4 hover:cursor-pointer w-12 rounded-full text-black bg-cyan-400 flex items-center justify-center" onClick={() => navigate(`/user/${user._id}`)}>
        Profile
       </div>
       <div className="text-xl flex items-center justify-center p-3 max-sm:text-[4.5vw] font-bold hover:cursor-pointer border border-cyan-400 rounded-md" onClick={handleAddBook}>Add Book</div>
      </div>
      <div className="p-4 sticky top-5 h-28 overflow-hidden bg-black transition-all flex items-center justify-center shadow-lg shadow-cyan-300 mt-5 rounded-full">
        <fieldset className='relative border-2 p-6 border-cyan-300 w-full mt-[-10px] rounded-full overflow-auto'>
          <legend className='px-2 font-bold text-white'>Search</legend>
          <input type="text" className='absolute top-2 border-none outline-none w-[73vw] px-3' placeholder='Search Book...' value={search} onChange={(e) => setSearch(e.target.value)} />
        </fieldset>
      </div>
      <div className={`absolute bg-gray-900 max-sm:right-6 max-md:right-6 right-40 top-25 max-sm:top-26 h-28 w-56 p-2 rounded-lg transition-all duration-300 ease-in-out max-sm:shadow-cyan-900 max-ms:shadow-xl ${ isVisible ? "scale-100 opacity-100 shadow-xl shadow-white" : "scale-0 opacity-0"} overflow-hidden`}>
        <input type="text" placeholder='Enter Password....' value={password} onChange={(e) => setPassword(e.target.value)} className="rounded-lg border border-cyan-200 outline-none px-3 py-2"/>
        <button className='border-2 hover:cursor-pointer border-cyan-600 rounded-md p-2 mt-3' onClick={handleCheckPass}>Check</button>
      </div>
      {
        BisVisible && (
          <AddBook visible={() => setBIsVisible(false)} />
        )
      }
      {loading ? (
        <div className="text-center text-xl mt-10">Loading books.....</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-5">
          {books.length > 0 ? (
            books.map((book) => (
              <Link to={`/books/${book._id}`} key={book._id}>
                <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition p-4 h-full">
                  <h2 className="text-lg font-semibold mb-1 text-black">{book.title}</h2>
                  <p className="text-sm text-gray-500 mb-2">by {book.author}</p>
                  <p className="text-sm text-gray-700 line-clamp-3">
                    {book.description || 'No description available.'}
                  </p>
                </div>
              </Link>
            ))
          ) : (
            <div className="text-xl text-center font-bold flex items-center justify-center mt-10">No books found.</div>
          )}
        </div>
      )}
    </div>
  )
}

export default Home
