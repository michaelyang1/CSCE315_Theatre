import axios from "axios";
import { useEffect, useState } from "react";
import { BsStarFill, BsTextCenter } from "react-icons/bs";

// Contributed by David Erdner, as part of the Create Theater Review feature set (Feature Set 4)
function ReviewCard({ Star_rating, Review, time }) {
  return (
    <center>
      <div className="w-200 max-w-xs shadow-md hover:bg-slate-100 flex flex-col flex-grow cursor-pointer">
        <div className="flex flex-col flex-1 justify-between p-2">
          <div>
            <h1 className="text-lg font-semibold break-words">
              {Star_rating} stars
              {/* <BsStarFill
              className={`w-4 h-auto transition ease-in-out ${
                (Star_rating)
                  ? "fill-amber-300"
                  : "fill-neutral-200"
              }`}
            />
 */}
            </h1>
            <p className="italic">
              {time
                ? new Date(time).toLocaleString("default", {
                    month: "2-digit",
                    day: "2-digit",
                    year: "2-digit",
                    hour: "numeric",
                    minute: "numeric",
                  })
                : "Time..."}
            </p>
            <p className="text-sm break-words">
              {Review ? Review : "Reivew..."}
            </p>
          </div>
        </div>
      </div>
    </center>
  );
}

function ReviewList({ reload }) {
  const [reviews, setReviews] = useState([]);
  useEffect(() => {
    axios.get("/reviews").then((res) => {
      setReviews(res.data);
    });
  }, [reload]);
  return (
    <div>
      {reviews.map((review) => (
        <ReviewCard
          Star_rating={review.Star_Rating}
          Review={review.Review}
          time={review.Time_Posted}
        />
      ))}
    </div>
  );
}

function StarRating({ hover, setHover, rating, setRating }) {
  return (
    <div className="flex">
      {[...Array(5)].map((_val, index) => {
        index++;
        return (
          <div
            key={index}
            onMouseEnter={() => setHover(index)}
            onMouseLeave={() => setHover(rating)}
            onClick={() => setRating(index)}
            className="p-2 first:pl-0 last:pr-0"
          >
            <BsStarFill
              className={`w-8 h-auto transition ease-in-out ${
                (hover !== rating && index <= hover) ||
                (hover === rating && index <= rating)
                  ? "fill-amber-300"
                  : "fill-neutral-200"
              }`}
            />
          </div>
        );
      })}
    </div>
  );
}

function Review({ username, verified, user, reload, setReload }) {
  const [hover, setHover] = useState(0);
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [time, setTime] = useState(
    new Date().toLocaleString("default", {
      hour: "numeric",
      minute: "numeric",
    })
  );
  const [error, setError] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(
        new Date().toLocaleString("default", {
          hour: "numeric",
          minute: "numeric",
        })
      );
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleClick = () => {
    if (review === "" || rating === 0) {
      setError(true);
    } else {
      setError(false);
      //alert(
      //  `pretend to submit this review: ${rating}, ${new Date().toLocaleString()}, ${review}`
      //);
      axios
        .post("/reviews", {
          userID: 4,
          rating: rating,
          review: review,
          time: new Date(),
        })
        .then(() => {
          setRating(0);
          setReview("");
          setReload(!reload);
        });
    }
  };

  return (
    <div className="shadow-md p-4 flex flex-col gap-2">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-light">{username}</h1>
        {verified && (
          <p className="text-white px-2 py-1 text-sm font-semibold bg-emerald-500 rounded-full uppercase shadow-md shadow-emerald-200">
            Verified
          </p>
        )}
      </div>
      <div className="flex justify-between items-end">
        <div className="flex items-center gap-4">
          <StarRating
            hover={hover}
            setHover={setHover}
            rating={rating}
            setRating={setRating}
          />
          <h2 className="text-2xl font-mono">
            <span className={`${rating === 0 ? "text-red-500" : ""}`}>
              {rating}
            </span>
            /5
          </h2>
        </div>
        <p>{time}</p>
      </div>
      <textarea
        value={review}
        onChange={(e) => setReview(e.target.value)}
        placeholder="Enter a review of the 310 Theater here."
        id="review"
        required
        className="w-full bg-gray-100 border invalid:border-red-500 border-gray-100 focus:bg-white outline-none p-2 rounded focus:border-gray-400 h-32"
      />
      <p className={`${!error ? "hidden" : ""} text-red-500 italic text-sm`}>
        Cannot submit review until all fields are filled.
      </p>
      <div>
        <button
          className="border border-emerald-500 text-emerald-500 hover:bg-emerald-500 hover:text-white px-4 py-2 rounded font-semibold hover:shadow-md hover:shadow-emerald-200"
          onClick={handleClick}
        >
          Create Review
        </button>
      </div>
    </div>
  );
}

function CreateReview({ user }) {
  const [reload, setReload] = useState(false);
  return (
    <div className="flex justify-center">
      <div className="w-2/5 flex flex-col gap-4">
        <h1 className="text-3xl uppercase font-thin">Create Review</h1>
        {
          <Review
            username={"Donuts"}
            verified={true}
            user={user}
            reload={reload}
            setReload={setReload}
          />
        }
        <ReviewList reload={reload} />
      </div>
    </div>
  );
}

export default CreateReview;
