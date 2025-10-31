<script setup>
import RodaView from '../components/RodaView.vue'
import { useCarrinhoStore } from '@/stores/carrinho'
const carrinhoStore = useCarrinhoStore()

// =======================
// Carrinho Sacola (feat-17)
// =======================
const produtos = carrinhoStore.$state.itens

function aumentarQuantidade(index) {
  if (produtos[index]) {
    produtos[index].quantidade += 1
  }
}

function diminuirQuantidade(index) {
  if (produtos[index]) {
    if (produtos[index].quantidade > 1) {
      produtos[index].quantidade -= 1
    } else {
      carrinhoStore.removerItem(produtos[index].id)
    }
  }
}
</script>
<template>
  <div class="sacola-container">
    <h2 class="titulo">Minha Sacola</h2>

    <div class="tabela">
      <div class="linha-cabecalho">
        <span class="coluna-produto">Produto</span>
        <span class="coluna-quantidade">Quantidade</span>
        <span class="coluna-total">Total</span>
      </div>

      <template v-if="produtos.length > 0">
        <div class="linha-produto" v-for="(item, index) in produtos" :key="index">
          <div class="coluna-produto">
            <img :src="item.imgSrc" alt="Produto" class="imagem-produto" />
            <div class="info-produto">
              <h3 class="nome-produto">{{ item.nome }}</h3>
              <p class="descricao">{{ item.descricao }}</p>
            </div>
          </div>

          <div class="coluna-quantidade">
            <button class="botao" @click="diminuirQuantidade(index)">−</button>
            <span class="quantidade">{{ item.quantidade }}</span>
            <button class="botao" @click="aumentarQuantidade(index)">+</button>
          </div>

          <div class="coluna-total">
            R$ {{ (item.preco * item.quantidade).toFixed(2).replace('.', ',') }}
          </div>
        </div>
      </template>
      <div v-else>
        <p style="padding: 20px; text-align: center">Seu carrinho está vazio.</p>
      </div>
    </div>

    <div class="total-geral">
      <span>Total geral:</span>
      <strong>R$ {{ carrinhoStore.totalPreco().toFixed(2).replace('.', ',') }}</strong>
    </div>

    <button class="botao-finalizar">Finalizar compra</button>
  </div>
  <RodaView />
</template>

<style scoped>
/* ====== Estrutura geral ====== */
.sacola-container {
  font-family: 'Poppins', sans-serif;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 50px 40px;
  color: #333;
}

/* ====== Título ====== */
.titulo {
  font-size: 22px;
  color: #8cb3c6;
  margin-bottom: 25px;
  font-weight: 600;
}

/* ====== Tabela ====== */
.tabela {
  width: 90%;
  max-width: 1000px;
  border: 1px solid #e5e5e5;
  border-radius: 12px;
  overflow: hidden;
  background-color: #fff;
  box-shadow: 0 2px 10px rgba(140, 179, 198, 0.15);
}

.linha-cabecalho {
  display: flex;
  justify-content: space-between;
  background-color: #f7f9fa;
  padding: 12px 25px;
  font-weight: 500;
  color: #8cb3c6;
  border-bottom: 1px solid #e5e5e5;
}

.linha-produto {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 18px 25px;
  border-bottom: 1px solid #e5e5e5;
}

.coluna-produto {
  display: flex;
  align-items: center;
  flex: 2;
  gap: 20px;
}

.imagem-produto {
  width: 90px;
  height: 90px;
  border-radius: 10px;
  object-fit: cover;
  box-shadow: 0 2px 6px rgba(140, 179, 198, 0.2);
}

.info-produto {
  max-width: 400px;
}

.nome-produto {
  font-size: 16px;
  font-weight: 600;
  color: #222;
  margin: 0;
  color: #8cb3c6;
}

.descricao {
  font-size: 13px;
  color: #666;
  margin-top: 5px;
  line-height: 1.4;
  color: #8cb3c6;
}

/* ====== Quantidade ====== */
.coluna-quantidade {
  display: flex;
  align-items: center;
  gap: 6px;
  color: #8cb3c6;
}

.botao {
  background-color: #e7f3f7;
  border: 2px solid #8cb3c6;
  color: #8cb3c6;
  width: 32px;
  height: 32px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: bold;
  font-size: 16px;
}

.botao:hover {
  background-color: #8cb3c6;
  color: #fff;
  transform: scale(1.1);
  box-shadow: 0 2px 6px rgba(140, 179, 198, 0.3);
}

.quantidade {
  min-width: 20px;
  text-align: center;
  font-size: 14px;
  color: #8cb3c6;
}

/* ====== Total por item ====== */
.coluna-total {
  width: 120px;
  text-align: right;
  font-weight: 600;
  color: #8cb3c6;
}

/* ====== Total geral ====== */
.total-geral {
  width: 90%;
  max-width: 1000px;
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
  font-size: 15px;
  gap: 10px;
  color: #8cb3c6;
}

.total-geral strong {
  color: #8cb3c6;
}

/* ====== Botão de finalizar ====== */
.botao-finalizar {
  margin-top: 25px;
  background-color: #8cb3c6;
  color: white;
  border: none;
  padding: 14px 40px;
  border-radius: 10px;
  cursor: pointer;
  font-size: 16px;
  font-weight: 600;
  transition: all 0.3s ease;
  box-shadow: 0 2px 10px rgba(140, 179, 198, 0.3);
}

.botao-finalizar:hover {
  background-color: #7aa2b5;
  transform: translateY(-2px);
  box-shadow: 0 4px 14px rgba(140, 179, 198, 0.4);
}

/* ====== Rodapé ====== */
</style>
