import React from 'react'

const MapNavbar = () => {
  return (
    <div>
        <nav class="navbar navbar-expand-lg bg-body-tertiary">
  <div class="container-fluid">
  <a class="navbar-brand fs-4 mx-auto fw-bold" href="#">LET'S EDEN</a>

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

      <form class="d-flex" role="search">
      <button class="btn btn-outline-success fa fa-search mr-1" type="submit"></button>

        <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
      </form>
    </div>
  </div>
</nav>
    </div>
  )
}
export default MapNavbar;