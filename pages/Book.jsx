import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBookDetails , addReview } from '../redux/bookSlice.js';

const BookPage = () => {
  const { id } = useParams(); 
  const dispatch = useDispatch();

  const allState = useSelector((state) => state.book);
  const { book, avgRating, allReview , loading, error } = useSelector((state) => state.book);
  const [newReview, setNewReview] = useState('');
  const [newRating, setNewRating] = useState(5);

  useEffect(() => {
    dispatch(fetchBookDetails(id));
  }, [dispatch, id]);

  const handleSubmitReview = (e) => {
    e.preventDefault();

    const reviewData = {
      reviewText: newReview,
      rating: newRating,
    };

    dispatch(addReview({ bookId: id, review: reviewData }));
    setNewReview('');
    setNewRating(5);
    setTimeout(() => {
      window.location.reload();
    },2000)
  };

  if (allState.loading) return <div>Loading...</div>;
  if (allState.error) return <div>Error: {error}</div>;
  if (!book) return <div>No book found</div>;

  return (
    <div className="h-dvh w-full flex items-center justify-center">
        <div className="container mx-auto p-6 bg-white h-[90dvh] overflow-auto max-sm:h-[90dvh] text-black rounded-lg shadow-lg shadow-cyan-200">
      <h1 className="text-3xl font-bold">{book.title}</h1>
      <p className="text-lg text-gray-600">by {book.author}</p>
      <p className="mt-4">{book.description}</p>
      <div className="mt-6">
        <h2 className="text-2xl font-semibold">Average Rating: {avgRating.toFixed(1)} / 5</h2>
      </div>
      <div className="mt-6">
        <h3 className="text-xl font-semibold">Reviews</h3>
        {allReview?.length > 0 ? (
          <ul className="space-y-4 mt-4 h-56 overflow-auto">
            {allReview.map((rev) => (
              <li key={rev._id} className="bg-gray-100 p-4 rounded-lg">
                {/* <p className="font-semibold">{rev.review.user}</p> */}
                <p className='text-black'>{rev.reviewText}</p>
                <p className="text-sm text-gray-500">Rating: {rev.rating} / 5</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No reviews yet. Be the first to review!</p>
        )}
        <form onSubmit={handleSubmitReview} className="mt-6">
          <h4 className="text-lg font-semibold">Leave a Review</h4>
          <textarea
            value={newReview}
            onChange={(e) => setNewReview(e.target.value)}
            className="w-full p-3 mt-2 border rounded-lg"
            placeholder="Write your review..."
            required
          ></textarea>
          <div className="mt-4">
            <label htmlFor="rating" className="text-sm">Rating:</label>
            <select
              id="rating"
              value={newRating}
              onChange={(e) => setNewRating(Number(e.target.value))}
              className="w-full p-2 mt-2 border rounded-lg"
            >
              {[1, 2, 3, 4, 5].map((rating) => (
                <option key={rating} value={rating}>
                  {rating} / 5
                </option>
              ))}
            </select>
          </div>
          <button
            type="submit"
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg"
          >
            Submit Review
          </button>
        </form>
      </div>
        </div>
    </div>
  );
};

export default BookPage;
