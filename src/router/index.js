import { createRouter, createWebHistory } from 'vue-router'
import Tracker from '../views/Tracker.vue'
import Income from '../views/Income.vue'
import Summary from '../views/Summary.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/tracker',
      name: 'Tracker',
      component: Tracker
    },

    {
      path: '/income',
      name: 'Income',
      component: Income
    },

    {
      path: '/summary',
      name: 'Summary',
      component: Summary
    },
  ]
})

export default router
