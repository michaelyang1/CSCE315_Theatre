import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { IoCheckmarkOutline, IoCloseOutline } from "react-icons/io5";
import { useHistory } from "react-router-dom";

function ButtonBox({ userID, showingID, seatIDS }) {
  const history = useHistory();

  const handleConfirm = async () => {
    for await (const seatID of seatIDS) {
      axios.post("/tickets", {
        userID: userID,
        seatID: seatID,
        showingID: showingID,
      });
    }
  };
  const handleCancel = useCallback(() => history.push("/"), [history]);

  return (
    <div className="flex justify-between">
      <IoCheckmarkOutline
        className="w-12 h-auto stroke-neutral-200 hover:stroke-green-500 transition ease-in-out"
        onClick={async () => {
          await handleConfirm();
          handleCancel();
        }}
      />
      <IoCloseOutline
        className="w-12 h-auto stroke-neutral-200 hover:stroke-red-500 transition ease-in-out"
        onClick={handleCancel}
      />
    </div>
  );
}

function TicketInfo({ userID, showingID, seatIDS }) {
  const [showing, setShowing] = useState({});
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    axios
      .get("/temp-showings", {
        params: {
          showing: showingID,
        },
      })
      .then((res) => {
        setShowing(res.data[0]);
        setLoaded(true);
      });
  }, [showingID]);

  if (loaded) {
    return (
      <div className="shadow-md flex">
        <div className="flex">
          <img src={showing.Image_URL} alt={showing.Name} />
          <div className="p-4 flex flex-col justify-between relative w-full">
            <p
              className={`${
                showing.IMAX ? "" : "hidden"
              } bg-orange-400 px-2 py-1 rounded font-bold absolute top-4 right-4 shadow-md shadow-orange-300`}
            >
              IMAX
            </p>
            <div className="space-y-2">
              <h1 className="text-4xl">{showing.Name}</h1>
              <div>
                <h2 className="font-semibold">
                  {new Date(showing.Date_Time).toLocaleString("default", {
                    month: "long",
                    day: "numeric",
                    hour: "numeric",
                    minute: "numeric",
                  })}
                </h2>
                <div className="flex">
                  <h2 className="uppercase font-bold">Seat&nbsp;</h2>
                  {seatIDS.join(", ")}
                </div>
              </div>
              <p>{showing.Description}</p>
            </div>
            <ButtonBox
              userID={userID}
              showingID={showingID}
              seatIDS={seatIDS}
            />
          </div>
        </div>
      </div>
    );
  } else {
    return <></>;
  }
}

function ConfirmTicket({ userID, showingID, seatIDS }) {
  return (
    <div className="flex justify-center">
      <div className="w-2/5">
        <h1 className="text-3xl mb-4 uppercase font-thin">Confirm Ticket</h1>
        <div className="flex gap-4">
          <TicketInfo userID={userID} showingID={showingID} seatIDS={seatIDS} />
          {/* <ButtonBox /> */}
        </div>
      </div>
    </div>
  );
}

export default ConfirmTicket;
