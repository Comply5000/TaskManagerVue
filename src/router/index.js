import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import DashboardView from '../views/DashboardView.vue'
import ConfirmAccountView from '../views/ConfirmAccountView.vue'
import ResetPasswordRequestView from "../views/ResetPasswordRequestView.vue";
import ResetPasswordView from "../views/ResetPasswordView.vue";

import TaskTableComponent from "@/components/TaskTableComponent.vue";
import CategoryTableComponent from "@/components/CategoryTableComponent.vue";
import CreateTaskComponent from "@/components/CreateTaskComponent.vue";
import UpdateCategoryComponent from "@/components/UpdateCategoryComponent.vue";
import UpdateTaskComponent from "@/components/UpdateTaskComponent.vue";
import TaskViewComponent from "@/components/TaskViewComponent.vue";

import test from "@/components/test.vue";

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
      path: '/confirm-account',
      name: 'confirm-account',
      component: ConfirmAccountView
    },
    {
      path: '/send-reset-password-request',
      name: 'send-reset-password-request',
      component: ResetPasswordRequestView
    },
    {
      path: '/reset-password',
      name: 'reset-password',
      component: ResetPasswordView
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: DashboardView,
      meta: { requiresAuth: true },
      children: [
        { path: "", component: TaskTableComponent },
        { path: "categories", component: CategoryTableComponent },
        { path: "task", component: TaskViewComponent }, 
        { path: "create-task", component: CreateTaskComponent },
        { path: "update-category", component: UpdateCategoryComponent },
        { path: "update-task", component: UpdateTaskComponent },
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
