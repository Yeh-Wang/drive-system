import {createRouter, createWebHistory} from 'vue-router'
import LoginView from "@/views/LoginView.vue";


const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            redirect: '/login',
        },
        {
            path: '/login',
            name: 'login',
            component: LoginView
        },
        {
            path: '/regularUser',
            name: 'regularUser',
            component: () => import('../views/RegularUser.vue'),
            children: [
                {
                    path: 'introduceOne',
                    name: 'OneOrFour',
                    component: () => import('@/components/RegularUser/MainComponents/Introduce/IntroduceOne.vue')
                },
                {
                    path: 'introduceTwo',
                    name: 'TwoOrThree',
                    component: () => import('@/components/RegularUser/MainComponents/Introduce/IntroduceTwo.vue')
                },
                {
                    path: 'LearnOne',
                    name: 'LearnOne',
                    component: () => import('@/components/RegularUser/MainComponents/Learn/LearnOne.vue')
                },
                {
                    path: 'LearnTwo',
                    name: 'LearnTwo',
                    component: () => import('@/components/RegularUser/MainComponents/Learn/LearnTwo.vue')
                },
                {
                    path: 'bookExam/:subjectId',
                    name: 'bookExam',
                    component: () => import('@/components/RegularUser/MainComponents/bookExam/BookExam.vue')
                }
            ]
        }
    ]
})

export default router
