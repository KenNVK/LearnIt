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
        path: "/home",
        component: Home,
        meta: { reqAuth: true },
      },
      { path: "/about", component: About },
      {
        path: "/admin",
        component: Admin,
        meta: { reqAuth: true, reqAdmin: true },
      },
      {
        path: "/admin/trash",
        component: Trash,
        meta: { reqAuth: true, reqAdmin: true },
      },
    ],
  },

  { path: "/signin", component: Signin },
  { path: "/signup", component: SignUp },
  { path: "/:pathMatch(.*)*", component: Error },
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
});

export default router;
