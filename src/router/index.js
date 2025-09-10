import { createRouter, createWebHistory } from 'vue-router'
import VelasView from '../views/VelasView.vue'
import BanhoView from '../views/BanhoView.vue'
import HidratantesView from '../views/HidratantesView.vue'
import CadastroView from '../views/CadastroView.vue'
import LoginView from '../views/LoginView.vue'
import EnderecoView from '../views/EnderecoView.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: VelasView,
    },
    {
      path: '/banho',
      name: 'banho',
      component: BanhoView,
    },
    {
      path:'/hidratante',
      name:'hidratante',
      component:HidratantesView,

    },

     {
      path:'/cadastro',
      name:'cadastro',
      component:CadastroView,

    },
    {
      path: '/login',
      name:'login',
      component:LoginView

    },
    {
      path:'/endereço',
      name:'endereço',
      component:EnderecoView
    }
  
  ],
})

export default router
