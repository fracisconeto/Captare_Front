<script setup>
import { reactive } from "vue"
import RodaView from '../components/RodaView.vue';

const form = reactive({
  nome: "",
  cpf: "",
  telefone: "",
  senha: "",
  confirmaSenha: ""
})

const errors = reactive({
  nome: "",
  cpf: "",
  telefone: "",
  senha: "",
  confirmaSenha: ""
})

function handleSubmit() {
  Object.keys(errors).forEach(key => (errors[key] = ""))
  let valid = true

  if (!form.nome) { errors.nome = "O nome é obrigatório."; valid = false }
  if (!form.cpf) { errors.cpf = "O CPF é obrigatório."; valid = false }
  if (!form.telefone) { errors.telefone = "O telefone é obrigatório."; valid = false }
  if (!form.senha) { errors.senha = "A senha é obrigatória."; valid = false }
  if (!form.confirmaSenha) { errors.confirmaSenha = "A confirmação de senha é obrigatória."; valid = false }
  else if (form.senha !== form.confirmaSenha) {
    errors.confirmaSenha = "As senhas não coincidem."
    valid = false
  }

  if (valid) {
    alert("Cadastro realizado com sucesso!")
  }
}
</script>

<template>
  <div class="container">
    <h1 class="page-title">Preencha as informações</h1>

    <div class="card">
      <h2>Cadastro</h2>

      <form @submit.prevent="handleSubmit" class="form">
        <div class="form-group">
          <input v-model="form.nome" type="text" placeholder="Nome" />
          <p v-if="errors.nome" class="error">{{ errors.nome }}</p>
        </div>

        <div class="form-group">
          <input v-model="form.cpf" type="text" placeholder="CPF" />
          <p v-if="errors.cpf" class="error">{{ errors.cpf }}</p>
        </div>

        <div class="form-group">
          <input v-model="form.telefone" type="text" placeholder="Telefone" />
          <p v-if="errors.telefone" class="error">{{ errors.telefone }}</p>
        </div>

        <div class="form-group">
          <input v-model="form.senha" type="password" placeholder="Senha" />
          <p v-if="errors.senha" class="error">{{ errors.senha }}</p>
        </div>

        <div class="form-group">
          <input v-model="form.confirmaSenha" type="password" placeholder="Confirme sua senha" />
          <p v-if="errors.confirmaSenha" class="error">{{ errors.confirmaSenha }}</p>
        </div>

        <button type="submit">Próximo</button>
      </form>
    </div>
  </div>
<hr>
  <RodaView/>
</template>



<style scoped>
.container {
    
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 85vh;
  background-color: #8CB3C6;

}

.page-title {
  color: white;
  font-size: 32px;
  font-weight: 700;
  margin-bottom: 1rem;
  text-align: center;
}

.card {
  background: white;
  padding: 2.5rem;
  border-radius: 8px;
  box-shadow: 0 4px 16px rgba(0,0,0,0.2);
  width: 100%;
  max-width: 500px; /* card menos largo */
  text-align: center;
}

.card h2 {
  margin-bottom: 2rem;
  font-size: 26px;
  font-weight: 700;
  color: #333;
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
  justify-content: center; /* centraliza inputs */
}

input {
  width: 90%; /* inputs ocupam 90% do card */
  max-width: 400px;
  padding: 10px 12px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 15px;
  outline: none;
  transition: border 0.2s;
}

input:focus {
  border-color: #4f9dcf;
}

button {
  width: 100%;
  max-width: 300px;
  margin: 0 auto;
  padding: 12px;
  background: #444;
  color: white;
  font-size: 16px;
  font-weight: 600;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.2s;
}

button:hover {
  background: #333;
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
