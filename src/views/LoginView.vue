<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import RodaView from '@/components/RodaView.vue'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()
const router = useRouter()

const email = ref('')
const senha = ref('')
const erro = ref('')
const loading = ref(false)

const login = async () => {
  if (!email.value || !senha.value) {
    erro.value = 'Por favor, preencha todos os campos'
    return
  }

  loading.value = true
  erro.value = ''

  try {
    await authStore.login(email.value, senha.value)

    if (authStore.token) {
      router.push('/')
    } else {
      erro.value = 'Email ou senha incorretos'
    }
  } catch (error) {
    erro.value = error.message || 'Erro ao fazer login. Tente novamente.'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="login-page">
    <div class="login-container">
      <div class="welcome">
        <h1>Seja bem-vindo</h1>
        <img src="../assets/macho.png" alt="Usuário" class="welcome-icon" />
      </div>

      <div class="login-box">
        <h2>Faça seu login</h2>

        <div v-if="erro" class="erro-msg">{{ erro }}</div>

        <input type="email" v-model="email" placeholder="E-mail" />
        <input type="password" v-model="senha" placeholder="Senha" />

        <!-- Botão principal -->
        <button class="btn-login" @click="login" :disabled="loading">
          {{ loading ? 'Entrando...' : 'Login' }}
        </button>

        <!-- Botão de cadastro com mesmo estilo -->
        <RouterLink to="/cadastro" class="btn-login">
          Não tenho cadastro
        </RouterLink>
      </div>
    </div>
  </div>

  <hr />
  <RodaView />
</template>

<style scoped>
.login-page {
  min-height: 70vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #8cb3c6;
}

.login-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
}

.welcome {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-bottom: 25px;
}

.welcome h1 {
  font-size: 26px;
  font-weight: 600;
  color: white;
}

.welcome-icon {
  width: 28px;
  height: 28px;
  filter: brightness(0) invert(1);
}

.login-box {
  background: #fff;
  padding: 40px;
  border-radius: 16px;
  width: 360px;
  text-align: center;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  display: flex;
  flex-direction: column;
  align-items: center;
}

.login-box h2 {
  margin-bottom: 25px;
  font-size: 22px;
  color: #1f2d3d;
  font-weight: 600;
}

.erro-msg {
  background-color: #fee;
  color: #c33;
  padding: 12px;
  border-radius: 8px;
  margin-bottom: 16px;
  font-size: 14px;
  border-left: 4px solid #c33;
}

.login-box input {
  width: 100%;
  padding: 12px 16px;
  margin-bottom: 18px;
  border: 2px solid #e0e0e0;
  border-radius: 10px;
  outline: none;
  font-size: 15px;
  transition: all 0.3s ease;
}

.login-box input:focus {
  border-color: #8cb3c6;
  box-shadow: 0 0 8px rgba(140, 179, 198, 0.4);
  transform: translateY(-2px);
}

/* Botões iguais */
.btn-login {
  width: 100%;
  padding: 12px;
  border-radius: 10px;
  font-weight: 600;
  font-size: 17px;
  text-align: center;
  cursor: pointer;
  border: none;
  display: block;
  margin-bottom: 12px;
  transition: all 0.3s ease;
  background: #5d7c87;
  color: white;
  box-shadow: 0 2px 8px rgba(93, 124, 135, 0.3);
}

.btn-login:hover {
  background: #4c6770;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(93, 124, 135, 0.4);
}

.btn-login:disabled {
  background: #a0b5bd;
  cursor: not-allowed;
  opacity: 0.7;
}
</style>
