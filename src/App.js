import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchjoke } from "./jokeSlice";

function App() {
  const [category, setCategory] = useState();
  // const [joke, setJoke] = useState();
  const joke = useSelector((state) => {
    return state.joke.joke;
  });

  const dispatch = useDispatch();

  const handleJoke = () => {
    dispatch(fetchjoke(category));
  };

  return (
    <div className="mt-5 ml-4">
      <input
        className="rounded-md p-1 outline-none border border-black w-60"
        onChange={(e) => {
          setCategory(e.target.value);
        }}
      ></input>
      <button
        onClick={handleJoke}
        className="ml-2 rounded-md border border-black py-1 px-1"
      >
        Get From {category}
      </button>
      <h1 className="text-xl mt-2">{joke}</h1>
    </div>
  );
}

export default App;
