<template>
  <nav>
    <div class="nav-content">
      <div class="links">
        <RouterLink to="/">Velas</RouterLink>
        <RouterLink to="/hidratante">Hidratante</RouterLink>
        <RouterLink to="/banho">Banho</RouterLink>
      </div>

      <div class="logo-nav">
        <RouterLink to="/vela">
          <img src="../src/assets/Captare.png" alt="captare" />
        </RouterLink>
      </div>

      <div class="links2">
        <RouterLink to="/">
          <img src="../src/assets/coracao.png" alt="captare" />
        </RouterLink>
        <RouterLink to="/">
          <img src="../src/assets/bolsa.png" alt="captare" />
        </RouterLink>
        <RouterLink to="/">
          <img src="../src/assets/macho.png" alt="captare" />
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
  background-color: #8CB3C6;
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
  color: #FFFFFF;
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
  background-color: #FFFFFF;
  border: none;
  width: 100%;
  margin: 8px 0 0 0; /* pequeno espaço acima da linha */
}

/* Espaço azul embaixo da linha */
.nav-bottom-space {
  height: 22px; /* ajuste conforme o design do Figma */
}
</style>
