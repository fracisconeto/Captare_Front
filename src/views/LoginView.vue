<script setup>
import { ref } from 'vue'
import RodaView from '../components/RodaView.vue'

const email = ref('')
const senha = ref('')

const login = () => {
  console.log('Email:', email.value)
  console.log('Senha:', senha.value)
  // lógica de login aqui
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

        <input type="email" v-model="email" placeholder="E-mail" />
        <input type="password" v-model="senha" placeholder="Senha" />

        <button class="btn-login" @click="login">Login</button>
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
