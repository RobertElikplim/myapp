//import vue-route,components ,views 
import { createRouter, createWebHistory } from 'vue-router'
import Home from '../components/ListEvents.vue'
import ZipCodeChart from '@/views/ZipCodeChart'
import EventChart from '@/views/EventChart'


// create route array  that contains each route with path, name, and components
var routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/createevent',
    name: 'createevent',
    component: () => import('../components/CreateEvent')
  },
  {
    path: '/createindividual',
    name: 'createindividual',
    component: () => import('../components/CreateIndividual')
  },
  {
    path: '/viewevent',
    name: 'viewevent',
    component: () => import('../components/ListEvents')
  },
  {
    path: '/viewindividual',
    name: 'viewindividual',
    component: () => import('../components/ListIndividuals')
  },
  {
    path: '/editevent/:id',
    name: 'edit-event',
    component: () => import('../components/EditEvent')
  },
  {
    path: '/editindividual/:id',
    name: 'edit-individual',
    component: () => import('../components/EditIndividual')
  },
  {
    path: '/otherindv/',
    name: 'otherindv',
    component: () => import('../components/IndividualOther')
  },
  {
    path: '/atthisevent/',
    name: 'atthisevent',
    component: () => import('../components/IndividualAtEvent')
  },
  {
    path: '/byzip/',
    name: 'byzip',
    component: () => import('../components/IndividualByZip')
  },
  {
    path: '/individualhistory/',
    name: 'individualhistory',
    component: () => import('../components/IndividualHistory')
  },
  {
    path: '/individualcount/',
    name: 'individualcount',
    component: () => import('../components/IndividualCount')
  },
  {
    path: '/zipch',
    name: 'ZipCodeChart',
    component: ZipCodeChart
  },
  {
    path: '/typech',
    name: 'EventChart',
    component: EventChart
  },
]



// use router to create our application
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes // short for `routes: routes`
})



// export the router
export default router