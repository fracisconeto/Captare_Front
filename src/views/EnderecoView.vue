<script setup>
import { reactive } from 'vue'
import RodaView from '../components/RodaView.vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const form = reactive({
  cep: '',
  rua: '',
  numero: '',
  cidade: '',
  bairro: '',
  complemento: '',
})

const errors = reactive({
  cep: '',
  rua: '',
  numero: '',
  cidade: '',
  bairro: '',
})

function handleSubmit() {
  Object.keys(errors).forEach((key) => (errors[key] = ''))
  let valid = true

  if (!form.cep) {
    errors.cep = 'O CEP é obrigatório.'
    valid = false
  }
  if (!form.rua) {
    errors.rua = 'A rua é obrigatória.'
    valid = false
  }
  if (!form.numero) {
    errors.numero = 'O número é obrigatório.'
    valid = false
  }
  if (!form.cidade) {
    errors.cidade = 'A cidade é obrigatória.'
    valid = false
  }
  if (!form.bairro) {
    errors.bairro = 'O bairro é obrigatório.'
    valid = false
  }

  if (valid) {
    router.push('/') // redireciona depois de finalizar
  }
}
</script>

<template>
  <div class="container">
    <h1 class="page-title">Preencha as informações</h1>

    <div class="card">
      <h2>Endereço de entrega</h2>

      <form @submit.prevent="handleSubmit" class="form">
        <div class="form-group">
          <input v-model="form.cep" type="text" placeholder="CEP" />
          <p v-if="errors.cep" class="error">{{ errors.cep }}</p>
        </div>

        <div class="form-group">
          <input v-model="form.rua" type="text" placeholder="Rua" />
          <p v-if="errors.rua" class="error">{{ errors.rua }}</p>
        </div>

        <div class="form-group">
          <input v-model="form.numero" type="text" placeholder="Número" />
          <p v-if="errors.numero" class="error">{{ errors.numero }}</p>
        </div>

        <div class="form-group">
          <input v-model="form.cidade" type="text" placeholder="Cidade" />
          <p v-if="errors.cidade" class="error">{{ errors.cidade }}</p>
        </div>

        <div class="form-group">
          <input v-model="form.bairro" type="text" placeholder="Bairro" />
          <p v-if="errors.bairro" class="error">{{ errors.bairro }}</p>
        </div>

        <div class="form-group">
          <input v-model="form.complemento" type="text" placeholder="Complemento (opcional)" />
        </div>

        <div class="buttons">
          <RouterLink to="/cadastro">
            <button type="button" class="btn-secondary">Voltar</button>
          </RouterLink>
          <button type="submit" class="btn-primary">Finalizar Cadastro</button>
        </div>
      </form>
    </div>
  </div>

  <RodaView />
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 85vh;
  background-color: #ffff
  ;
}

.page-title {
  color: #8CB3C6;
  font-size: 32px;
  font-weight: 700;
  margin-bottom: 1rem;
  text-align: center;
}

.card {
  background: #8CB3C6;
  padding: 2.5rem;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  width: 100%;
  max-width: 500px;
  text-align: center;
}

.card h2 {
  margin-bottom: 2rem;
  font-size: 26px;
  font-weight: 700;
  color: #ffff  ;
}

.form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
}

.form-group {
  width: 100%;
  display: flex;
  justify-content: center;
}

input {
  width: 90%;
  max-width: 400px;
  padding: 12px 16px;
  border: 2px solid #8CB3C6;
  border-radius: 10px;
  font-size: 15px;
  outline: none;
  transition: all 0.3s ease;
}

input:focus {
  border-color: #8cb3c6;
  box-shadow: 0 0 8px rgba(140, 179, 198, 0.4);
  transform: translateY(-2px);
}

.buttons {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  margin-top: 1rem;
  width: 100%;
  align-items: center;
}

button {
  width: 300px;
  max-width: 320px;
  padding: 14px;
  border: none;
  border-radius: 12px;
  font-size: 17px;
  font-weight: 700;
  cursor: pointer;
  color: #8CB3C6;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
}

/* Voltar */
.btn-secondary {
  color: #8CB3C6;
  background: #fff;
}

.btn-secondary:hover {
  background: #7498a9;
  transform: translateY(-2px);
  box-shadow: 0 4px 14px #8CB3C6(140, 179, 198, 0.4);
  color: #fff;
}

.btn-primary {
  background: #ffff;
}

.btn-primary:hover {
  background: #8CB3C6;
  transform: translateY(-2px);
  box-shadow: 0 4px 14px rgba(13, 69, 97, 0.4);
  color: #fff;
}

.error {
  color: #e63946;
  font-size: 12px;
  margin-top: 4px;
  text-align: left;
  max-width: 400px;
  margin-left: auto;
  margin-right: auto;
}
</style>
