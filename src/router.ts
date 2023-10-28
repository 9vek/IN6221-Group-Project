import { createRouter, createWebHistory } from "vue-router";
import Index from './views/Index.vue'
import Page1 from './views/Page1.vue'
import Page2 from './views/Page2.vue'
import Page3 from './views/Page3.vue'

const webHistory = createWebHistory()

const router = createRouter({
  history: webHistory,
  routes: [
    {
      path: '/',
      name: "home",
      component: Index,
    }, 
    {
      path: '/1',
      name: "page1", // remember to modify
      component: Page1,
    }, 
    {
      path: '/2',
      name: "page2", // remember to modify
      component: Page2,
    }, 
    {
      path: '/3',
      name: "page3", // remember to modify
      component: Page3,
    }, 
  ]
})

export default router