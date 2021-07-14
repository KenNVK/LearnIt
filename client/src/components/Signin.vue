<template>
  <div class="main">
    <router-link :to="{ name: 'Welcome' }"><h1>LearnIt</h1></router-link>
    <h3>what are you learning ?</h3>
    <h3 class="form-message">
      <i>{{ signinErrorMessage }}</i>
    </h3>

    <form @submit.prevent="signin" class="form">
      <div class="form-group" :class="{ invalid: emailError }">
        <input
          @blur="handleEmail"
          v-model.lazy="email"
          type="text"
          placeholder="Email"
          class="form-control"
        />
        <span class="form-message">{{ emailError }}</span>
      </div>

      <div class="form-group" :class="{ invalid: passwordError }">
        <input
          @blur="handlePassword"
          v-model.lazy="password"
          type="password"
          placeholder="Password"
          class="form-control"
        />
        <span class="form-message">{{ passwordError }}</span>
      </div>

      <button type="submit" class="form-submit">Login</button>
    </form>

    <div class="nav">
      <span>Don't have an account? ? </span>
      <router-link to="/signup" class="nav-link">Sign up</router-link>
    </div>
  </div>
</template>

<script>
import { useForm, useField } from "vee-validate";
import { ValidateSignin } from "../utils/validate";
import { useStore } from "vuex";
import { ref } from "vue";

export default {
  name: "Login",
  setup() {
    const store = useStore();
    const signinErrorMessage = ref("");
    const { handleSubmit } = useForm({ validationSchema: ValidateSignin });
    const { value: email, errorMessage: emailError, handleChange: handleEmail } = useField("email");
    const { value: password, errorMessage: passwordError, handleChange: handlePassword } = useField(
      "password"
    );

    const signin = handleSubmit(userForm => {
      store.dispatch("signin", userForm).then(response => {
        if (!response.success) {
          signinErrorMessage.value = response.message;
          setTimeout(() => {
            signinErrorMessage.value = "";
          }, 5000);
        }
      });
    });

    if (store.getters.isLoggedIn) {
      store.dispatch("checkLoggedIn");
    }

    return {
      email,
      emailError,
      handleEmail,
      password,
      passwordError,
      handlePassword,
      signin,
      signinErrorMessage,
    };
  },
};
</script>

<style scoped src="../assets/css/auth.css"></style>
