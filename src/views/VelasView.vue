<script setup>
import RodaView from '../components/RodaView.vue';
</script>
<template>
  <div class="velas-container">

    <div class="titulo">
      <img src="../assets/vela.png" alt="ícone vela" />
      <h1>Velas Aromáticas</h1>
    </div>


    <div class="grid-velas">
      <div class="box-vela" v-for="i in 4" :key="i">
        <div class="container-img">
          <img src="../assets/vela1.png" alt="vela" />
        </div>
        <div class="continer-texto">
          <h3>Vela Aromática de Bambu</h3>
          <h2>R$65,00</h2>
        </div>
        <div class="container-adicionar">
          <img src="../assets/coracao.png" alt="favoritar" />
          <button class="btn-adicionar">Adicionar</button>
        </div>
      </div>
    </div>

  </div>

  <RodaView/>
</template>

<style scoped>
.velas-container {
  padding: 60px 80px;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* Título centralizado */
.titulo {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 48px;
}

.titulo img {
  width: 40px;
  height: 40px;
}

.titulo h1 {
  font-size: 36px;
  color: #8CB3C6;
  font-weight: 600;
}

/* Grid com 4 colunas */
.grid-velas {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 48px;
  width: 100%;
  max-width: 1400px;
}

/* Cada card de vela */
.box-vela {
  background-color: #8CB3C6;
  padding: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* Imagem da vela */
.container-img img {
  width: 100%;
  height: auto;
}

/* Texto da vela */
.continer-texto {
  text-align: center;
  margin: 20px 0;
}

.continer-texto h3 {
  font-size: 20px;
  color: white;
  margin-bottom: 8px;
}

.continer-texto h2 {
  font-size: 22px;
  color: white;
  margin: 0;
}

/* Botão adicionar */
.container-adicionar {
  display: flex;
  align-items: center;
  gap: 12px;
}

.container-adicionar img {
  width: 28px;
  height: 28px;
}

.btn-adicionar {
  background-color: #ffffff;
  color: #8CB3C6;
  font-weight: bold;
  border: none;
  padding: 10px 18px;
  font-size: 16px;
  cursor: pointer;
}
</style>
