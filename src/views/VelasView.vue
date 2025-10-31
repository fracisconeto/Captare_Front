<script setup>
import { ref, onMounted } from 'vue'
import { supabase } from '../plugins/supabase'
import { useCarrinhoStore } from '@/stores/carrinho'
import RodaView from '../components/RodaView.vue'


const carrinhoStore = useCarrinhoStore()
const produtos = ref([])
const showToast = ref(false)
const toastMessage = ref('')

function getImageUrl(imageFileName, ext = 'png') {
  const PRODUTOS_DIR = '/produtos' // 👈 acessa direto a pasta public/produtos

  if (!imageFileName) {
    return `${PRODUTOS_DIR}/vela1.png`
  }

  // Se já tiver extensão (ex: .jpg ou .png)
  if (/\.[a-zA-Z0-9]+$/.test(imageFileName)) {
    return `${PRODUTOS_DIR}/${imageFileName}`
  }

  return `${PRODUTOS_DIR}/${imageFileName}.${ext}`
}


const getVelas = async () => {
  const { data, error } = await supabase
    .from('core_produto')
    .select('*')
    .eq('categoria_id', 1)
    .limit(8)

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

onMounted(() => getVelas())
</script>

<template>
  <div class="velas-container">
    <div class="titulo">
      <img src="../assets/bubbles.png" alt="ícone vela" />
      <h1>Velas Aromáticas</h1>
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
          <img src="../assets/coraçaoazul.png" alt="favoritar" />
          <button
            class="btn-adicionar"
            @click="carrinhoStore.adicionarItem({ ...produto, quantidade: 1 })"
          >
            Adicionar
          </button>
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

  <!-- ======================= -->
  <!-- Carrinho Sacola (feat-17) -->
  <!-- ======================= -->
   <RodaView />
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
  color: #8cb3c6;
}

.titulo img {
  width: 40px;
  height: 40px;
  color: #8cb3c6;
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
  background-color: #ffffff;
  padding: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 10px;
  box-shadow: 0 2px 6px rgba(140, 179, 198, 0.3);
  border: #8cb3c6 2px solid;
}
.container-img img {
  width: 100%;
  height: auto;
  border-radius: 8px;
  border: #8cb3c6 1px solid;
}

.continer-texto {
  text-align: center;
  margin: 20px 0;
  color: #8cb3c6;
}

.continer-texto h3 {
  font-size: 20px;
  color: #8cb3c6;
  margin-bottom: 8px;
  cursor: pointer;
  transition: opacity 0.3s ease;
}
.continer-texto h3:hover {
  opacity: 0.8;
}

.continer-texto h2 {
  font-size: 22px;
  color: #8cb3c6;
  margin: 0;
}

.container-adicionar {
  display: flex;
  align-items: center;
  gap: 12px;
  color: #8cb3c6;
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

/* ======================= */
/* Sacola (feat-17) */
/* ======================= */
.sacola-container {
  font-family: 'Poppins', sans-serif;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 50px 40px;
  color: #8cb3c6;
  margin-top: 60px;
}

.sacola-container .titulo {
  font-size: 22px;
  color: #8cb3c6;
  margin-bottom: 25px;
  font-weight: 600;
}

.tabela {
  width: 92%;
  max-width: 1100px;
  border: 1px solid #8cb3c6;
  border-radius: 8px;
  overflow: hidden;
  background-color: #fff;
  box-shadow: 0 2px 6px rgba(140, 179, 198, 0.3);
}

.linha-cabecalho {
  display: flex;
  justify-content: space-between;
  background-color: #f9fcfd;
  padding: 12px 25px;
  font-weight: 500;
  color: #8cb3c6;
  border-bottom: 1px solid #8cb3c6;
}

.linha-produto {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 18px 25px;
  border-bottom: 1px solid #8cb3c6;
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
  border: 1px solid #8cb3c6;
}

.info-produto {
  max-width: 400px;
}

.nome-produto {
  font-size: 16px;
  font-weight: 600;
  color: #8cb3c6;
  margin: 0;
}

.descricao {
  font-size: 13px;
  color: #8cb3c6;
  margin-top: 5px;
  line-height: 1.4;
}

.coluna-quantidade {
  display: flex;
  align-items: center;
  gap: 6px;
}

.botao {
  background-color: #e7f3f7;
  border: 1px solid #8cb3c6;
  color: #8cb3c6;
  width: 28px;
  height: 28px;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.2s;
}

.botao:hover {
  background-color: #8cb3c6;
  color: #fff;
}

.quantidade {
  min-width: 20px;
  text-align: center;
  font-size: 14px;
  color: #8cb3c6;
}

.coluna-total {
  width: 120px;
  text-align: right;
  font-weight: 600;
  color: #8cb3c6;
}

.total-geral {
  width: 92%;
  max-width: 1100px;
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
  font-size: 15px;
  gap: 10px;
  color: #8cb3c6;
}

.botao-finalizar {
  margin-top: 25px;
  background-color: #8cb3c6;
  color: white;
  border: none;
  padding: 12px 35px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 15px;
  transition: background-color 0.2s;
}

.botao-finalizar:hover {
  background-color: #7aa2b5;
}
</style>
