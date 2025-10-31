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

    // Verifica se o login foi bem-sucedido checando se o token existe
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
      <!-- Texto de boas-vindas -->
      <div class="welcome">
        <h1>Seja bem-vindo</h1>
        <img src="../assets/macho.png" alt="Usuário" class="welcome-icon" />
      </div>

      <!-- Card de login -->
      <div class="login-box">
        <h2>Faça seu login</h2>

        <!-- Mensagem de erro -->
        <div v-if="erro" class="erro-msg">{{ erro }}</div>

        <input type="email" v-model="email" placeholder="E-mail" />
        <input type="password" v-model="senha" placeholder="Senha" />

        <button class="btn-login" @click="login" :disabled="loading">
          {{ loading ? 'Entrando...' : 'Login' }}
        </button>
        <RouterLink to="/cadastro">
          <button class="btn-secondary">Não tenho cadastro</button>
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
  filter: brightness(0) invert(1); /* deixa o ícone branco */
}

.login-box {
  background: #fff;
  padding: 40px;
  border-radius: 16px;
  width: 360px;
  text-align: center;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
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

/* Garante que RouterLink (que é <a>) não fique azul ou sublinhado */
.login-box a {
  text-decoration: none;
  color: inherit;
  display: block;
}

/* Botões */
.btn-login,
.btn-secondary {
  width: 70%;
  margin: 0 auto 12px;
  display: block;
  padding: 12px;
  border-radius: 10px;
  cursor: pointer;
  text-align: center;
  transition: all 0.3s ease;
  font-weight: 600;
}

/* Botão principal */
.btn-login {
  background: #5d7c87;
  color: white;
  border: none;
  font-size: 17px;
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

.btn-login:disabled:hover {
  transform: none;
  box-shadow: 0 2px 8px rgba(93, 124, 135, 0.3);
}

/* Botão secundário */
.btn-secondary {
  background: #dce7ec;
  color: #444;
  border: none;
  font-size: 15px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
}

.btn-secondary:hover {
  background: #c7d6dc;
  transform: translateY(-2px);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
}
</style>
