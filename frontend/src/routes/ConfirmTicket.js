function TicketInfo({ userID, movieID, showingID, seatIDS }) {
  return (
    <div className="shadow-md max-w-2xl flex">
      <img
        src="https://upload.wikimedia.org/wikipedia/en/2/2e/Inception_%282010%29_theatrical_poster.jpg"
        alt="inception poster"
      />
      <div className="p-4 flex flex-col justify-between relative">
        <p className="bg-orange-400 px-2 py-1 rounded font-bold absolute top-4 right-4 shadow-md shadow-orange-300">
          IMAX
        </p>
        <div className="space-y-2">
          <h1 className="text-4xl">Inception</h1>
          <div>
            <h2 className="italic">April 25, 9:30 PM</h2>
            <div className="flex">
              <h2 className="uppercase font-bold">Seat&nbsp;</h2>
              {seatIDS.map((seatID) => (
                <h1>{seatID}</h1>
              ))}
            </div>
          </div>
          <p>
            A thief who steals corporate secrets through the use of
            dream-sharing technology is given the inverse task of planting an
            idea into the mind of a C.E.O., but his tragic past may doom the
            project and his team to disaster.
          </p>
        </div>
        <div className="flex justify-between">
          <h2 className="italic">Action</h2>
          <h2 className="font-semibold">148 min</h2>
        </div>
      </div>
    </div>
  );
}

function ConfirmTicket({ userID, movieID, showingID, seatIDS }) {
  return (
    <div>
      <h1 className="text-3xl mb-4 uppercase font-thin">Confirm Ticket</h1>
      <TicketInfo
        userID={userID}
        movieID={movieID}
        showingID={showingID}
        seatIDS={seatIDS}
      />
    </div>
  );
}

export default ConfirmTicket;
