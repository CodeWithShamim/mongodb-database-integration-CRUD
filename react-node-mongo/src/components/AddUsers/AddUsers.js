import React, { useState } from "react";

const AddUsers = () => {
  const [users, setUsers] = useState("");
  const handleUserSubmit = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    console.log(name, email);
    const user = { name, email };
    setUsers(user);

    // send data to server
    fetch("http://localhost:5000/users", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(users),
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
  };

  return (
    <div>
      <h1>Add user</h1>
      <form onSubmit={handleUserSubmit}>
        <input type="text" name="name" id="name" placeholder="Name" />
        <input type="email" name="email" id="email" placeholder="Email" />
        <input type="submit" value="Add user" />
      </form>
    </div>
  );
};

export default AddUsers;
