<script setup>
import { ref, onMounted } from 'vue'
import { supabase } from '../plugins/supabase'
import { useCarrinhoStore } from '@/stores/carrinho'
import ToastNotification from '@/components/ToastNotification.vue'

const carrinhoStore = useCarrinhoStore()
const produtos = ref([])
const showToast = ref(false)
const toastMessage = ref('')

// --- FUNÇÃO PARA RESOLUÇÃO DINÂMICA DE IMAGENS ---
function getImageUrl(imageFileName, ext = 'png') {
  const ASSETS_BASE = '../assets'

  if (!imageFileName) {
    return new URL(`${ASSETS_BASE}/vela1.png`, import.meta.url).href
  }

  const PRODUTOS_DIR = `${ASSETS_BASE}/produtos`

  if (/\.[a-zA-Z0-9]+$/.test(imageFileName)) {
    return new URL(`${PRODUTOS_DIR}/${imageFileName}`, import.meta.url).href
  }

  return new URL(`${PRODUTOS_DIR}/${imageFileName}.${ext}`, import.meta.url).href
}
// ----------------------------------------------------

const getHidratantes = async () => {
  // Filtrando pela categoria_id = 2 (Hidratantes) E limitando a 8 itens
  const { data, error } = await supabase
    .from('core_produto')
    .select('*')
    .eq('categoria_id', 2)
    .limit(4)

  if (error) {
    console.error('Erro ao buscar produtos:', error)
    return
  }

  produtos.value = data.map((p) => ({
    ...p,
    imgSrc: getImageUrl(p.image1, 'png'),
  }))
}

const adicionarAoCarrinho = (produto) => {
  carrinhoStore.adicionarItem({
    id: produto.id,
    nome: produto.nome,
    preco: produto.preco,
    imgSrc: produto.imgSrc,
    quantidade: 1,
  })
  toastMessage.value = `${produto.nome} adicionado ao carrinho!`
  showToast.value = true
}

const fecharToast = () => {
  showToast.value = false
}

onMounted(() => {
  getHidratantes()
})
</script>

<template>
  <div class="velas-container">
    <div class="titulo">
      <img src="../assets/bubbles.png" alt="ícone hidratante" />
      <h1>Hidratantes Corporais</h1>
    </div>

    <div class="grid-velas">
      <div v-for="produto in produtos" :key="produto.id" class="box-vela">
        <div class="container-img" @click="$router.push(`/produto/${produto.id}`)">
          <img :src="produto.imgSrc" :alt="produto.nome" />
        </div>
        <div class="continer-texto">
          <h3 @click="$router.push(`/produto/${produto.id}`)">{{ produto.nome }}</h3>
          <h2>R$ {{ produto.preco }}</h2>
        </div>
        <div class="container-adicionar">
          <img src="../assets/coracao.png" alt="favoritar" />
          <button class="btn-adicionar" @click="adicionarAoCarrinho(produto)">Adicionar</button>
        </div>
      </div>
    </div>

    <ToastNotification
      :show="showToast"
      :message="toastMessage"
      type="success"
      @close="fecharToast"
    />
  </div>
</template>

<style scoped>
.velas-container {
  padding: 60px 80px;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
}
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
  color: #8cb3c6;
  font-weight: 600;
}
.grid-velas {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 48px;
  width: 100%;
  max-width: 1400px;
}
.box-vela {
  background-color: #8cb3c6;
  padding: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 10px;
  box-shadow: 0 2px 6px rgba(140, 179, 198, 0.3);
}
.container-img {
  cursor: pointer;
  transition: transform 0.3s ease;
}
.container-img:hover {
  transform: scale(1.05);
}
.container-img img {
  width: 100%;
  height: auto;
  border-radius: 8px;
}
.continer-texto {
  text-align: center;
  margin: 20px 0;
}
.continer-texto h3 {
  font-size: 20px;
  color: white;
  margin-bottom: 8px;
  cursor: pointer;
  transition: opacity 0.3s ease;
}
.continer-texto h3:hover {
  opacity: 0.8;
}
.continer-texto h2 {
  font-size: 22px;
  color: white;
  margin: 0;
}
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
  background-color: #fff;
  color: #8cb3c6;
  font-weight: bold;
  border: none;
  padding: 10px 18px;
  font-size: 16px;
  cursor: pointer;
  border-radius: 6px;
  transition: all 0.2s ease-in-out;
}
.btn-adicionar:hover {
  background-color: #8cb3c6;
  color: white;
  border: 1px solid white;
}
</style>
