import Vue from 'vue'
import Router from 'vue-router'
import HelloDevice from '@/components/HelloDevice'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloDevice',
      component: HelloDevice
    }
  ]
})
