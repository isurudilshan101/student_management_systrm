import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        {/* <a className="navbar-brand" href="#">Navbar</a> */}
        <Link className="nav-link" to="#">
          LOGO
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              {/* <a className="nav-link" href="#">Home <span className="sr-only"></span></a> */}
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              {/* <a className="nav-link" href="#">Create Student</a> */}
              <Link className="nav-link" to="/add">
                Create Student
              </Link>
            </li>
          </ul>
          {/* <form className="form-inline my-2 my-lg-0">
          <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"/>
          <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
        </form> */}
        </div>
      </nav>
    </div>
  );
};

export default Header;
