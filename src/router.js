import Vue from "vue";
import Router from "vue-router";
import PageNotFound from "@/views/page-not-found";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      redirect: "/people"
    },
    {
      path: "/people",
      name: "people",
      component: () => import("./views/people.vue")
    },
    {
      path: "/people/:id",
      name: "person-detail",
      component: () => import("./views/person-detail.vue")
    },
    {
      path: "/about",
      name: "about",
      component: () => import("./views/about.vue")
    },
    {
      path: "*",
      component: PageNotFound
    }
  ]
});
