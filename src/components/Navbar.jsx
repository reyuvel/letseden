import React from 'react'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
  const navigate = useNavigate();  // Correctly use the hook inside the component

  const handleClick = () => {
    navigate('/');
  };
  return (
    <div id="letseden">
        <nav class="navbar navbar-expand-lg shadow">
  <div class="container-fluid">
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <a class="nav-link" href="#">About</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Services</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Contact</a>
        </li>
      </ul>
      <a onClick={handleClick} class="navbar-brand fs-4 mx-auto fw-bold" href="#">LET'S EDEN</a>

      <form class="d-flex" role="search">
      <button class="btn btn-outline-success fa fa-search mr-1" type="submit"></button>

        <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
        <button class="btn btn-outline-primary ms-auto px-4 rounded-pill">Login</button>
      </form>
    </div>
  </div>
</nav>
    </div>
  )
}
export default Navbar;