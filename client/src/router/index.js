import { createRouter, createWebHistory } from "vue-router";
import Signin from "../components/Signin";
import SignUp from "../components/SignUp";
import Welcome from "../components/Welcome";
import Error from "../components/Error";
import Views from "../components/Views";
import Home from "../views/Home";
import About from "../views/About";
import Admin from "../views/admin/Admin";
import Trash from "../views/admin/Trash";
import store from "../store";

const routes = [
  { name: "Welcome", component: Welcome },
  {
    name: "Views",
    component: Views,
    children: [
      {
        name: "Home",
        path: "/home",
        component: Home,
        meta: { reqAuth: true },
      },
      { name: "About", path: "/about", component: About },
      {
        name: "Admin",
        path: "/admin",
        component: Admin,
        meta: { reqAuth: true, reqAdmin: true },
      },
      {
        name: "Trash",
        path: "/admin/trash",
        component: Trash,
        meta: { reqAuth: true, reqAdmin: true },
      },
    ],
  },

  { name: "Signin", path: "/signin", component: Signin },
  { name: "Signup", path: "/signup", component: SignUp },
  { name: "Error", path: "/:pathMatch(.*)*", component: Error },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

// Router guard
router.beforeEach(to => {
  if (to.meta.reqAuth && !store.getters.isLoggedIn) {
    return {
      path: "/signin",
    };
  }
  if (to.meta.reqAdmin && store.getters.role !== "admin") {
    return {
      path: "/error",
    };
  }
  document.title = `LearnIt - ${to.name}`;
});

export default router;
