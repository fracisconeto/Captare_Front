<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { supabase } from '../plugins/supabase'
import { useCarrinhoStore } from '@/stores/carrinho'
import RodaView from '../components/RodaView.vue'

const route = useRoute()
const router = useRouter()
const carrinhoStore = useCarrinhoStore()

const produto = ref(null)
const loading = ref(true)
const quantidade = ref(1)

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
const getProduto = async () => {
  try {
    loading.value = true
    const { data, error } = await supabase
      .from('core_produto')
      .select('*')
      .eq('id', route.params.id)
      .single()

    if (error) {
      console.error('Erro ao buscar produto:', error)
      router.push('/')
      return
    }

    produto.value = {
      ...data,
      imgSrc: getImageUrl(data.image1, 'png'),
    }
  } catch (err) {
    console.error('Erro:', err)
    router.push('/')
  } finally {
    loading.value = false
  }
}

function aumentarQuantidade() {
  quantidade.value++
}

function diminuirQuantidade() {
  if (quantidade.value > 1) {
    quantidade.value--
  }
}

function adicionarAoCarrinho() {
  if (produto.value) {
    carrinhoStore.adicionarItem({
      ...produto.value,
      quantidade: quantidade.value,
    })
  }
}

onMounted(() => {
  getProduto()
})
</script>

<template>
  <div class="produto-container">
    <div v-if="loading" class="loading">
      <p>Carregando produto...</p>
    </div>

    <div v-else-if="produto" class="produto-detalhes">
      <!-- Imagem do produto -->
      <div class="imagem-secao">
        <img :src="produto.imgSrc" :alt="produto.nome" class="imagem-principal" />
      </div>

      <!-- Informações do produto -->
      <div class="info-secao">
        <button class="btn-voltar" @click="router.back()">← Voltar</button>

        <h1 class="nome-produto">{{ produto.nome }}</h1>

        <div class="preco-secao">
          <p class="preco">R$ {{ parseFloat(produto.preco).toFixed(2).replace('.', ',') }}</p>
          <p class="parcelamento">
            ou 10x de R$ {{ (parseFloat(produto.preco) / 10).toFixed(2).replace('.', ',') }}
          </p>
        </div>

        <div class="descricao-secao">
          <h3>Descrição</h3>
          <p>
            {{ produto.descricao || 'Produto de alta qualidade para seu bem-estar e conforto.' }}
          </p>
        </div>

        <!-- Controle de quantidade -->
        <div class="quantidade-secao">
          <label>Quantidade:</label>
          <div class="quantidade-controle">
            <button @click="diminuirQuantidade" class="btn-quantidade">-</button>
            <span class="quantidade-valor">{{ quantidade }}</span>
            <button @click="aumentarQuantidade" class="btn-quantidade">+</button>
          </div>
        </div>

        <!-- Botão adicionar ao carrinho -->
        <button class="btn-adicionar-carrinho" @click="adicionarAoCarrinho">
          Adicionar ao carrinho
        </button>

        <!-- Informações adicionais -->
        <div class="info-adicional">
          <p>
            <strong>Categoria:</strong>
            {{
              produto.categoria_id === 1
                ? 'Velas'
                : produto.categoria_id === 2
                  ? 'Hidratantes'
                  : 'Banho'
            }}
          </p>
          <p><strong>Disponibilidade:</strong> Em estoque</p>
        </div>
      </div>
    </div>
  </div>

  <RodaView />
</template>

<style scoped>
.produto-container {
  min-height: 70vh;
  background-color: #ffffff;
  padding: 60px 80px;
}

.loading {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 50vh;
  font-size: 18px;
  color: #8cb3c6;
}

.produto-detalhes {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 80px;
  max-width: 1400px;
  margin: 0 auto;
}

/* Seção da imagem */
.imagem-secao {
  display: flex;
  justify-content: center;
  align-items: center;
}

.imagem-principal {
  width: 100%;
  max-width: 500px;
  height: auto;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(140, 179, 198, 0.2);
  object-fit: cover;
}

/* Seção de informações */
.info-secao {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.btn-voltar {
  background: transparent;
  border: none;
  color: #8cb3c6;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  padding: 8px 0;
  text-align: left;
  transition: all 0.3s ease;
}

.btn-voltar:hover {
  color: #5d7c87;
  transform: translateX(-4px);
}

.nome-produto {
  font-size: 36px;
  color: #0d4561;
  font-weight: 700;
  margin: 0;
}

.preco-secao {
  border-bottom: 2px solid #e0e0e0;
  padding-bottom: 20px;
}

.preco {
  font-size: 32px;
  color: #8cb3c6;
  font-weight: 700;
  margin: 0 0 8px 0;
}

.parcelamento {
  font-size: 16px;
  color: #666;
  margin: 0;
}

.descricao-secao {
  background-color: #f7f9fa;
  padding: 20px;
  border-radius: 12px;
  border-left: 4px solid #8cb3c6;
}

.descricao-secao h3 {
  font-size: 18px;
  color: #0d4561;
  margin: 0 0 12px 0;
  font-weight: 600;
}

.descricao-secao p {
  font-size: 15px;
  color: #555;
  line-height: 1.6;
  margin: 0;
}

/* Controle de quantidade */
.quantidade-secao {
  display: flex;
  align-items: center;
  gap: 16px;
}

.quantidade-secao label {
  font-size: 16px;
  font-weight: 600;
  color: #333;
}

.quantidade-controle {
  display: flex;
  align-items: center;
  gap: 12px;
  background-color: #f7f9fa;
  padding: 8px 16px;
  border-radius: 10px;
  border: 2px solid #e0e0e0;
}

.btn-quantidade {
  background-color: #8cb3c6;
  color: white;
  border: none;
  width: 36px;
  height: 36px;
  border-radius: 8px;
  font-size: 20px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.btn-quantidade:hover {
  background-color: #7aa2b5;
  transform: scale(1.1);
}

.quantidade-valor {
  font-size: 18px;
  font-weight: 600;
  color: #333;
  min-width: 30px;
  text-align: center;
}

/* Botão adicionar ao carrinho */
.btn-adicionar-carrinho {
  background: linear-gradient(135deg, #8cb3c6 0%, #7aa2b5 100%);
  color: white;
  border: none;
  padding: 16px 32px;
  font-size: 18px;
  font-weight: 700;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(140, 179, 198, 0.3);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.btn-adicionar-carrinho:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(140, 179, 198, 0.4);
  background: linear-gradient(135deg, #7aa2b5 0%, #6a92a5 100%);
}

/* Informações adicionais */
.info-adicional {
  background-color: #f7f9fa;
  padding: 20px;
  border-radius: 12px;
  margin-top: 12px;
}

.info-adicional p {
  font-size: 15px;
  color: #555;
  margin: 8px 0;
}

.info-adicional strong {
  color: #0d4561;
  font-weight: 600;
}

/* Responsividade */
@media (max-width: 968px) {
  .produto-detalhes {
    grid-template-columns: 1fr;
    gap: 40px;
  }

  .produto-container {
    padding: 40px 20px;
  }

  .nome-produto {
    font-size: 28px;
  }

  .preco {
    font-size: 26px;
  }
}
</style>
