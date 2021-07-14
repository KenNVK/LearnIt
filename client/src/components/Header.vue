<template>
  <div :class="{ 'modal-mobile': isNavMobile }" @click="clickOutSide"></div>
  <header class="header">
    <router-link class="header-link-app-name " :to="{ name: 'Welcome' }">
      <h3><i class="ri-code-s-slash-line header-link-icon"></i> LearnIt</h3>
    </router-link>
    <ul class="header-nav" :class="{ 'header-nav-mobile-active': isNavMobile }">
      <router-link class="link-app-name-mobile hide-on-pc hide-on-tablet" :to="{ name: 'Welcome' }">
        <h3><i class="ri-code-s-slash-line header-link-icon"></i> LearnIt</h3>
      </router-link>
      <i
        class="ri-close-line nav-mobile-close-icon hide-on-pc hide-on-tablet"
        @click="closeNavMobile"
      ></i>
      <li class="header-list" @click="closeNavMobile">
        <router-link class="header-link" to="/home">Home</router-link>
      </li>
      <li class="header-list" @click="closeNavMobile">
        <router-link class="header-link" to="/about">About</router-link>
      </li>
      <li class="header-list" v-if="isAdmin" @click="closeNavMobile">
        <router-link class="header-link" to="/admin">Admin</router-link>
      </li>
      <li class="header-list header-list-has-logout">
        <a class="header-link" v-if="name">{{ name }}</a>
        <router-link class="header-link" to="/signin" v-if="!name">Login</router-link>
        <router-link
          class="header-link header-link-logout"
          to="/signin"
          @click="logout()"
          v-if="name"
        >
          <i class="ri-logout-box-r-line header-link-icon"></i>Logout
        </router-link>
      </li>
      <li class="header-list">
        <router-link class="header-link" to="/signup" v-if="!name">Sign Up</router-link>
      </li>
    </ul>
    <i class="ri-menu-line mobile-menu-icon hide-on-pc hide-on-tablet" @click="navMobileActive"></i>
  </header>
</template>

<script>
import { useStore } from "vuex";
import { ref } from "vue";
export default {
  name: "Header",
  setup() {
    const store = useStore();
    const name = ref(null);
    const isAdmin = ref(false);
    const isNavMobile = ref(false);
    const logout = () => store.dispatch("logout");
    const loadUser = () => store.dispatch("loadUser");

    if (store.getters.isLoggedIn) {
      loadUser().then(response => {
        if (response) {
          //get name of user
          name.value = response.hasUser.name;
          //check role of user
          for (const role of response.hasUser.roles) {
            role["name"] === "admin" ? (isAdmin.value = true) : "";
          }
        }
      });
    }

    const navMobileActive = () => (isNavMobile.value = true);

    const closeNavMobile = () => (isNavMobile.value = false);

    const clickOutSide = () => (isNavMobile.value = false);

    return {
      name,
      logout,
      isAdmin,
      navMobileActive,
      isNavMobile,
      closeNavMobile,
      clickOutSide,
    };
  },
};
</script>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 50px;
  background: #4a5f88;
}
.header h3 {
  margin: 0;
}

.header-nav {
  display: flex;
  margin-bottom: 0;
}

.header-list {
  list-style: none;
  margin: 0 12px;
}

.header-link:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.header-link,
.header-link-app-name {
  text-decoration: none;
  padding: 6px 12px;
  line-height: 50px;
  font-size: 1.2rem;
  color: #fff;
}
.header-link h3 {
  margin: 0 12px;
  font-size: 1.8rem;
}

.header-link.header-link-logout {
  background-color: rgb(235, 82, 82, 0.85);
  border-radius: 3px;
  color: #333;
}

.header-link.header-link-logout:hover {
  background-color: rgb(235, 82, 82);
}

.header-link-icon {
  vertical-align: sub;
}
</style>
