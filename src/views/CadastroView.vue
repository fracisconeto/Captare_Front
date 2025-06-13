<script setup>
import RodaView from '../components/RodaView.vue';
</script>
<template> 
<div class="container">
    <h1 class="titulo">Faça o seu cadastro</h1>

    <div class="cadastro-container">
      <div class="form-section">
        <h2>Meu perfil</h2>
        <div class="inputs">
          <input type="text" placeholder="Nome" />
          <input type="text" placeholder="CPF" />
          <input type="text" placeholder="Telefone" />
          <input type="email" placeholder="E-mail" />
          <input type="date" placeholder="Data de nascimento" />
        </div>
      </div>

      <div class="form-section">
        <h2>Endereço</h2>
        <div class="inputs">
          <input type="text" placeholder="CEP" />
          <input type="text" placeholder="Rua" />
          <input type="text" placeholder="Número" />
          <input type="text" placeholder="Bairro" />
          <input type="text" placeholder="Cidade" />
        </div>
      </div>
    </div>
  </div>

<RodaView/>
</template>
<style scoped>
body {
  background-color: #ffffff;
  font-family: 'Segoe UI', sans-serif;
}

.titulo {
  text-align: center;
  margin-top: 60px;
  font-size: 38px;
  color: #2e4b5b;
}

.cadastro-container {
  display: flex;
  justify-content: center;
  gap: 80px;
  margin-top: 50px;
  padding: 0 20px;
  flex-wrap: wrap;
}

.form-section {
  border: 1px solid #b3cfe0;
  border-radius: 6px;
  padding: 40px;
  width: 520px; /* ← largura aumentada */
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.form-section h2 {
  font-size: 20px;
  margin-bottom: 25px;
  color: #2e4b5b;
}

.inputs {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.inputs input {
  width: 90%;
  padding: 14px 16px;
  margin-bottom: 18px;
  border: 1px solid #b3cfe0;
  border-radius: 6px;
  font-size: 16px;
  color: #2e4b5b;
}

.inputs input::placeholder {
  color: #b3cfe0;
}

.container{
    margin-bottom: 50px;
}
</style>



