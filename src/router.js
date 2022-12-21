// import vue router
import { createRouter, createWebHistory } from 'vue-router'

// define a routes
const routes = [
  {
    path: '/',
    name: 'loginPage',
    component: () => import('@/views/LoginPage.vue'),
  },
  {
    path: '/',
    name: 'registerPage',
    component: () => import('@/views/RegisterPage.vue'),
  },
  {
    path: '/',
    name: 'beranda',
    component: () => import('@/components/DashboardLayout.vue'),
    children: [
      {
        path: '/band',
        name: 'band.index',
        component: () =>
          import('@/views/Band/indexPage.vue')
      },
      {
        path: '/band/create',
        name: 'band.create',
        component: () =>
          import('@/views/Band/createPage.vue')
      },
      {
        path: '/band/edit/:id',
        name: 'band.edit',
        component: () =>
          import('@/views/Band/updatePage.vue')
      },
      {
        path: '/concert',
        name: 'concert.index',
        component: () =>
          import('@/views/Concert/indexPage.vue')
      },
      {
        path: '/concert/create',
        name: 'concert.create',
        component: () =>
          import('@/views/Concert/createPage.vue')
      },
      {
        path: '/concert/edit/:id',
        name: 'concert.edit',
        component: () =>
          import('@/views/Concert/updatePage.vue')
      },
      {
        path: '/ticket',
        name: 'ticket.index',
        component: () =>
          import('@/views/Ticket/indexPage.vue')
      },
      {
        path: '/ticket/create',
        name: 'ticket.create',
        component: () =>
          import('@/views/Ticket/createPage.vue')
      },
      {
        path: '/ticket/edit/:id',
        name: 'ticket.edit',
        component: () =>
          import('@/views/Ticket/updatePage.vue')
      },
      {
        path: '/customer',
        name: 'customer.index',
        component: () =>
          import('@/views/Customer/indexPage.vue')
      },
      {
        path: '/customer/create',
        name: 'customer.create',
        component: () =>
          import('@/views/Customer/createPage.vue')
      },
      {
        path: '/customer/edit/:id',
        name: 'customer.edit',
        component: () =>
          import('@/views/Customer/updatePage.vue')
      }
    ]
  },
  {
    path: '/',
    name: 'landingPage',
    component: () => import('@/views/HomePage.vue'),
  },
  {
    path: '/',
    name: 'detailTicket',
    component: () => import('@/views/TicketPage.vue'),
  },
]

// create router
const router = createRouter({
  history: createWebHistory(),
  routes // config routes
})
export default router
