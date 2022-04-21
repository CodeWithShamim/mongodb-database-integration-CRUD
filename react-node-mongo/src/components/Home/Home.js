import React, { useEffect, useState } from "react";

const Home = () => {
  const [users, setUsers] = useState([]);

  // load data from mongo
  useEffect(() => {
    fetch("http://localhost:5000/users")
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, []);

  const handleUserDelete = (id) => {
    const proceed = window.confirm("Are you sure you want to delete!!");
    console.log(proceed, id);
    if (proceed) {
      const url = `http://localhost:5000/user/${id}`;
      fetch(url, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.deletedCount > 0) {
            const remaining = users.filter((user) => user._id !== id);
            setUsers(remaining);
            alert("Congrats, Successfully deleted");
          }
        });
    }
  };
  return (
    <div>
      <h1>Users: {users.length}</h1>
      {users.map((user) => (
        <div key={user._id}>
          <h3>
            {user.email}{" "}
            <button onClick={() => handleUserDelete(user._id)}>X</button>
          </h3>
        </div>
      ))}
    </div>
  );
};

export default Home;
