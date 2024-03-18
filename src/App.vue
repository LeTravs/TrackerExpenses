<template>
  <div class="wrapper">
    <nav id="sidebar" :class="{ active: sidebarActive }">
      <div class="sidebar-header">
        <h3>IM 302</h3>
      </div>

      <ul class="list-unstyled components">
        <li>
          <RouterLink to="/tracker" class="nav-text">
            <i class="fa fa-home fa-lg nav-icon"></i>
            Expenses
          </RouterLink>
        </li>
        <li>
          <RouterLink to="/income" class="nav-text">
            <i class="fa fa-user fa-lg nav-icon"></i>
            Income
          </RouterLink>
        </li>
        <li>
          <RouterLink to="/summary" class="nav-text">
            <i class="fa fa-envelope-o fa-lg nav-icon"></i>
            Summary
          </RouterLink>
        </li>
      </ul>

      <ul class="list-unstyled CTAs">
        <li>
          <a href="https://assets.materialup.com/uploads/1f5ab745-bb59-436f-8255-84002239405e/preview.jpg" class="download">
            <i class="fa fa-download fa-lg"></i>
            Download source
          </a>
        </li>
        <li>
          <RouterLink  to="/logout" class="logout">
            <i class="fa fa-sign-out fa-lg"></i>
            Logout
          </RouterLink>
        </li>
      </ul>
    </nav>

    <div id="content">
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
      </nav>
      
      <RouterView />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { RouterView } from 'vue-router';
import { RouterLink } from 'vue-router';


const sidebarActive = ref(false)

function toggleSidebar() {
  sidebarActive.value = !sidebarActive.value
}
</script>

<style scoped>


#sidebar {
  width: 250px;
  background: #e7d5be;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  transition: all 0.3s;
  border-right: 1px solid #ddd;
  overflow-y: auto;
  border-radius: 8px;
}

#sidebar.active {
  width: 55px;
}

.sidebar-header {
  padding: 20px;
  background: #6d7fcc;
}

#sidebar ul.components {
  padding: 20px 0;
}

#sidebar ul li a {
  padding: 10px;
  font-size: 1em;
  display: block;
  color: #8a8a8a;
}

#sidebar ul li a:hover {
  color: #7386D5;
  background: #fff;
}

#sidebar ul li.active>a,
a[aria-expanded="true"] {
  color: #fff;
  background: #6d7fcc;
}

.navbar {
  padding: 15px 10px;

  width: 210px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  margin-bottom: 40px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.navbar-btn {
  background-color: #e7c2c2;
  border: none;
  color: #555;
  padding: 8px 12px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.navbar-btn:hover {
  background-color: #d7b0b0;
}

/* Content styles */
#content {
  width: calc(100% - 250px);
  margin-left: 250px;
  padding: 20px;
  min-height: 100vh;
  transition: all 0.3s;
  background: linear-gradient(to right, #ebb39d, #d9c996);
  border-radius: 10px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
}

.nav-text {
  font-size: 16px;
  font-weight: bold;
  color: #555;
}

.nav-icon {
  margin-right: 10px;
}



</style>
