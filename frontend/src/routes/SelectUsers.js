import axios from "axios";
import { useEffect, useState } from "react";
import { BiPencil } from "react-icons/bi";
import { IoClose } from "react-icons/io5";
import { RiFilePaper2Line } from "react-icons/ri";
import { useHistory } from "react-router-dom";

function UserCard({
  id,
  admin,
  firstName,
  lastName,
  phoneNumber,
  username,
  setReload,
}) {
  const [deleteHover, setDeleteHover] = useState(false);

  const navigate = useHistory();

  const handleProfile = () => {
    navigate.push(`/viewProfile/${id}`);
  };

  const handleEdit = () => {
    navigate.push(`/updateUser/${id}`);
  };
/*Contributed by Nadxhieli Juarez */
  const handleDelete = () => {
    /*Deletes our user */
    axios
      .delete("/users", {
        data: {
          userID: id,
        },
      })
      .then(() => setReload((r) => !r));
  };

  return (
    <div className="relative group min-w-fit w-32">
      <div
        className={`p-4 relative shadow-md flex flex-col justify-items-end gap-4 group-hover:blur-sm transition ease-in-out h-full ${
          deleteHover ? "bg-red-500" : ""
        }`}
      >
        <div>
          <h1 className="text-3xl font-open">{username}</h1>
          <h2 className="font-open">
            {firstName} {lastName}
          </h2>
          <h2 className="font-mono">{phoneNumber}</h2>
        </div>
        {!!admin && (
          <p className="bg-purple-600 text-white px-2 py-1 rounded ml-auto text-sm">
            Admin
          </p>
        )}
      </div>

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 group-hover:flex gap-4 hidden">
        <RiFilePaper2Line className="w-6 h-auto" onClick={handleProfile} />
        {!admin && (
          <>
            <BiPencil className="w-6 h-auto" onClick={handleEdit} />
            <IoClose
              className="w-6 h-auto fill-red-500 hover:fill-black"
              onClick={handleDelete}
              onMouseEnter={() => setDeleteHover(true)}
              onMouseLeave={() => setDeleteHover(false)}
            />
          </>
        )}
      </div>
    </div>
  );
}

function UserGrid() {
  const [users, setUsers] = useState([]);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    axios.get("/users").then((res) => setUsers(res.data));
  }, [reload]);

  return (
    <div className="flex flex-wrap items-stretch gap-4">
      {users.map((user) => (
        <UserCard
          key={user.Username}
          id={user.User_ID}
          admin={user.Admin_Status}
          firstName={user.First_Name}
          lastName={user.Last_Name}
          phoneNumber={user.Phone_Number}
          username={user.Username}
          setReload={setReload}
        />
      ))}
    </div>
  );
}

function SelectUsers() {
  return (
    <div>
      <h1 className="text-3xl uppercase font-thin mb-4">Select Users</h1>
      <UserGrid />
    </div>
  );
}

export default SelectUsers;
