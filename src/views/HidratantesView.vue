<script setup>
import { ref, onMounted } from 'vue'
import { supabase } from '../plugins/supabase'
import { useCarrinhoStore } from '@/stores/carrinho'
import ToastNotification from '@/components/ToastNotification.vue'
import RodaView from '../components/RodaView.vue'


const carrinhoStore = useCarrinhoStore()
const produtos = ref([])
const showToast = ref(false)
const toastMessage = ref('')

// --- FUNÇÃO PARA RESOLUÇÃO DINÂMICA DE IMAGENS ---
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

// ----------------------------------------------------

const getHidratantes = async () => {
  // Filtrando pela categoria_id = 2 (Hidratantes) E limitando a 8 itens
  const { data, error } = await supabase
    .from('core_produto')
    .select('*')
    .eq('categoria_id', 2)
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
          <img src="../assets/coraçaoazul.png" alt="favoritar" />
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
  border: #8cb3c6 1px solid;
}
.container-img {
  cursor: pointer;
  transition: transform 0.3s ease;
  border: #8cb3c6 1px solid;
  border-radius: 8px;
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
@media (max-width: 1024px) {
  .velas-container {
    padding: 20px 4vw;
  }
  .grid-velas {
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
    max-width: 99vw;
  }
}

@media (max-width: 600px) {
  .velas-container {
    padding: 4vw 1vw;
  }
  .titulo {
    gap: 8px;
    margin-bottom: 24px;
  }
  .titulo h1 {
    font-size: 22px;
  }
  .titulo img {
    width: 32px;
    height: 32px;
  }
  .grid-velas {
    grid-template-columns: 1fr;
    gap: 12px;
    max-width: 99vw;
  }
  .box-vela {
    padding: 10px;
    border-radius: 8px;
  }
  .container-img img {
    max-width: 97vw;
    border-radius: 6px;
  }
  .continer-texto h3,
  .continer-texto h2 {
    font-size: 15px;
    margin: 6px 0;
  }
  .btn-adicionar {
    font-size: 14px;
    padding: 9px 9vw;
  }
}

</style>
