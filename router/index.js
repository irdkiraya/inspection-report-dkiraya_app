import { createRouter, createWebHistory } from 'vue-router'
import InspectionForm from '../views/InspectionForm.vue'

const routes = [
  {
    path: '/',
    name: 'InspectionForm',
    component: InspectionForm
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router