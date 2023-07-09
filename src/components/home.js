import React from 'react';
import logo from './IS.jpg';
import { Link  } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap styles

const Home = () => {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <Link className="navbar-brand" to="/">
          <img src={logo} alt="Logo" className="logo" />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item me-2">
              <a href='/'   activeClassName="active" style={{ textDecoration: 'none' ,color:"black"}}>
                Home
              </a>
            </li>
            <li className="nav-item me-2">
              <a href='/employee'   activeClassName="active" style={{ textDecoration: 'none' ,color:"black"}}>
                EmployeeList
              </a>
            </li>
            <li className="nav-item me-2">
              <a href='/addemployee'   activeClassName="active" style={{ textDecoration: 'none',color:"black" }}>
                AddEmployee
              </a>
            </li>
            <li className="nav-item me-2">
              <a href='/tasklist'   activeClassName="active"  style={{ textDecoration: 'none',color:"black" }}>
                TaskList
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
<br></br>
      <div className="container mt-4">
        <h1>Welcome to the Website</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque ut nisi ut massa eleifend malesuada. Donec vitae
          hendrerit velit. Sed commodo blandit neque. Nam in justo non ligula interdum blandit. Fusce cursus volutpat eros,
          non feugiat nulla ultrices ut. Mauris accumsan lobortis justo, a fermentum massa congue non. Duis vel finibus metus.
        </p>
      </div>
    </div>
  );
};

export default Home;
