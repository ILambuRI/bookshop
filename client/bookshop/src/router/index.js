import Vue from 'vue'
import Router from 'vue-router'
import MainPage from '@/components/Main'
import UserCart from '@/components/Cart'
import UserOrders from '@/components/Orders'
import UserRegistration from '@/components/Registration'
import Admin from '@/components/Admin'

import EditUser from '@/components/sections/admin/EditUser'

import NewAuthor from '@/components/sections/admin/NewAuthor'
import EditAuthor from '@/components/sections/admin/EditAuthor'

import NewGenre from '@/components/sections/admin/NewGenre'
import EditGenre from '@/components/sections/admin/EditGenre'

import NewBook from '@/components/sections/admin/NewBook'
import EditBook from '@/components/sections/admin/EditBook'

import AllOrders from '@/components/sections/admin/AllOrders'

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
        { path: 'new-user', component: UserRegistration },
        { path: 'edit-user/:id', component: EditUser },

        { path: 'new-author', component: NewAuthor },
        { path: 'edit-author/:id', component: EditAuthor },

        { path: 'new-genre', component: NewGenre },
        { path: 'edit-genre/:id', component: EditGenre },

        { path: 'new-book', component: NewBook },
        { path: 'edit-book/:id', component: EditBook },

        { path: 'all-orders', component: AllOrders },
      ]
    },
  ]
})
