import { createRouter, createWebHashHistory } from "vue-router";
const Proxy = () => import("../page/proxy/index.vue");

const routes = [
    { path: '/', component: Proxy },
    { path: '/proxy', component: Proxy },
]
  
const router = createRouter({
    // todo 待学习
    history: createWebHashHistory(),
    routes
})

export default router