<template>
  <div class="container main">
    <div class="row gy-3">
      <div class="col-lg-3 col-md-6" v-for="post in posts" :key="post._id">
        <div class="card">
          <div class="card-img-wrap">
            <div
              class="card-img-top border-bottom"
              :style="{ 'background-image': 'url(' + post.image + ')' }"
            ></div>
          </div>
          <div class="card-body bg-light">
            <h5 class="card-title">{{ post.title }}</h5>
            <p class="card-text">{{ post.description }}</p>
            <a class="btn btn-primary" target="_blank" :href="post.url">LEARN</a>
          </div>
        </div>
      </div>
    </div>
    <LoadingModal />
  </div>
</template>

<script>
import { useStore } from "vuex";
import { computed } from "vue";
import LoadingModal from "../components/LoadingModal.vue";

export default {
  name: "Home",
  components: { LoadingModal },
  setup() {
    const store = useStore();
    const posts = computed(() => store.state.posts);
    store.dispatch("getPosts");
    return { posts };
  },
};
</script>

<style scoped>
.main {
  min-height: calc(100vh - 92px);
  margin: 14px auto;
}

.card {
  box-shadow: 0 0 5px 1px rgba(0, 0, 0, 0.1);
}

.card-img-wrap {
  overflow: hidden;
}

.card-img-top {
  width: 100%;
  transition: all 0.6s ease-in-out;
  padding-top: 85%;
  background-repeat: no-repeat;
  background-position: 50% 50%;
  background-size: 100% auto;
  background-color: rgba(61, 59, 59, 0.85);
}

.card-img-top:hover {
  background-color: #3d3b3b;
  transform: scale3D(1.1, 1.1, 1);
}

.card-text {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
}

.card-text:hover {
  display: block;
}
</style>
