// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;

import { useEffect, useState } from "react";

function App() {

  const [users, setUsers] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });

  const fetchUsers = async () => {

    const response = await fetch(
      "http://localhost:8000/api/users/"
    );

    const data = await response.json();

    setUsers(data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    await fetch(
      "http://localhost:8000/api/users/",
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(formData),
      }
    );

    setFormData({
      name: "",
      email: "",
    });

    fetchUsers();
  };

  return (
    <div className="container">

      <h1>Docker Compose Learning Project</h1>

      <form onSubmit={handleSubmit}>

        <input
          type="text"
          name="name"
          placeholder="Enter Name"
          value={formData.name}
          onChange={handleChange}
        />

        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          value={formData.email}
          onChange={handleChange}
        />

        <button type="submit">
          Save User
        </button>

      </form>

      <div className="users">

        <h2>Saved Users</h2>

        {
          users.map((user) => (
            <div
              className="user-card"
              key={user.id}
            >
              <p>Name: {user.name}</p>
              <p>Email: {user.email}</p>
            </div>
          ))
        }

      </div>

    </div>
  );
}

export default App;