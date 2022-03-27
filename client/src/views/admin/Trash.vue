<template>
  <div class="container-fluid main">
    <div class="header-trash-page">
      <a class="title" href=""><h1>Trash page</h1> </a>
    </div>
    <div class="toolbar">
      <div class="form-check">
        <input
          name="checkbox"
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
        <select class="form-select toolbar-form-select" required v-model="selected">
          <option disabled value="">--Choose actions--</option>
          <option value="delete">Delete</option>
          <option value="restore">Restore</option>
        </select>
        <button
          type="submit"
          class="btn btn-primary check-all-submit-btn ms-2 "
          :disabled="!checkedArray.length"
        >
          OK
        </button>
      </form>
      <div class="total-posts ms-auto">Total trash: {{ trashCount }}</div>
    </div>
    <div class="table-wrap">
      <table class="table mt-3">
        <thead>
          <tr class="table-dark">
            <th scope="col" width="40">#</th>
            <th scope="col">Courses</th>
            <th scope="col">Description</th>
            <th scope="col">URL</th>
            <th scope="col">Create date</th>
            <th scope="col">Update date</th>
            <th scope="col" width="40"></th>
          </tr>
        </thead>
        <div class="table-status" v-show="trashCount === 0">Trash is empty!</div>

        <tbody>
          <tr
            class="posts-items "
            :class="{ selected: isChecked(post._id) }"
            v-for="post in trash"
            :key="post._id"
          >
            <td scope="row">
              <input
                class="form-check-input"
                type="checkbox"
                name="checkbox"
                @change="updateCheckall()"
                v-model="checkedArray"
                :value="post._id"
              />
            </td>
            <td>
              <span>{{ post.title }}</span>
            </td>
            <td>
              <span>{{ post.description }}</span>
            </td>
            <td>
              <a class="link link-primary" :href="post.url">{{ post.url }}</a>
            </td>
            <td>
              <span>{{ dateTime(post.createdAt) }}</span>
            </td>
            <td>
              <span>{{ dateTime(post.updatedAt) }}</span>
            </td>
            <td class="link-wrap">
              <a href="#" class="link link-primary" @click="restorePost(post._id)"
                ><i class="ri-reply-all-fill restore-icon"></i></a
              ><br />
              <a
                href="#"
                class="link link-danger"
                data-bs-toggle="modal"
                data-bs-target="#delete-modal"
                @click="findPostTrash(post._id)"
              >
                <i class="ri-delete-bin-line delete-icon"></i>
              </a>
              <DeleteModal @handle-force-delete="forceDelete(findedPostTrash._id)" />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { useStore } from "vuex";
import { ref, computed } from "vue";
import moment from "moment";
import DeleteModal from "./DeleteModal.vue";

export default {
  name: "Trash",
  components: { DeleteModal },
  setup() {
    const store = useStore();
    const isCheckedAll = ref(false);
    const checkedArray = ref([]);
    const selected = ref("");
    const dateTime = date => moment(date).format("YYYY-MM-DD/HH:mm");
    const findedPostTrash = ref({});

    // Handle finding post when clicking
    const findPostTrash = postId => {
      store.dispatch("findPostTrash", postId).then(response => {
        findedPostTrash.value = response;
      });
    };

    store.dispatch("loadUser");
    store.dispatch("getTrash");

    const trash = computed(() => store.state.trash);
    const trashCount = computed(() => store.getters.trashCount);
    const deletePost = postId => store.dispatch("deletePost", postId);
    const forceDelete = postId => store.dispatch("forceDelete", postId);
    const restorePost = postId => store.dispatch("restorePost", postId);

    // Handle when checkbox items are checked
    const checkAll = () => {
      isCheckedAll.value = !isCheckedAll.value;
      if (isCheckedAll.value) {
        for (const post of trash.value) {
          checkedArray.value.push(post._id);
        }
      } else {
        checkedArray.value = [];
      }
    };

    // Handle when checkbox all is checked
    const updateCheckall = () => {
      if (checkedArray.value.length == trash.value.length) {
        isCheckedAll.value = true;
      } else {
        isCheckedAll.value = false;
      }
    };
    const isChecked = postId => checkedArray.value.includes(postId);

    const handleSubmitToolbar = value => {
      switch (value) {
        case "delete":
          store.dispatch("forceDeleteAll", checkedArray.value);
          break;
        case "restore":
          store.dispatch("restoreAllPosts", checkedArray.value);
          break;
      }
    };

    return {
      trash,
      trashCount,
      isChecked,
      updateCheckall,
      checkAll,
      isCheckedAll,
      checkedArray,
      dateTime,
      deletePost,
      handleSubmitToolbar,
      selected,
      forceDelete,
      findedPostTrash,
      findPostTrash,
      restorePost,
    };
  },
};
</script>

<style scoped>
@import "../../assets/css/manage-page.css";

@media (max-width: 739px) {
  .header-trash-page {
    display: flex;
    flex-direction: column;
  }

  .toolbar {
    flex-wrap: wrap;
    justify-content: space-between;
  }

  .toolbar-form {
    flex: 1;
  }

  .toolbar-form-select {
    margin: 0;
    flex: 1;
  }

  .total-posts {
    margin-top: 10px;
  }
}
</style>
