<script setup>
import RodaView from '../components/RodaView.vue';
</script>
<template>
<div class="produto-detalhes">
    <!-- Galeria de imagens -->
    <div class="galeria">
      <img src="@/assets/hidratante.jpg" alt="Foto vela 1" />
      <img src="@/assets/vela2.png" alt="Foto vela 2" />
      <img src="@/assets/vela3.png" alt="Foto vela 3" />
    </div>

    <!-- Imagem principal -->
    <div class="imagem-principal">
      <img src="@/assets/hidratante.jpg" alt="Imagem principal do produto" />
    </div>

    <!-- Informações do produto -->
    <div class="info-produto">
      <h2>Vela Amethyst</h2>
      <p class="preco">R$ 18,00</p>
      <p class="parcelamento">ou 10x de R$ 1,80</p>
      <p class="descricao">
        <strong>Composição:</strong><br />
        Base de cera de coco com aroma de frutas roxas e coloração lilás.<br />
        Propriedades calmantes que remetem ao roxo da nossa pele.
      </p>

      <!-- Adicionar produto -->
      <div class="acoes-produto">
        <div class="quantidade">
          <button>-</button>
          <span>1</span>
          <button>+</button>
        </div>
        <button class="btn-adicionar">Adicionar produto</button>
      </div>

      <!-- Calcular frete -->
      <div class="frete">
        <label>Calcule seu frete</label>
        <div class="input-frete">
          <input type="text" placeholder="Digite seu CEP" />
          <button>Consultar</button>
        </div>
        <p class="valor-frete">Entrega: R$18,56</p>
      </div>

      <!-- Adicionar aos favoritos -->
      <button class="btn-favorito">Adicionar produto aos favoritos</button>
    </div>
  </div>
  <RodaView/>
</template>
<style scoped>
.produto-container {
  padding: 60px 80px;
  background-color: #ffffff;
  font-family: 'Segoe UI', sans-serif;
}

/* Cabeçalho */
.top-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 60px;
}

.logo {
  font-size: 28px;
  font-weight: bold;
  color: #8CB3C6;
}

nav ul {
  list-style: none;
  display: flex;
  gap: 24px;
}

nav ul li {
  cursor: pointer;
  font-size: 16px;
  color: #2F4050;
}

.icons img {
  width: 24px;
  margin-left: 16px;
  cursor: pointer;
}

/* Layout principal */
.produto-detalhes {
  display: flex;
  gap: 40px;
  padding: 60px 80px;
}

/* Galeria lateral */
.galeria {
  display: flex;
  flex-direction: column;
  gap: 30px;
  width: 200px;
  padding: 60px 80px;
}

.galeria img {
  width: 100px;
  height: auto;
  border: 1px solid #ccc;
}

/* Imagem principal */
.imagem-principal img {
  width: 400px;
  height: auto;
  padding: 60px 80px;
}

/* Informações */
.info-produto {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 60px 80px;
  color: #0D4561;
}

.info-produto h2 {
  font-size: 28px;
  color: #0D4561;
}

.preco {
  font-size: 22px;
  font-weight: bold;
}

.parcelamento {
  font-size: 14px;
  color: #0D4561;
}

.descricao {
  font-size: 16px;
  line-height: 1.5;
}


.acoes-produto {
  display: flex;
  align-items: center;
  gap: 20px;
}

.quantidade {
  display: flex;
  align-items: center;
  gap: 10px;
}

.quantidade button {
  width: 30px;
  height: 30px;
  font-weight: bold;
  color: #0D4561;
  background-color: #ffffff;
  border: none;
}

.btn-adicionar {
  background-color: #8CB3C6;
  color: white;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
}


.frete {
  margin-top: 20px;
}

.input-frete {
  display: flex;
  gap: 12px;
  margin-top: 8px;
}

.input-frete input {
  padding: 8px;
  width: 160px;
  border: 1px solid #ccc;
}

.input-frete button {
  padding: 8px 12px;
  background-color: #8CB3C6;
  color: white;
  border: none;
  cursor: pointer;
}

.valor-frete {
  margin-top: 8px;
  font-weight: bold;
}


.btn-favorito {
  margin-top: 20px;
  background-color: #8CB3C6;
  color: #ffffff;
  border: 2px solid #8CB3C6;
  padding: 10px;
  cursor: pointer;
}
</style>