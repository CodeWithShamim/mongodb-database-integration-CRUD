import React, { useRef } from "react";

const AddUsers = () => {
  const nameRef = useRef("");
  const emailRef = useRef("");

  const handleUserSubmit = (e) => {
    e.preventDefault();
    const name = nameRef.current.value;
    const email = emailRef.current.value;
    console.log(name, email);
    const users = { name, email };

    // send data to server
    fetch("http://localhost:5000/users", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(users),
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
      <h1>Add user</h1>
      <form onSubmit={handleUserSubmit}>
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

export default AddUsers;
