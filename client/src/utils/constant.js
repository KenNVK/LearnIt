const apiUrl =
  process.env.NODE_ENV !== "production"
    ? "https://fierce-citadel-75259.herokuapp.com/api"
    : "someDeployUrl";
const LOCAL_STORAGE_TOKEN = "token";
const LOCAL_STORAGE_ROLE = "role";

export { apiUrl, LOCAL_STORAGE_TOKEN, LOCAL_STORAGE_ROLE };
