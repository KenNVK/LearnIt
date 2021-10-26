const apiUrl =
  process.env.NODE_ENV === "production"
    ? "http://localhost:3300/api"
    : "https://shrouded-stream-86450.herokuapp.com/api";
const LOCAL_STORAGE_TOKEN = "token";
const LOCAL_STORAGE_ROLE = "role";

export { apiUrl, LOCAL_STORAGE_TOKEN, LOCAL_STORAGE_ROLE };
