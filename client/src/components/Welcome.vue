<template>
  <div class="container">
    <div class="nav">
      <div class="nav-views">
        <router-link class="nav-link" to="/home">Home</router-link>
        <router-link class="nav-link" to="/about">About</router-link>
      </div>
      <div class="class-user">
        <a class="nav-link">
          <span class="nav-link-user" v-if="name">{{ name }}</span>
        </a>
      </div>
    </div>
    <h1>Welcome to <br />learnIt</h1>
    <router-link to="/signup">
      <button class="btn btn-light">Join us now</button>
    </router-link>
  </div>
</template>

<script>
import { useStore } from "vuex";
import { ref } from "vue";
export default {
  name: "Welcome",
  setup() {
    const store = useStore();
    const name = ref(null);
    const loadUser = () => store.dispatch("loadUser");

    if (store.getters.isLoggedIn) {
      loadUser().then(response => {
        if (response) name.value = response.hasUser.name;
      });
    }

    return { name };
  },
};
</script>

<style scoped>
.container {
  height: 100vh;
  max-width: 100%;
  background: linear-gradient(to right bottom, rgba(12, 21, 150, 0.6), rgb(60, 48, 231)),
    url("../assets/images/welcome.jpg");
  background-size: cover;
  background-position: center;
  clip-path: ellipse(80% 58% at 52% 32%);
  -webkit-clip-path: ellipse(80% 58% at 52% 32%);
  text-align: center;
  color: #fff;
}

.nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.nav-link {
  display: block;
  text-decoration: none;
  color: #fff;
  font-size: 2rem;
  margin: 16px;
  padding: 4px 8px;
  background-color: transparent;
  box-shadow: 0 0 20px rgba(18, 6, 134, 0.5);
  border-radius: 3px;
  float: left;
}

.nav-link:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.nav-link-user {
  font-style: italic;
  color: rgb(245, 50, 50);
}

h1 {
  position: absolute;
  top: 28%;
  left: 50%;
  transform: translate(-50%);
  color: #fff;
  font-size: 3rem;
  letter-spacing: 0.6rem;
}

.btn {
  position: absolute;
  top: 53%;
  left: 50%;
  transform: translate(-50%);
  padding: 10px 20px;
  font-size: 1.2rem;
  font-family: roboto, "Roboto", "Helvetica";
  text-transform: uppercase;
  color: #333;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.6);
  border-radius: 0;
}

.btn:hover {
  background-color: rgba(255, 255, 255, 0.8);
  cursor: pointer;
}

@media (max-width: 739px) {
  h1 {
    font-size: 1.8rem;
  }

  .nav {
    justify-content: center;
  }

  .nav-link {
    font-size: 1.6rem;
    padding: 4px;
  }

  .btn {
    padding: 4px 12px;
    margin: 12px 0;
  }
}
</style>
