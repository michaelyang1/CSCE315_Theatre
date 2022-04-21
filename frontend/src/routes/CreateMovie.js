import { useState } from "react";
import MovieCard from "../components/MovieCard";

function MovieInput({
  name,
  setName,
  length,
  setLength,
  genre,
  setGenre,
  description,
  setDescription,
  imageURL,
  setImageURL,
}) {
  const [nameError, setNameError] = useState(false);
  const [lengthError, setLengthError] = useState(false);
  const [genreError, setGenreError] = useState(false);
  const [descriptionError, setDescriptionError] = useState(false);
  const [imageURLError, setImageURLError] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();

    setNameError(name === "");
    setLengthError(length === "");
    setGenreError(genre === "");
    setDescriptionError(description === "");
    setImageURLError(imageURL === "");

    if (
      name === "" ||
      length === "" ||
      genre === "" ||
      description === "" ||
      imageURL === ""
    ) {
      setError(true);
    } else {
      setError(false);
      alert(
        `pretend the following data was submitted: ${name}, ${length}, ${genre}, ${description}, ${imageURL}`
      );
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2 shadow-md p-4">
      <div className="flex gap-6 max-w-none">
        <div className="w-3/6">
          <label
            htmlFor="name"
            className="uppercase font-semibold tracking-wider"
          >
            Name
          </label>
          <input
            type="text"
            value={name}
            placeholder="Inception"
            onChange={(e) => setName(e.target.value)}
            className={`w-full bg-gray-100 border ${
              nameError ? "border-red-500" : "border-gray-100"
            } focus:bg-white outline-none p-2 rounded focus:border-gray-400`}
            id="name"
          />
        </div>
        <div className="w-1/6">
          <label
            htmlFor="length"
            className="uppercase font-semibold tracking-wider"
          >
            Length
          </label>
          <input
            type="number"
            value={length}
            placeholder="123"
            onChange={(e) => setLength(e.target.value)}
            className={`w-full bg-gray-100 border ${
              lengthError ? "border-red-500" : "border-gray-100"
            } focus:bg-white outline-none p-2 rounded focus:border-gray-400`}
            id="length"
          />
        </div>
        <div className="w-2/6">
          <label
            htmlFor="genre"
            className="uppercase font-semibold tracking-wider"
          >
            Genre
          </label>
          <input
            type="text"
            value={genre}
            placeholder="Action"
            onChange={(e) => setGenre(e.target.value)}
            className={`w-full bg-gray-100 border ${
              genreError ? "border-red-500" : "border-gray-100"
            } focus:bg-white outline-none p-2 rounded focus:border-gray-400`}
            id="genre"
          />
        </div>
      </div>
      <div className="w-full">
        <label
          htmlFor="description"
          className="uppercase font-semibold tracking-wider"
        >
          Description
        </label>
        <textarea
          value={description}
          placeholder="Enter a description for the movie here."
          onChange={(e) => setDescription(e.target.value)}
          className={`w-full h-20 bg-gray-100 border ${
            descriptionError ? "border-red-500" : "border-gray-100"
          } focus:bg-white outline-none p-2 rounded focus:border-gray-400`}
          id="description"
        />
      </div>
      <div className="w-full">
        <label
          htmlFor="imageURL"
          className="uppercase font-semibold tracking-wider"
        >
          Image URL
        </label>
        <input
          type="text"
          value={imageURL}
          placeholder="https://upload.wikimedia.org/wikipedia/en/2/2e/Inception_%282010%29_theatrical_poster.jpg"
          onChange={(e) => setImageURL(e.target.value)}
          className={`w-full bg-gray-100 border ${
            imageURLError ? "border-red-500" : "border-gray-100"
          } focus:bg-white outline-none p-2 rounded focus:border-gray-400`}
          id="imageURL"
        />
      </div>
      <p className={`${error ? "" : "hidden"} text-red-500 text-sm italic`}>
        You cannot submit until all fields have been filled.
      </p>
      <input
        type="submit"
        value="Add Movie"
        className="border text-rose-500 border-rose-500 hover:text-white hover:bg-rose-500 px-4 py-2 font-semibold rounded"
      />
    </form>
  );
}

function CreateMovie() {
  const [name, setName] = useState("");
  const [length, setLength] = useState(0);
  const [genre, setGenre] = useState("");
  const [description, setDescription] = useState("");
  const [imageURL, setImageURL] = useState("");

  return (
    <div className="flex justify-center">
      <div className="w-2/5">
        <h1 className="text-3xl mb-4 uppercase font-thin">Create Movie</h1>
        <div className="flex items-start gap-4">
          <div className="">
            <MovieInput
              name={name}
              setName={setName}
              length={length}
              setLength={setLength}
              genre={genre}
              setGenre={setGenre}
              description={description}
              setDescription={setDescription}
              imageURL={imageURL}
              setImageURL={setImageURL}
            />
          </div>
          <div>
            <MovieCard
              name={name}
              length={length}
              genre={genre}
              desc={description}
              image={imageURL}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateMovie;
