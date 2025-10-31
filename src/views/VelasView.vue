<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import { supabase } from '../plugins/supabase'

// =======================
// Produtos Velas (dev)
// =======================
const produtos = ref([])

function getImageUrl(imageFileName, ext = 'png') {
  const ASSETS_BASE = '../assets'
  if (!imageFileName) return new URL(`${ASSETS_BASE}/vela1.png`, import.meta.url).href
  const PRODUTOS_DIR = `${ASSETS_BASE}/produtos`
  if (/\.[a-zA-Z0-9]+$/.test(imageFileName)) {
    return new URL(`${PRODUTOS_DIR}/${imageFileName}`, import.meta.url).href
  }
  return new URL(`${PRODUTOS_DIR}/${imageFileName}.${ext}`, import.meta.url).href
}

const getVelas = async () => {
  const { data, error } = await supabase
    .from('core_produto')
    .select('*')
    .eq('categoria_id', 1)
    .limit(4)

  if (error) {
    console.error('Erro ao buscar produtos:', error)
    return
  }

  produtos.value = data.map(p => ({
    ...p,
    imgSrc: getImageUrl(p.image1, 'png')
  }))
}

onMounted(() => getVelas())

// =======================
// Carrinho Sacola (feat-17)
// =======================
const carrinho = reactive([
  {
    nome: "Vela Amethyst",
    descricao: "Base de cera de coco com aroma de frutas roxas e coloração lilás. Propriedades calmantes.",
    preco: 18.0,
    quantidade: 1,
    imagem: "https://cdn-icons-png.flaticon.com/512/6996/6996140.png"
  }
])

function aumentarQuantidade(i) { carrinho[i].quantidade++ }
function diminuirQuantidade(i) { if (carrinho[i].quantidade > 1) carrinho[i].quantidade-- }

const totalGeral = computed(() => carrinho.reduce((acc, item) => acc + item.preco * item.quantidade, 0))
</script>

<template>
  <!-- ======================= -->
  <!-- Página Velas (dev) -->
  <!-- ======================= -->
  <div class="velas-container">
    <div class="titulo">
      <img src="../assets/bubbles.png" alt="ícone vela" />
      <h1>Velas Aromáticas</h1>
    </div>

    <div class="grid-velas">
      <div v-for="produto in produtos" :key="produto.id" class="box-vela">
        <div class="container-img">
          <img :src="produto.imgSrc" :alt="produto.nome" />
        </div>
        <div class="continer-texto">
          <h3>{{ produto.nome }}</h3>
          <h2>R$ {{ produto.preco }}</h2>
        </div>
        <div class="container-adicionar">
          <img src="../assets/icons/add-to-cart.svg" alt="Adicionar ao carrinho" />
          <button class="btn-adicionar">Adicionar</button>
        </div>
      </div>
    </div>
  </div>

  <!-- ======================= -->
  <!-- Carrinho Sacola (feat-17) -->
  <!-- ======================= -->
  <div class="sacola-container">
    <h2 class="titulo">Minha Sacola</h2>

    <div class="tabela">
      <div class="linha-cabecalho">
        <span class="coluna-produto">Produto</span>
        <span class="coluna-quantidade">Quantidade</span>
        <span class="coluna-total">Total</span>
      </div>

      <div class="linha-produto" v-for="(item, index) in carrinho" :key="index">
        <div class="coluna-produto">
          <img :src="item.imagem" alt="Produto" class="imagem-produto" />
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
    </div>

    <div class="total-geral">
      <span>Total geral:</span>
      <strong>R$ {{ totalGeral.toFixed(2).replace('.', ',') }}</strong>
    </div>

    <button class="botao-finalizar">Finalizar compra</button>
  </div>
</template>

<style scoped>
/* ======================= */
/* Velas (dev) */
/* ======================= */
.velas-container {
  padding: 60px 80px;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.titulo { display: flex; align-items: center; gap: 16px; margin-bottom: 48px; }
.titulo img { width: 40px; height: 40px; }
.titulo h1 { font-size: 36px; color: #8CB3C6; font-weight: 600; }
.grid-velas { display: grid; grid-template-columns: repeat(4, 1fr); gap: 48px; width: 100%; max-width: 1400px; }
.box-vela { background-color: #8CB3C6; padding: 24px; display: flex; flex-direction: column; align-items: center; border-radius: 10px; box-shadow: 0 2px 6px rgba(140,179,198,0.3); }
.container-img img { width: 100%; height: auto; border-radius: 8px; }
.continer-texto { text-align: center; margin: 20px 0; }
.continer-texto h3 { font-size: 20px; color: white; margin-bottom: 8px; }
.continer-texto h2 { font-size: 22px; color: white; margin: 0; }
.container-adicionar { display: flex; align-items: center; gap: 12px; }
.container-adicionar img { width: 28px; height: 28px; }
.btn-adicionar { background-color: #fff; color: #8CB3C6; font-weight: bold; border: none; padding: 10px 18px; font-size: 16px; cursor: pointer; border-radius: 6px; transition: all 0.2s ease-in-out; }
.btn-adicionar:hover { background-color: #8CB3C6; color: white; border: 1px solid white; }

/* ======================= */
/* Sacola (feat-17) */
/* ======================= */
.sacola-container { font-family: "Poppins", sans-serif; background-color: #ffffff; display: flex; flex-direction: column; align-items: center; padding: 50px 40px; color: #8cb3c6; margin-top: 60px; }
.sacola-container .titulo { font-size: 22px; color: #8cb3c6; margin-bottom: 25px; font-weight: 600; }
.tabela { width: 92%; max-width: 1100px; border: 1px solid #8cb3c6; border-radius: 8px; overflow: hidden; background-color: #fff; box-shadow: 0 2px 6px rgba(140,179,198,0.3); }
.linha-cabecalho { display: flex; justify-content: space-between; background-color: #f9fcfd; padding: 12px 25px; font-weight: 500; color: #8cb3c6; border-bottom: 1px solid #8cb3c6; }
.linha-produto { display: flex; justify-content: space-between; align-items: center; padding: 18px 25px; border-bottom: 1px solid #8cb3c6; }
.coluna-produto { display: flex; align-items: center; flex: 2; gap: 20px; }
.imagem-produto { width: 90px; height: 90px; border-radius: 10px; object-fit: cover; border: 1px solid #8cb3c6; }
.info-produto { max-width: 400px; }
.nome-produto { font-size: 16px; font-weight: 600; color: #8cb3c6; margin: 0; }
.descricao { font-size: 13px; color: #8cb3c6; margin-top: 5px; line-height: 1.4; }
.coluna-quantidade { display: flex; align-items: center; gap: 6px; }
.botao { background-color: #e7f3f7; border: 1px solid #8cb3c6; color: #8cb3c6; width: 28px; height: 28px; border-radius: 5px; cursor: pointer; transition: all 0.2s; }
.botao:hover { background-color: #8cb3c6; color: #fff; }
.quantidade { min-width: 20px; text-align: center; font-size: 14px; color: #8cb3c6; }
.coluna-total { width: 120px; text-align: right; font-weight: 600; color: #8cb3c6; }
.total-geral { width: 92%; max-width: 1100px; display: flex; justify-content: flex-end; margin-top: 20px; font-size: 15px; gap: 10px; color: #8cb3c6; }
.botao-finalizar { margin-top: 25px; background-color: #8cb3c6; color: white; border: none; padding: 12px 35px; border-radius: 5px; cursor: pointer; font-size: 15px; transition: background-color 0.2s; }
.botao-finalizar:hover { background-color: #7aa2b5; }
</style>
