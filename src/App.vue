<script setup>
import { computed } from 'vue'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()
const estaLogado = computed(() => !!authStore.token)
</script>

<template>
  <nav>
    <div class="nav-content">
      <div class="links2">
        <!-- ícones à esquerda ou direita, como preferir -->
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
/* Linha branca com espaço acima */
.nav-divider {
  height: 2px;
  background-color: #8cb3c6;
  border: none;
  width: 100%;
  margin: 8px 0 0 0; /* pequeno espaço acima da linha */
}

/* Espaço azul embaixo da linha */
.nav-bottom-space {
  height: 22px; /* ajuste conforme o design do Figma */
}
.nav-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 40px;
  height: 120px; /* um pouco maior pra caber logo + categorias */
}

.logo-col {
  flex: 1;
  display: flex;
  flex-direction: column;   /* logo em cima, links embaixo */
  align-items: center;      /* tudo centralizado */
  gap: 8px;
}

.logo-nav img {
  height: 60px;
}

.links {
  display: flex;
  gap: 24px;
}

.links2 {
  display: flex;
  gap: 24px;
  align-items: center;
  justify-content: flex-end;
  flex: 1;
}

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

/* ajuste no mobile: tudo empilhado */
@media (max-width: 600px) {
  .nav-content {
    flex-direction: column;
    height: auto;
    gap: 12px;
  }

  .logo-col {
    order: -1;               /* logo + categorias primeiro, se quiser */
  }

  .links {
    justify-content: center;
    flex-wrap: wrap;
  }

  .links a,
  .links2 a {
    font-size: 18px;
  }
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
