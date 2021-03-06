import Vue from "vue";
import Router from "vue-router";
import PageNotFound from "@/views/page-not-found";

Vue.use(Router);

//const parseProps = r => ({ id: parseInt(r.params.id) });

export default new Router({
  mode: "history",
  //base: process.env.BASE_URL,
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
      // props: true,
      //props: parseProps,
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
