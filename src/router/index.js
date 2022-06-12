import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: "Login-Page",
        component: () => import('../views/Login.vue'),
    },
    {
        path: '/pages',
        name: "Pages",
        component: () => import('../views/Pages.vue'),
        children: [
            {
                path: 'dashboard',
                component: () => import('../views/Dashboard.vue'),
            },
            {
                path: 'exam-data',
                component: () => import('../views/ExamData.vue'),
            },
        ]
    },
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router