<template>
  <div class="main">
    <router-link :to="{ name: 'Welcome' }"><h1>LearnIt</h1></router-link>
    <h3>what are you learning ?</h3>
    <h3 class="form-message">
      <i>{{ signupErrorMessage }}</i>
    </h3>
    <form @submit.prevent="signUp" class="form">
      <div class="form-group" :class="{ invalid: nameError }">
        <input
          @blur="handleName"
          v-model.lazy="name"
          type="text"
          placeholder="Fullname"
          class="form-control"
        />
        <span class="form-message">{{ nameError }}</span>
      </div>

      <div class="form-group" :class="{ invalid: emailError || signupErrorMessage }">
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

      <div class="form-group" :class="{ invalid: confirmError }">
        <input
          @blur="handleConfirm"
          v-model.lazy="confirm"
          placeholder="Confirm password"
          type="password"
          class="form-control"
        />
        <span class="form-message">{{ confirmError }}</span>
      </div>

      <button type="submit" class="form-submit">Sign Up</button>
    </form>

    <div class="nav">
      <span>Already have an account ? </span>
      <router-link to="/signin" class="nav-link">Sign in</router-link>
    </div>
  </div>
</template>

<script>
import { useForm, useField } from "vee-validate";
import { ValidateSignUp } from "../utils/validate";
import { useStore } from "vuex";
import { ref } from "vue";
export default {
  name: "SignUp",
  setup() {
    const store = useStore();
    const signupErrorMessage = ref("");
    const { handleSubmit } = useForm({ validationSchema: ValidateSignUp });
    const { value: name, errorMessage: nameError, handleChange: handleName } = useField("name");
    const { value: email, errorMessage: emailError, handleChange: handleEmail } = useField("email");
    const { value: password, errorMessage: passwordError, handleChange: handlePassword } = useField(
      "password"
    );
    const { value: confirm, errorMessage: confirmError, handleChange: handleConfirm } = useField(
      "confirm"
    );

    const signUp = handleSubmit(userForm => {
      store
        .dispatch("signUp", {
          name: userForm.name,
          email: userForm.email,
          password: userForm.password,
        })
        .then(response => {
          if (!response.success) {
            signupErrorMessage.value = response.message;
            setTimeout(() => {
              signupErrorMessage.value = "";
            }, 5000);
          }
        });
    });

    return {
      name,
      email,
      password,
      confirm,
      nameError,
      emailError,
      passwordError,
      confirmError,
      handleName,
      handleEmail,
      handlePassword,
      handleConfirm,
      signUp,
      signupErrorMessage,
    };
  },
};
</script>

<style scoped src="../assets/css/auth.css"></style>
