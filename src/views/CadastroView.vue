<script setup>
import { reactive } from "vue";  // Importação única do reactive
import axios from "axios";        // Importação única do axios

const form = reactive({
  nome: "",
  email: "",
  telefone: "",
  cpf: "",
  senha: "",
  confirmaSenha: "",
  data_nascimento: ""
});

const errors = reactive({
  nome: "",
  email: "",
  telefone: "",
  cpf: "",
  senha: "",
  confirmaSenha: "",
  data_nascimento: ""
});

async function handleSubmit() {
  // Limpar os erros anteriores
  Object.keys(errors).forEach(key => (errors[key] = ""));
  let valid = true;

  // Verificar os campos obrigatórios
  if (!form.nome) { errors.nome = "O nome é obrigatório."; valid = false; }
  if (!form.email) { errors.email = "O e-mail é obrigatório."; valid = false; }
  if (!form.cpf) { errors.cpf = "O CPF é obrigatório."; valid = false; }
  if (!form.telefone) { errors.telefone = "O telefone é obrigatório."; valid = false; }
  if (!form.senha) { errors.senha = "A senha é obrigatória."; valid = false; }
  if (!form.confirmaSenha) { errors.confirmaSenha = "A confirmação de senha é obrigatória."; valid = false; }
  else if (form.senha !== form.confirmaSenha) {
    errors.confirmaSenha = "As senhas não coincidem.";
    valid = false;
  }

  // Verificação de formato de e-mail
  if (form.email && !/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(form.email)) {
    errors.email = "E-mail inválido.";
    valid = false;
  }

  // Verificação de formato de CPF (exemplo de validação simples)
  if (form.cpf && !/^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(form.cpf)) {
    errors.cpf = "CPF inválido. Use o formato XXX.XXX.XXX-XX";
    valid = false;
  }

  // Enviar os dados apenas se forem válidos
  if (valid) {
    try {
      // Enviar dados para o backend Django via API
      const response = await axios.post("/cadastro/", form);

      if (response.status === 201) {
        alert(response.data.message); // Mensagem de sucesso
        // Redirecionar ou realizar outra ação após o cadastro bem-sucedido
      }
    } catch (error) {
      // Caso haja algum erro na requisição
      if (error.response && error.response.data) {
        // Verifique se há erros específicos no corpo da resposta
        const apiErrors = error.response.data.errors;
        if (apiErrors) {
          // Preencher o objeto de erros com mensagens específicas da API
          Object.keys(apiErrors).forEach((key) => {
            errors[key] = apiErrors[key][0]; // Supondo que a API envie um array de mensagens de erro
          });
        }
      } else {
        alert('Erro ao realizar o cadastro');
        console.error(error);
      }
    }
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
          <input v-model="form.email" type="email" placeholder="E-mail" />
          <p v-if="errors.email" class="error">{{ errors.email }}</p>
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

        <div class="form-group">
          <input v-model="form.data_nascimento" type="date" placeholder="Data de Nascimento" />
          <p v-if="errors.data_nascimento" class="error">{{ errors.data_nascimento }}</p>
        </div>

        <button type="submit">Próximo</button>
      </form>
    </div>
  </div>

  <hr><hr>

  <RodaView />
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
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
  width: 100%;
  max-width: 500px;
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
  justify-content: center;
}

input {
  width: 90%;
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
