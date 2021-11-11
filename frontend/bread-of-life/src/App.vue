<template>
  <div>
    <!-- Nav bar  of the application that has functionality: Views event, View individuals, Chart options dropdown by zipcode, or event-->
    <nav  class="navbar navbar-expand navbar-dark bg-dark navbar sticky-top">
      <div class="container">
        <a class="navbar-brand float-left " href="/">Bread Of Life</a>
        <ul class="nav navbar-nav mr-auto" >
          <li class="nav-item">
            <router-link class="nav-link" to="/viewevent">Events</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/viewindividual">Individuals</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/individualcount">All Individuals</router-link>
          </li>
           <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">Charts</a>
              <ul class="dropdown-menu navbar-dark bg-dark" aria-labelledby="navbarDropdownMenuLink">
                <li class="nav-item">
                  <router-link class="nav-link" to="/zipch">Total By ZipCode</router-link>
                </li>
                <li class="nav-item">
                  <router-link class="nav-link" to="/typech">Total By Event</router-link>
                </li>
              </ul>
            </li>
        </ul>
      </div>
    </nav>

    <!-- Router view -->
    <div class="container mt-5">
      <router-view></router-view>
    </div>
  </div>
</template>
