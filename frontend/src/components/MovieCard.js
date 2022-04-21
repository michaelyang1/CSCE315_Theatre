function MovieCard({ name, length, genre, desc, image, ...props }) {
  return (
    <div
      className="w-52 shadow-md hover:bg-slate-100 flex flex-col cursor-pointer"
      {...props}
    >
      <img src={image} alt={`${name} poster`} />
      <div className="flex flex-col flex-1 justify-between p-2">
        <div>
          <h1 className="text-lg font-semibold">
            {name ? name : "Movie Name"}
          </h1>
          <p className="text-sm">
            {desc ? desc : "This is an example description."}
          </p>
        </div>
        <div className="flex justify-between">
          <p className="italic">{genre ? genre : "Genre"}</p>
          <p className="font-semibold">{length ? length : 0} min</p>
        </div>
      </div>
    </div>
  );
}

export default MovieCard;
