<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import AuthService from '@/services/auth'
import RodaView from '@/components/RodaView.vue'

const authStore = useAuthStore()
const router = useRouter()

const usuario = ref(null)
const loading = ref(true)
const erro = ref('')

const buscarDadosUsuario = async () => {
  if (!authStore.token) {
    router.push('/login')
    return
  }

  try {
    const authService = new AuthService()
    const data = await authService.me(authStore.token)
    usuario.value = data
  } catch (error) {
    console.error('Erro ao buscar dados do usuário:', error)
    erro.value = 'Erro ao carregar perfil'
    // Se o token for inválido, desloga
    authStore.logout()
    router.push('/login')
  } finally {
    loading.value = false
  }
}

const fazerLogout = () => {
  authStore.logout()
  router.push('/')
}

onMounted(() => {
  buscarDadosUsuario()
})
</script>

<template>
  <div class="perfil-page">
    <div class="perfil-container">
      <div v-if="loading" class="loading">
        <p>Carregando perfil...</p>
      </div>

      <div v-else-if="erro" class="erro-box">
        <p>{{ erro }}</p>
      </div>

      <div v-else-if="usuario" class="perfil-content">
        <!-- Cabeçalho do perfil -->
        <div class="perfil-header">
          <div class="avatar">
            <img src="../assets/macho.png" alt="Avatar" />
          </div>
          <h1>{{ usuario.nome || 'Usuario sem nome' }}</h1>
        </div>

        <!-- Informações do usuário -->
        <div class="perfil-info">
          <div class="info-card">
            <h2>Dados Pessoais</h2>

            <div class="info-item">
              <label>Nome:</label>
              <p>{{ usuario.nome || 'Usuario sem nome' }}</p>
            </div>

            <div class="info-item">
              <label>Email:</label>
              <p>{{ usuario.email || 'Email não informado' }}</p>
            </div>

            <div class="info-item">
              <label>CPF:</label>
              <p>{{ usuario.cpf || 'CPF não informado' }}</p>
            </div>

            <div class="info-item" v-if="usuario.telefone">
              <label>Telefone:</label>
              <p>{{ usuario.telefone || 'Telefone não informado' }}</p>
            </div>

            <div class="info-item" v-if="usuario.created_at">
              <label>Membro desde:</label>
              <p>{{ new Date(usuario.created_at).toLocaleDateString('pt-BR') }}</p>
            </div>
          </div>

          <!-- Botões de ação -->
          <div class="acoes">
            <button class="btn-editar" @click="router.push('/editar-perfil')">Editar Perfil</button>
            <button class="btn-logout" @click="fazerLogout">Sair</button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <hr />
  <RodaView />
</template>

<style scoped>
.perfil-page {
  min-height: 70vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #8cb3c6;
  padding: 60px 20px;
}

.perfil-container {
  width: 100%;
  max-width: 800px;
}

.loading,
.erro-box {
  background: white;
  padding: 40px;
  border-radius: 16px;
  text-align: center;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
}

.loading p {
  font-size: 18px;
  color: #8cb3c6;
}

.erro-box p {
  font-size: 18px;
  color: #c33;
}

.perfil-content {
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  overflow: hidden;
}

/* Cabeçalho do perfil */
.perfil-header {
  background: linear-gradient(135deg, #8cb3c6 0%, #5d7c87 100%);
  padding: 40px;
  text-align: center;
  color: white;
}

.avatar {
  width: 100px;
  height: 100px;
  margin: 0 auto 20px;
  background: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.avatar img {
  width: 60px;
  height: 60px;
  filter: brightness(0) saturate(100%) invert(53%) sepia(14%) saturate(1030%) hue-rotate(151deg)
    brightness(92%) contrast(87%);
}

.perfil-header h1 {
  font-size: 28px;
  font-weight: 600;
  margin: 0;
}

/* Informações do perfil */
.perfil-info {
  padding: 40px;
}

.info-card {
  margin-bottom: 30px;
}

.info-card h2 {
  font-size: 22px;
  color: #1f2d3d;
  margin-bottom: 25px;
  padding-bottom: 12px;
  border-bottom: 2px solid #e0e0e0;
}

.info-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 0;
  border-bottom: 1px solid #f5f5f5;
}

.info-item:last-child {
  border-bottom: none;
}

.info-item label {
  font-weight: 600;
  color: #5d7c87;
  font-size: 15px;
}

.info-item p {
  color: #333;
  font-size: 15px;
  margin: 0;
}

/* Botões de ação */
.acoes {
  display: flex;
  gap: 15px;
  margin-top: 30px;
}

.btn-editar,
.btn-logout {
  flex: 1;
  padding: 14px;
  border: none;
  border-radius: 10px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.btn-editar {
  background: #8cb3c6;
  color: white;
}

.btn-editar:hover {
  background: #7498a9;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(140, 179, 198, 0.4);
}

.btn-logout {
  background: #e63946;
  color: white;
}

.btn-logout:hover {
  background: #d62828;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(230, 57, 70, 0.4);
}

/* Responsividade */
@media (max-width: 768px) {
  .perfil-page {
    padding: 40px 15px;
  }

  .perfil-info {
    padding: 30px 20px;
  }

  .info-item {
    flex-direction: column;
    align-items: flex-start;
    gap: 5px;
  }

  .acoes {
    flex-direction: column;
  }
}
</style>
