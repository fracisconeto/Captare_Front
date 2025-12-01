<script setup>
import { computed } from 'vue'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()
const estaLogado = computed(() => !!authStore.token)
</script>

<template>
  <nav>
   

      <!-- Logo + categorias CENTRALIZADOS -->
      <div class="logo-col">
        <RouterLink to="/" class="logo-nav">
          <img src="../src/assets/captare2.png" alt="captare" />
        </RouterLink>

        <div class="links">
          <RouterLink to="/">Velas</RouterLink>
          <RouterLink to="/hidratante">Hidratante</RouterLink>
          <RouterLink to="/banho">Banho</RouterLink>
        </div>
      </div> 
      <div class="nav-content">
      <!-- Ícones à esquerda -->
      <div class="links2">
        <RouterLink to="/">
          <img src="../src/assets/coraçaoazul.png" alt="favoritos" />
        </RouterLink>
        <RouterLink to="/carrinho">
          <img src="../src/assets/bolsa.png" alt="carrinho" />
        </RouterLink>
        <RouterLink v-if="estaLogado" to="/perfil" title="Meu Perfil">
          <img src="../src/assets/user.png" alt="perfil" />
        </RouterLink>
        <RouterLink v-else to="/login" title="Fazer Login">
          <img src="../src/assets/user.png" alt="login" />
        </RouterLink>
      </div>

      <!-- espaço vazio à direita só para equilibrar -->
      <div class="right-space"></div>
    </div>

    <hr class="nav-divider" />
    <div class="nav-bottom-space"></div>
  </nav>

  <RouterView />
</template>

<style scoped>
nav {
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
}

/* Container principal */
.nav-content {
  display: flex;
  align-items: center;
  padding: 0 40px;
  height: 120px;
}

/* Coluna central: logo + categorias */
.logo-col {
  flex: 0 0 auto;          /* tamanho só do conteúdo */
  display: flex;
  flex-direction: column;
  align-items: center;      /* centraliza logo e links */
  gap: 8px;
  margin: 0 auto;           /* centraliza a coluna dentro da nav */
  margin-top: 50px;
}

.logo-nav img {
  height: 60px;
}

/* Links das categorias */
.links {
  display: flex;
  gap: 24px;
}

/* Ícones (coração, bolsa, user) à esquerda */
.links2 {
  display: flex;
  gap: 24px;
  align-items: center;
  justify-content: flex-start;
  flex: 1;
  margin-left: 160vh;
  margin-top: -200px;
}

/* Div vazia à direita só para equilibrar o flex */
.right-space {
  flex: 1;
}

/* Estilo dos links */
.links a,
.links2 a {
  color: #8cb3c6;
  text-decoration: none;
  font-weight: bold;
  font-size: 16px;
}

.links a.router-link-exact-active {
  text-decoration: underline;
}

/* Linha branca com espaço acima */
.nav-divider {
  height: 2px;
  background-color: #8cb3c6;
  border: none;
  width: 100%;
  margin-top: -100px;
}

/* Espaço azul embaixo da linha */
.nav-bottom-space {
  height: 22px;
}

/* MOBILE */
@media (max-width: 600px) {
  nav {
    flex-direction: column;
  }

  .nav-content {
    flex-direction: column;
    padding: 0 10px;
    height: auto;
    min-height: 90px;
    gap: 12px;
  }

  .links2 {
    justify-content: center;
    width: 100%;
    margin: 8px 0;
  }

  .logo-col {
    order: -1; /* logo + categorias primeiro */
    margin: 0 auto;
  }

  .links {
    justify-content: center;
    flex-wrap: wrap;
    gap: 16px;
  }

  .logo-nav img {
    height: 44px;
  }

  .links a,
  .links2 a {
    font-size: 18px;
    padding: 6px 0;
    line-height: 1.3;
  }

  .nav-divider {
    margin: 14px 0 0 0;
    height: 2px;
  }

  .nav-bottom-space {
    height: 16px;
  }

  .right-space {
    display: none;
  }
}
</style>
