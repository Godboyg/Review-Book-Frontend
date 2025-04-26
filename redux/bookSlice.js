import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchBookDetails = createAsyncThunk(
  'book/fetchBookDetails',
  async (bookId) => {
    const response = await fetch(`/api/${bookId}`);
    if (!response.ok) throw new Error('Failed to fetch book details');
    const res = await response.json();
    console.log(res);
    return res;
  }
);

export const addReview = createAsyncThunk(
    'book/addReview',
    async ({ bookId, review }) => {
      const response = await fetch(`/api/addReviews`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ bookId, ...review }),
      });
      if (!response.ok) throw new Error('Failed to submit review');
      const res = await response.json();
      console.log("add review",res);
      return res;
    }
  );

const bookSlice = createSlice({
  name: 'book',
  initialState: {
    allReview: [], 
    books: [],
    book : {},
    avgRating: 0,
    loading: false,
    error: null,
  },
  reducers: {
    // Other actions can be added here if needed
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBookDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBookDetails.fulfilled, (state, action) => {
        state.book = action.payload.book;
        state.allReview = action.payload.book.reviews;
        state.avgRating = action.payload.avgRating;
        state.loading = false;
      })
      .addCase(fetchBookDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // .addCase(addReview.fulfilled, (state, action) => {
      //   if(state.allReview){
      //       state.allReview.push(action.payload);
      //   }
      // })
      .addCase(addReview.rejected, (state, action) => {
        state.error = action.error.message;
      });
  },
});

export default bookSlice.reducer;