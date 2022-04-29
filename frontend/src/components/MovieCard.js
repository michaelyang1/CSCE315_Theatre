

function MovieCard({ name, length, genre, desc, image, ...props }) {
  return (
    <div
      className="w-56 max-w-xs shadow-md hover:bg-slate-100 flex flex-col flex-grow cursor-pointer"
      {...props}
    >
      <img
        src={image}
        alt={`${name} poster`}
        onError={({ currentTarget }) => {
          currentTarget.onerror = null;
          currentTarget.src =
            "https://thumbs.dreamstime.com/b/red-screen-code-inscription-error-190547191.jpg";
        }}
      />
      <div className="flex flex-col flex-1 justify-between p-2">
        <div>
          <h1 className="text-lg font-semibold break-words">
            {name ? name : "Movie Name"}
          </h1>
          <p className="text-sm break-words">
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
