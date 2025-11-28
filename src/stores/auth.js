import { useStorage } from '@vueuse/core'
import { defineStore } from 'pinia'
import AuthService from '@/services/auth'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: useStorage('auth-user', null),
    token: useStorage('auth-token', null),
  }),

  actions: 
  {
    async login(email, password) {
      try {
        const authService = new AuthService()
        const data = await authService.login(email, password)
        this.token = data.access

        // Busca os dados completos do usuário
        try {
          const userData = await authService.me(data.access)
          this.user = userData
        } catch (err) {
          console.error('Failed to fetch user data:', err)
          // Se falhar ao buscar dados do usuário, salva só o email
          this.user = { email }
        }
      } catch (error) {
        console.error('Login failed:', error)
        throw error
      }
    },

    logout() {
      this.user = null
      this.token = null
    },

    async register(userData) {
      try {
        const authService = new AuthService()
        const data = await authService.register(userData)
        this.user = data.user
        this.token = data.token
      } catch (error) {
        console.error('Registration failed:', error)
        throw error
      }
    },
  },
})
