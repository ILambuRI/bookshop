import Vue from 'vue'
import Router from 'vue-router'
import MainPage from '@/components/Main'
import UserCart from '@/components/Cart'
import UserOrders from '@/components/Orders'

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
  ]
})
