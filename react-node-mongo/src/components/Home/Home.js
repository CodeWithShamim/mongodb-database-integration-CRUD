import React, { useEffect, useState } from "react";

const Home = () => {
  const [users, setUsers] = useState([]);

  // load data from mongo
  useEffect(() => {
    fetch("http://localhost:5000/users")
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, []);
  return (
    <div>
      <h1>Users: {users.length}</h1>
      {users.map((user) => (
        <h3>{user.email}</h3>
      ))}
    </div>
  );
};

export default Home;
