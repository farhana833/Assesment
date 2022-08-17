import { createRouter, createWebHistory } from 'vue-router'
import Department from '../components/Department.vue'
import Form from '../components/Form.vue'
import Employee from '../components/Employee.vue'
import Empform from '../components/Empform.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/Department',
      name: 'Department',
      component: Department
    },
    {
      path: '/Form',
      name: 'Form',
      component: Form
    },
    {
      path: '/Employee',
      name: 'Employee',
      component: Employee
    },
    {
      path: '/Empform',
      name: 'Empform',
      component: Empform
    }
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('../views/AboutView.vue')
    // }
  ]
})

export default router
