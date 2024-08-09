import React from 'react'

const RegNavbar = () => {
  return (
    <div>
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
      <div class="mx-auto d-flex justify-content-center w-100">
      <a class="navbar-brand fs-4 mx-auto fw-bold" href="#">LET'S EDEN</a>
      </div>
    </div>
  </div>
</nav>
    </div>
  )
}
export default RegNavbar;