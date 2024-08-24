import { createRouter, createWebHistory } from 'vue-router'
import TransactionHistory from '@/views/Transactions/TransactionHistory.vue'
import Dashboard from '@/views/DashBoard/Dashboard.vue'
import Register from '@/views/Authentication/Register.vue'
import Login from '@/views/Authentication/Login.vue'
import Home from '@/views/HomePage/Home.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/transactions',
      name: 'transactions',
      component: TransactionHistory
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: Dashboard
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    }
  ]
})

export default router
