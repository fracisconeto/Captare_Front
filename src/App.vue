<script setup>
import { computed } from 'vue'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()
const estaLogado = computed(() => !!authStore.token)
</script>

<template>
  <nav>
    <div class="nav-content">
      <div class="links">
        <RouterLink to="/">Velas</RouterLink>
        <RouterLink to="/hidratante">Hidratante</RouterLink>
        <RouterLink to="/banho">Banho</RouterLink>
      </div>

      <div class="logo-nav">
        <RouterLink to="/">
          <img src="../src/assets/Captare.png" alt="captare" />
        </RouterLink>
      </div>

      <div class="links2">
        <RouterLink to="/">
          <img src="../src/assets/coracao.png" alt="captare" />
        </RouterLink>
        <RouterLink to="/carrinho">
          <img src="../src/assets/bolsa.png" alt="captare" />
        </RouterLink>
        <!-- Mostra perfil se logado, login se não logado -->
        <RouterLink v-if="estaLogado" to="/perfil" title="Meu Perfil">
          <img src="../src/assets/macho.png" alt="perfil" />
        </RouterLink>
        <RouterLink v-else to="/login" title="Fazer Login">
          <img src="../src/assets/macho.png" alt="login" />
        </RouterLink>
      </div>
    </div>

    <!-- Linha branca visível -->
    <hr class="nav-divider" />

    <!-- Espaço azul após a linha -->
    <div class="nav-bottom-space"></div>
  </nav>

  <RouterView />
</template>

<style scoped>
nav {
  background-color: #8cb3c6;
  display: flex;
  flex-direction: column;
}

.nav-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 40px;
  height: 100px;
}

.links,
.links2 {
  display: flex;
  gap: 24px;
  align-items: center;
}

.links {
  flex: 1;
  justify-content: flex-start;
}

.logo-nav {
  flex: 1;
  display: flex;
  justify-content: center;
}

.logo-nav img {
  height: 60px;
}

.links2 {
  flex: 1;
  justify-content: flex-end;
}

.links a,
.links2 a {
  color: #ffffff;
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
  background-color: #ffffff;
  border: none;
  width: 100%;
  margin: 8px 0 0 0; /* pequeno espaço acima da linha */
}

/* Espaço azul embaixo da linha */
.nav-bottom-space {
  height: 22px; /* ajuste conforme o design do Figma */
}
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

  .links,
  .links2 {
    gap: 16px;
    flex: unset;
    justify-content: center;
    width: 100%;
    margin: 8px 0;
  }

  .logo-nav {
    justify-content: center;
    margin: 10px 0;
  }

  .logo-nav img {
    height: 44px;
  }

  /* Links em fonte maior para facilitar o toque */
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
}

</style>
