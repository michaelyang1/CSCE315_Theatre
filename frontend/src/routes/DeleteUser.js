import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function DeleteUser() {

  const [userId, setuserID] = useState("");

  function handleSubmit(){
    console.log("trying to delete!, this user: ", userId)
    axios
      .delete("/users", {
        body: {
            id: userId,
        },
      })
      .then((res) => {
        const user = res.data[0];
      });
    }

  return (
    <div className="font-mono">
      <h1>Enter the id of the user you want to delete:</h1>
      <input
                  type="id"
                  value={userId}
                  onChange={(e) => setuserID(e.target.value)}
                  placeholder="id"
                  id="id"
                  required
                  className="w-full bg-gray-100 border invalid:border-red-500 border-gray-100 focus:bg-white outline-none p-2 rounded focus:border-gray-400"
                />
                <button onClick={handleSubmit}> Delete</button>
    </div>
  );
}

export default DeleteUser;
