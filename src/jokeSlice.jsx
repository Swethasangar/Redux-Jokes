import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// const fetchJoke = (category) => {
//     axios
//       .get(
//         `https://api.chucknorris.io/jokes/random?category=${category}`
//       )
//       .then((result) => {
//         console.log(result.data.value);
//         setJoke(result.data.value)
//         //   setJoke(result.data.value);
//       //   state.joke = result.data.value
//       });
//   }

const fetchjoke = createAsyncThunk(
  "jokes/jokecategory",
  async function (category) {
    try {
      // Available Categories
      const categoriesRes = await axios.get(
        `https://api.chucknorris.io/jokes/categories`
      );
      const categories = categoriesRes.data;

      // Check if the Categories Exists
      if (!categories.includes(category)) {
        return `Error:"No jokes for category "${category}" found".|||Available lists are: ${categories.join(
          ", "
        )}`;
      }
      return axios
        .get(`https://api.chucknorris.io/jokes/random?category=${category}`)
        .then((result) => {
          console.log(result.data.value);
          return result.data.value;
          // setJoke(result.data.value)
          //   setJoke(result.data.value);
          //   state.joke = result.data.value
        });
    } catch (error) {
      return "Error Fetching Data.Please Try Again.";
    }
  }
);

const initialState = {
  joke: "No Joke",
};

const jokeSlice = createSlice({
  name: "joke",
  initialState,
  reducers: {},
  extraReducers: (build) => {
    build
      .addCase(fetchjoke.pending, () => {
        console.log("Loading...");
      })
      .addCase(fetchjoke.fulfilled, (state, action) => {
        state.joke = action.payload;
      });
  },
});

export default jokeSlice;

// const { fetchjoke } = jokeSlice.actions;

export { fetchjoke };
