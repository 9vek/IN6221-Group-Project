import { createRouter, createWebHistory } from "vue-router";
import Index from './views/Index.vue'
import Page1 from './views/Page1.vue'
import Page2 from './views/Page2.vue'
import Page3 from './views/Page3.vue'
import Page4 from './views/Page4.vue'
import Page5 from './views/Page5.vue'
import Page6 from './views/Page6.vue'
import Page7 from './views/Page7.vue'

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
    {
      path: '/4',
      name: "page4", // remember to modify
      component: Page4,
    }, 
    {
      path: '/5',
      name: "page5", // remember to modify
      component: Page5,
    }, 
    {
      path: '/6',
      name: "page6", // remember to modify
      component: Page6,
    }, 
    {
      path: '/7',
      name: "page7", // remember to modify
      component: Page7,
    }, 
  ]
})

export default router