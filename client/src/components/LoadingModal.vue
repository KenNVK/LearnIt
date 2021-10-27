<template>
  <transition name="fade">
    <div class="loading" v-if="isLoading">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
  </transition>
</template>

<script>
import { ref, watchEffect } from "vue";
import { useStore } from "vuex";
export default {
  name: "LoadingModal",
  setup() {
    const isLoading = ref(null);
    const store = useStore();

    watchEffect(() => {
      store.dispatch("status");
      const loading = store.state.loading;
      isLoading.value = loading;
    });

    return { isLoading };
  },
};
</script>

<style scoped>
/* Loading */
.loading {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
