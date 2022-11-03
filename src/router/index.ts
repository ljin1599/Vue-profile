import { createRouter, createWebHistory } from 'vue-router'

import Main from '@/views/Main.vue'
import About from '@/views/About.vue'
import Skill from '@/views/Skill.vue'
import Frontend from '@/views/Frontend.vue'
import Backend from '@/views/Backend.vue'
import Database from '@/views/Database.vue'
import Project from '@/views/Project.vue'
import Career from '@/views/Career.vue'
import readAbout from '@/views/readAbout.vue'
import readSkill from '@/views/readSkill.vue'
import readProject from '@/views/readProject.vue'
import readCareer from '@/views/readCareer.vue'

export const routes = [
    {path: '/',  components: {
        a: Main
        },
        props: true
    },
    {path:'/about', name: 'about', component:  About, props: true},
    {path:'/skill', name: 'skill', component: Skill, props: true},
    {path:'/frontend', name: 'frontend', component: Frontend, props: true},
    {path:'/backend', name: 'backend', component: Backend, props: true},
    {path:'/database', name: 'database', component: Database, props: true},
    {path:'/project', name: 'project', component: Project, props: true},
    {path:'/career', name: 'career', component: Career, props: true},
    {path:'/readabout', name:'readabout', component: readAbout, props: true},
    {path:'/readskill', name: 'readskill', component: readSkill, props: true},
    {path:'/readproject', name: 'readproject', component: readProject, props: true},
    {path:'/readcareer', name: 'readcareer', component: readCareer, props: true},
]

const router = createRouter({  // 기록모드 HTML5
    history: createWebHistory(), // 페이지를 다시 로드하지 않고 URL을 탐색할 수 있습니다.
    routes
})

export default router
