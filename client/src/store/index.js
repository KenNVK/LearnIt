import { createStore } from "vuex";
import axios from "axios";
import { apiUrl, LOCAL_STORAGE_TOKEN, LOCAL_STORAGE_ROLE } from "../utils/constant";
import router from "@/router";
import setAuthToken from "../utils/setAuthToken";

export default createStore({
  state: {
    status: null,
    posts: [],
    trash: [],
    token: localStorage.getItem(LOCAL_STORAGE_TOKEN) || null,
    role: localStorage.getItem(LOCAL_STORAGE_ROLE) || null,
  },
  getters: {
    authStatus: state => !!state.status,
    isLoggedIn: state => state.token,
    role: state => state.role,
    postsCount: state => state.posts.length,
    trashCount: state => state.trash.length,
  },
  actions: {
    // Handle login
    async signin({ commit, dispatch }, userForm) {
      try {
        const response = await axios.post(`${apiUrl}/auth/signin`, userForm);
        if (response.data.success) {
          localStorage.setItem(LOCAL_STORAGE_TOKEN, response.data.accessToken);
          commit("auth_success", response.data);
          return response.data;
        }
        dispatch("checkLoggedIn");
      } catch (error) {
        if (error.response.data) return error.response.data;
        else return { success: false, message: error.message };
      }
    },
    // Handle logged in
    async checkLoggedIn({ commit, state }) {
      if (state.token) {
        setAuthToken(state.token);
      }
      try {
        const response = await axios.get(`${apiUrl}/auth`);
        if (response.data.success) commit("logged_in", response.data);
      } catch (error) {
        commit("auth_error");
        localStorage.removeItem(LOCAL_STORAGE_TOKEN);
        setAuthToken(null);
      }
    },
    // Handle sign up
    async signUp({ commit }, userForm) {
      try {
        const response = await axios.post(`${apiUrl}/auth/signup`, userForm);
        if (response.data.success) {
          commit("signed_up", response.data);
          return response.data;
        }
      } catch (error) {
        if (error.response.data) return error.response.data;
        else return { success: false, message: error.message };
      }
    },

    // Load logging user
    async loadUser({ commit, state }) {
      if (state.token) {
        setAuthToken(state.token);
      }
      try {
        const response = await axios.get(`${apiUrl}/auth`);
        if (response.data.success) {
          commit("load_user", response.data);
          return response.data;
        }
      } catch (error) {
        commit("auth_error");
        localStorage.removeItem(LOCAL_STORAGE_TOKEN);
        setAuthToken(null);
      }
    },

    // Handle logout
    logout({ commit }) {
      commit("logout");
      localStorage.removeItem(LOCAL_STORAGE_TOKEN);
      setAuthToken(null);
    },

    // Handle get posts
    async getPosts({ commit }) {
      try {
        const response = await axios.get(`${apiUrl}/posts`);
        if (response.data.success) {
          commit("get_posts", response.data);
          return response.data;
        }
      } catch (error) {
        if (error.response.data) return error.response.data;
        else return { success: false, message: error.message };
      }
    },

    // Handle get posts
    async getTrash({ commit }) {
      try {
        const response = await axios.get(`${apiUrl}/trash`);
        if (response.data.success) {
          commit("get_trash", response.data);
          return response.data;
        }
      } catch (error) {
        if (error.response.data) return error.response.data;
        else return { success: false, message: error.message };
      }
    },

    // Handle find post
    findPost({ state }, postId) {
      const post = state.posts.find(post => post._id === postId);
      return post;
    },
    // Handle find post in trash
    findPostTrash({ state }, postId) {
      const post = state.trash.find(post => post._id === postId);
      return post;
    },

    // Handle update post
    async updatePost({ commit }, updatedPost) {
      commit("update_post", updatedPost);
      try {
        const response = await axios.put(`${apiUrl}/admin/${updatedPost._id}`, updatedPost);
        console.log(response.data);
        return response.data;
      } catch (error) {
        if (error.response.data) return error.response.data;
        else return { success: false, message: error.message };
      }
    },

    // Hanlde delete post
    async deletePost({ commit }, postId) {
      try {
        const response = await axios.delete(`${apiUrl}/admin/${postId}`);
        if (response.data.success) {
          commit("delete_post", response.data);
          return response.data;
        }
      } catch (error) {
        if (error.response.data) return error.response.data;
        else return { success: false, message: error.message };
      }
    },

    // Hanlde delete force post
    async forceDelete({ commit }, postId) {
      console.log(postId);
      try {
        const response = await axios.delete(`${apiUrl}/admin/${postId}/force`);
        if (response.data.success) {
          commit("force_delete", response.data);
          return response.data;
        }
      } catch (error) {
        if (error.response.data) return error.response.data;
        else return { success: false, message: error.message };
      }
    },

    async deleteAllPosts({ commit }, postIds) {
      try {
        const response = await axios.delete(`${apiUrl}/admin/delete-all`, { data: { postIds } });
        if (response.data.success) {
          commit("delete_all", response.data);
          return response.data;
        }
      } catch (error) {
        if (error.response.data) return error.response.data;
        else return { success: false, message: error.message };
      }
    },
    async forceDeleteAll({ commit }, postIds) {
      try {
        const response = await axios.delete(`${apiUrl}/admin/force-delete-all`, {
          data: { postIds },
        });
        console.log(response.data);
        if (response.data.success) {
          commit("force_delete_all", response.data);
          console.log(response.data);
          return response.data;
        }
      } catch (error) {
        if (error.response.data) return error.response.data;
        else return { success: false, message: error.message };
      }
    },

    async restoreAllPosts({ commit }, postIds) {
      try {
        const response = await axios.patch(`${apiUrl}/admin/restore-all`, { postIds });
        if (response.data.success) {
          commit("restore_all", response.data);
          return response.data;
        }
      } catch (error) {
        if (error.response.data) return error.response.data;
        else return { success: false, message: error.message };
      }
    },

    async restorePost({ commit }, postId) {
      try {
        const response = await axios.patch(`${apiUrl}/admin/${postId}`);
        if (response.data.success) {
          commit("restore_post", response.data);
          return response.data;
        }
      } catch (error) {
        if (error.response.data) return error.response.data;
        else return { success: false, message: error.message };
      }
    },

    // Handle create new post
    async createPost({ commit }, newPost) {
      try {
        const response = await axios.post(`${apiUrl}/admin/create`, newPost);
        commit("create_post", response.data);
      } catch (error) {
        if (error.response.data) return error.response.data;
        else return { success: false, message: error.message };
      }
    },
  },

  mutations: {
    auth_success(state, payload) {
      state.status = payload.message;
      state.token = payload.accessToken;
      router.push("/home");
    },
    logged_in(state) {
      state.status = "success";
      router.push("/home");
    },
    load_user(state, payload) {
      state.status = "success";
      for (const role of payload.hasUser.roles) {
        if (role["name"] === "admin") {
          state.role = role["name"];
          localStorage.setItem(LOCAL_STORAGE_ROLE, state.role);
        } else {
          localStorage.removeItem(LOCAL_STORAGE_ROLE);
        }
      }
    },
    auth_error(state) {
      state.status = "error";
      state.user = null;
      router.push("/signin");
    },

    logout(state) {
      state.status = "Logged out";
      state.token = "";
    },
    signed_up(state, payload) {
      state.status = payload.message;
      router.push("/signin");
    },
    get_posts(state, payload) {
      state.status = "success";
      state.posts = payload.hasPosts;
    },
    get_trash(state, payload) {
      state.status = "success";
      state.trash = payload.hasTrash;
    },
    update_post(state, payload) {
      state.status = payload.message;
    },
    delete_post(state, payload) {
      state.status = payload.message;
      state.posts = state.posts.filter(post => post._id !== payload.post._id);
    },
    delete_all(state, payload) {
      state.status = payload.message;
      state.posts = payload.posts.filter(post => !post.deleted);
    },
    force_delete(state, payload) {
      state.status = payload.message;
      state.trash = state.trash.filter(post => post._id !== payload.post._id);
    },
    force_delete_all(state, payload) {
      state.status = payload.message;
      payload.posts.map(post => {
        state.trash = state.trash.filter(postTrash => postTrash._id !== post._id);
      });
    },
    restore_all(state, payload) {
      state.status = payload.message;
      payload.posts.map(post => {
        state.trash = state.trash.filter(postTrash => postTrash._id !== post._id);
      });
    },
    restore_post(state, payload) {
      state.status = payload.message;
      state.trash = state.trash.filter(post => post._id !== payload.post._id);
    },
    create_post(state, payload) {
      (state.status = payload.message), state.posts.push(payload.post);
    },
  },
});
