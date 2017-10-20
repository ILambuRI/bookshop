import Vue from 'vue'
import Router from 'vue-router'
import MainPage from '@/components/Main'
import UserCart from '@/components/Cart'
import UserOrders from '@/components/Orders'
import UserRegistration from '@/components/Registration'
import NewAuthor from '@/components/sections/NewAuthor'
import Admin from '@/components/Admin'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Main page',
      component: MainPage
    },

    {
      path: '/cart',
      name: 'User Cart',
      component: UserCart
    },

    {
      path: '/orders',
      name: 'User Orders',
      component: UserOrders
    },

    {
      path: '/registration',
      name: 'User Registration',
      component: UserRegistration
    },

    {
      path: '/admin',
      name: 'Admin',
      component: Admin,
      children: [
        { path: 'newuser', component: UserRegistration },
        { path: 'new-author', component: NewAuthor },
        // { path: 'edit-author', component: EditAuthor },
      ]
    },
  ]
})
