<template>
  <div class="container-fluid main">
    <div class="header-admin-page">
      <a class="title" href=""><h1>Admin page</h1> </a>
      <div class="nav">
        <div class="nav-list">
          <a class="nav-link" href="#" data-bs-toggle="modal" data-bs-target="#createFormModal">
            <i class="ri-add-line nav-icon"></i>Create
          </a>
          <router-link class="nav-link" to="/admin/trash">
            <i class="ri-delete-bin-line nav-icon"></i>Trash({{ trashCount }})
          </router-link>
        </div>
      </div>
    </div>
    <div class="toolbar">
      <div class="form-check">
        <input
          class="form-check-input"
          type="checkbox"
          id="checkbox-all"
          autocomplete="off"
          @change="checkAll()"
          :checked="isCheckedAll"
        />
        <label class="form-check-label" for="checkbox-all">Select all</label>
      </div>
      <form class="toolbar-form" @submit.prevent="handleSubmitToolbar(selected)">
        <select class="form-select checkbox-select-all" required v-model="selected">
          <option disabled value="">--Choose actions--</option>
          <option value="delete">Delete</option>
        </select>
        <button
          type="submit"
          class="btn btn-primary check-all-submit-btn ms-2 "
          :disabled="!checkedArray.length"
        >
          OK
        </button>
      </form>
      <div class="total-posts ms-auto">Total posts: {{ postsCount }}</div>
    </div>
    <div class="table-wrap">
      <table class="table mt-3">
        <thead>
          <tr class="table-primary">
            <th scope="col" width="40">#</th>
            <th scope="col">Courses</th>
            <th scope="col">Description</th>
            <th scope="col">URL</th>
            <th scope="col">Create date</th>
            <th scope="col">Update date</th>
            <th scope="col" width="40"></th>
          </tr>
        </thead>
        <div class="table-status" v-show="postsCount === 0">No courses posted!</div>
        <tbody>
          <tr
            class="posts-items "
            :class="{ selected: isChecked(post._id) }"
            v-for="post in posts"
            :key="post._id"
          >
            <td scope="row">
              <input
                class="form-check-input"
                type="checkbox"
                name="checkbox-items"
                @change="updateCheckall()"
                v-model="checkedArray"
                :value="post._id"
              />
            </td>

            <td>{{ post.title }}</td>
            <td>{{ post.description }}</td>
            <td>
              <a class="link link-primary" :href="post.url">{{ post.url }}</a>
            </td>
            <td>{{ dateTime(post.createdAt) }}</td>
            <td>{{ dateTime(post.updatedAt) }}</td>
            <td class="link-wrap">
              <a
                class="link link-primary"
                href="#"
                data-toggle="tooltip"
                data-placement="top"
                title="Edit"
                @click="findPost(post._id)"
                ><i
                  class="ri-edit-box-line edit-icon"
                  data-bs-toggle="modal"
                  data-bs-target="#editFormModal"
                ></i> </a
              ><br />
              <a class="link link-danger" @click="deletePost(post._id)">
                <i class="ri-delete-bin-line delete-icon"></i>
              </a>
              <EditForm
                :findedPostProp="findedPost"
                :loadFindedPostProp="loadFindedPost"
                :clickFindedPostProp="findPost"
                @handle-update-post="updateEdit"
              />
              <CreateForm @handle-create-post="createPost" />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { useStore } from "vuex";
import { ref, computed, watchEffect } from "vue";
import moment from "moment";
import EditForm from "./EditForm.vue";
import CreateForm from "./CreateForm.vue";

export default {
  name: "Admin",
  components: { EditForm, CreateForm },
  setup() {
    const store = useStore();
    const isCheckedAll = ref(false);
    const checkedArray = ref([]);
    const selected = ref("");
    const findedPost = ref({});
    const dateTime = date => moment(date).format("YYYY-MM-DD/HH:mm");
    const loadFindedPost = ref(null);

    store.dispatch("loadUser");
    store.dispatch("getPosts");

    const posts = computed(() => store.state.posts);
    const postsCount = computed(() => store.getters.postsCount);
    const trashCount = computed(() => store.getters.trashCount);
    const deletePost = postId => store.dispatch("deletePost", postId);

    watchEffect(() => {
      postsCount.value;
      store.dispatch("getTrash");
    });

    // Handle when checkbox items are checked
    const checkAll = () => {
      isCheckedAll.value = !isCheckedAll.value;
      if (isCheckedAll.value) {
        for (const post of posts.value) {
          checkedArray.value.push(post._id);
        }
      } else {
        checkedArray.value = [];
      }
    };

    // Handle when checkbox all is checked
    const updateCheckall = () => {
      if (checkedArray.value.length == posts.value.length) {
        isCheckedAll.value = true;
      } else {
        isCheckedAll.value = false;
      }
    };
    const isChecked = postId => checkedArray.value.includes(postId);

    // Handle finding post when clicking edit btn
    const findPost = postId => {
      loadFindedPost.value = !loadFindedPost.value;
      store.dispatch("findPost", postId).then(response => {
        findedPost.value = response;
      });
    };

    // Handle update after edited
    const updateEdit = updatedPost => {
      if (updatedPost) {
        findedPost.value.title = updatedPost.title;
        findedPost.value.description = updatedPost.description;
        findedPost.value.url = updatedPost.url;
        findedPost.value.image = updatedPost.image;
        store.dispatch("updatePost", findedPost.value);
      }
    };

    // Handle create new post
    const createPost = newPost => {
      store.dispatch("createPost", newPost);
    };

    const handleSubmitToolbar = value => {
      switch (value) {
        case "delete":
          store.dispatch("deleteAllPosts", checkedArray.value);
      }
    };

    return {
      posts,
      postsCount,
      isChecked,
      updateCheckall,
      checkAll,
      isCheckedAll,
      checkedArray,
      dateTime,
      findPost,
      updateEdit,
      findedPost,
      deletePost,
      handleSubmitToolbar,
      loadFindedPost,
      createPost,
      selected,
      trashCount,
    };
  },
};
</script>

<style scoped>
.main {
  min-height: calc(100vh - 108px);
}

.header-admin-page {
  display: flex;
  justify-content: space-between;
}

.title {
  text-decoration: none;
  padding: 8px;
}

.nav {
  display: flex;
  list-style: none;
}

.nav-list {
  display: flex;
  align-items: center;
  color: #4a5f88;
}

.nav-link {
  display: block;
  text-decoration: none;
  font-size: 1.4rem;
  color: #4a5f88;
}

.nav-link + .nav-link {
  margin-left: 8px;
}

.nav-link:hover .nav-link,
.nav-icon:hover .nav-icon {
  color: #2f64cc;
}

.nav-icon {
  font-size: 1.4rem;
  padding-right: 4px;
  vertical-align: top;
}

.toolbar {
  display: flex;
  align-items: center;
  margin: 20px 0 0 8px;
}

.toolbar-form {
  display: flex;
}
.checkbox-select-all {
  width: 210px;
  margin-left: 10px;
  cursor: pointer;
}

.total-posts {
  color: #0d6efd;
  font-size: 1.2rem;
  padding: 8px;
}

.table-wrap {
  overflow-x: scroll;
}

.posts-items {
  vertical-align: middle;
  word-wrap: break-word;
}

.link {
  text-decoration: none;
}

.edit-icon,
.delete-icon {
  font-size: 1.3rem;
}

.selected {
  background-color: #c2dbff;
}

.modal-title {
  color: #0d6efd;
}

.col-form-label {
  font-weight: 700;
}

.table-status {
  display: table-caption;
  text-align: center;
  font-size: 1.1rem;
  padding: 12px;
}

@media (max-width: 739px) {
  .header-admin-page {
    display: flex;
    flex-direction: column;
  }

  .toolbar {
    flex-wrap: wrap;
  }

  .nav {
    align-self: flex-end;
  }

  .nav-link {
    padding: 6px;
  }

  .nav-icon {
    vertical-align: bottom;
  }
  .checkbox-select-all {
    width: 100%;
  }

  .total-posts {
    margin-top: 10px;
  }
}
</style>
