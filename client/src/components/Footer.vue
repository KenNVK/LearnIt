<template>
  <footer class="footer">
    <div class="footer-info">
      <img src="../assets/images/ken.jpg" alt="photo" />
      <div class="footer-info-link">
        <span>{{ new Date().getFullYear() }} Written by</span>
        <a href="https://github.com/KenNVK/learnit"
          ><i class="ri-github-fill github-icon"></i>KenNVK</a
        >
      </div>
    </div>
    <div class="date">
      <span>{{ dateTime(new Date().getTime()) }}</span>
    </div>
  </footer>
</template>

<script>
import moment from "moment";

export default {
  name: "Footer",
  setup() {
    const dateTime = date => moment(date).format("HH:mm / YYYY-MM-DD");
    return { dateTime };
  },
};
</script>

<style scoped>
footer {
  height: 58px;
  font-style: italic;
  background-color: #363636;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.footer-info {
  display: flex;
  justify-content: center;
  align-items: center;
}

.footer-info img {
  width: 36px;
  border-radius: 50%;
  margin: 8px 8px 10px 16px;
  vertical-align: middle;
}

.footer-info span {
  color: #ccc;
  line-height: 56px;
  font-weight: 500;
}

.footer-info a {
  text-decoration: none;
  color: #2c55c5;
  margin-left: 4px;
}

.footer .date {
  color: #ccc;
  padding: 8px;
  font-weight: 500;
}

.footer .date-icon {
  vertical-align: sub;
  padding: 4px;
}

.footer .github-icon {
  vertical-align: sub;
  font-size: 1.2rem;
  padding: 4px;
}
</style>
