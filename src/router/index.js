import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
// import loginPage from '../components/loginPage.vue'
import usersPage from '../content/usersPage.vue'
import itensPage from '../content/itensPage.vue'
import shopPage from '../content/shopPage.vue'
import financesPage from '../content/financesPage.vue'
import reportsPage from '../content/reportsPage'
import userRegister from '../content/userRegister'
import productsRegister from '@/content/productsRegister'

Vue.use(VueRouter)

const routes = [
  // { path: '/',
  //   name: 'login',
  //   component: loginPage 
  // },
  {
    path: '/home',
    name: 'home',
    component: HomeView
  },
  {
    path: '/users',
    name: 'users',
    component: usersPage
  },
  {
    path: '/itens',
    name: 'itens',
    component: itensPage
  },
  {
    path: '/shop',
    name: 'shop',
    component: shopPage
  },
  {
    path: '/finances',
    name: 'finances',
    component: financesPage
  },
  {
    path: '/reports',
    name: 'reports',
    component: reportsPage
  },
  {
    path: '/user_register',
    name: 'user register',
    component: userRegister
  },
  { 
    path: '/products_register',
    name: 'procuts register',
    component: productsRegister
  }
]

const router = new VueRouter({
  routes
})

export default router
