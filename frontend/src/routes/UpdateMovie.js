import { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";
import axios from "axios";
import { useParams } from "react-router-dom";

// Contributed by Michael Yang
function Field({
  value,
  setValue,
  success,
  placeholder,
  label,
  id,
  type = "text",
}) {
  const className = `w-full bg-gray-100 border  ${
    success ? "border-emerald-500" : "invalid:border-red-400"
  } border-gray-100 focus:bg-white outline-none p-2 rounded focus:border-gray-400`;

  return (
    <>
      <label htmlFor={id} className="uppercase font-semibold tracking-wider">
        {label}
      </label>
      {type !== "textarea" ? (
        <input
          type={type}
          value={value}
          placeholder={placeholder}
          onChange={(e) => setValue(e.target.value)}
          required
          className={className}
          id={id}
        />
      ) : (
        <textarea
          value={value}
          placeholder={placeholder}
          onChange={(e) => setValue(e.target.value)}
          required
          className={className}
          id={id}
        />
      )}
    </>
  );
}

function MovieInput({
  id,
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
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();

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

      axios
        .patch("/movies", {
          movieID: id,
          name: name,
          length: length,
          genre: genre,
          desc: description,
          imageURL: imageURL,
        })
        .then(() => {
          setSuccess(true);
          setTimeout(() => setSuccess(false), 5000);
        });
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-2 shadow-md p-4"
      noValidate
    >
      <div className="flex gap-6">
        <div className="w-3/6">
          <Field
            value={name}
            setValue={setName}
            success={success}
            placeholder="Inception"
            label="Name"
            id="name"
          />
        </div>
        <div className="w-1/6">
          <Field
            value={length}
            setValue={setLength}
            success={success}
            placeholder="123"
            label="Length"
            id="length"
            type="number"
          />
        </div>
        <div className="w-2/6">
          <Field
            value={genre}
            setValue={setGenre}
            success={success}
            placeholder="Action"
            label="Genre"
            id="genre"
          />
        </div>
      </div>
      <div>
        <Field
          value={description}
          setValue={setDescription}
          success={success}
          placeholder="Enter a description for the movie here."
          label="Description"
          id="description"
          type="textarea"
        />
      </div>
      <div className="w-full">
        <Field
          value={imageURL}
          setValue={setImageURL}
          success={success}
          placeholder="https://upload.wikimedia.org/wikipedia/en/2/2e/Inception_%282010%29_theatrical_poster.jpg"
          label="Image URL"
          id="imageURL"
        />
      </div>
      <p className={`${error ? "" : "hidden"} text-red-500 text-sm italic`}>
        You cannot submit until all fields are filled.
      </p>
      <p
        className={`${
          success ? "" : "hidden"
        } text-emerald-500 text-sm italic transition ease-in-out duration-300`}
      >
        Sucessfully updated movie!
      </p>
      <input
        type="submit"
        value="Update Movie"
        className="border text-teal-500 border-teal-500 hover:text-white hover:bg-teal-500 hover:shadow-md hover:shadow-teal-300 px-4 py-2 font-semibold rounded"
      />
    </form>
  );
}

function UpdateMovie() {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [length, setLength] = useState("");
  const [genre, setGenre] = useState("");
  const [description, setDescription] = useState("");
  const [imageURL, setImageURL] = useState("");

  useEffect(() => {
    axios
      .get("/movies", {
        params: {
          movieID: id,
        },
      })
      .then((res) => {
        const movie = res.data[0];
        setName(movie.Name);
        setLength(movie.Length);
        setGenre(movie.Primary_Genre);
        setDescription(movie.Description);
        setImageURL(movie.Image_URL);
      });
  }, [id]);

  return (
    <div className="flex justify-center">
      <div className="w-2/5">
        <h1 className="text-3xl mb-4 uppercase font-thin">Update Movie</h1>
        <div className="flex items-start gap-4">
          <div>
            <MovieInput
              id={id}
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

export default UpdateMovie;
