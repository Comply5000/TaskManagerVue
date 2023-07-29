import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import MainView from '../views/MainView.vue'

import TaskTableComponent from "@/components/TaskTableComponent.vue";
import CategoryTableComponent from "@/components/CategoryTableComponent.vue";
import test from "@/components/test.vue";
import test2 from "@/components/test2.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: LoginView,
      props: true
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView
    },
    {
      path: '/main',
      name: 'main',
      component: MainView,
      meta: { requiresAuth: true },
      children: [
        { path: "", component: TaskTableComponent }, // Przykładowy podkomponent
        { path: "categories", component: CategoryTableComponent }, // Inny podkomponent// Jeszcze inny podkomponent
      ],
    },
  ]
})

router.beforeEach((to, from, next) => {
  const isLoggedIn = localStorage.getItem('jwt');
  if (to.matched.some(record => record.meta.requiresAuth) && !isLoggedIn) {
    // Jeśli użytkownik nie jest zalogowany i próbuje wejść na chroniony widok, przekierowujemy go na stronę logowania
    next('/');
  } else {
    next();
  }
});

export default router
