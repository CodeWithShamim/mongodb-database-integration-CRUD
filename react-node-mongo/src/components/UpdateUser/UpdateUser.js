import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";

const UpdateUser = () => {
  const { id } = useParams();
  const nameRef = useRef("");
  const emailRef = useRef("");
  const [user, setUser] = useState({});
  useEffect(() => {
    fetch(`http://localhost:5000/users/${id}`)
      .then((res) => res.json())
      .then((data) => setUser(data));
  }, []);

  const handleUpdateUser = (e) => {
    e.preventDefault();
    const name = nameRef.current.value;
    const email = emailRef.current.value;
    console.log(name, email);
    const updatedUser = { name, email };

    // send data to server
    const url = `http://localhost:5000/users/${id}`;
    fetch(url, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(updatedUser),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        alert("Successfully add data!");
        e.target.reset();
      });
  };

  return (
    <div>
      <h1>Updated Id: {user.name}</h1>
      <form onSubmit={handleUpdateUser}>
        <input
          ref={nameRef}
          type="text"
          name="name"
          id="name"
          placeholder="Name"
          required
        />
        <input
          ref={emailRef}
          type="email"
          name="email"
          id="email"
          placeholder="Email"
          required
        />
        <input type="submit" value="Add user" />
      </form>
    </div>
  );
};

export default UpdateUser;
