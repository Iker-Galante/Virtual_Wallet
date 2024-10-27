<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

const goHome = () => {
  router.push('/');
};
</script>

<template>
  <div class="not-found-container">
    <h1>404</h1>
    <h2>Página No Encontrada</h2>
    <p>Lo sentimos, la página que buscas no existe.</p>
    <button @click="goHome" class="home-button">
      Volver al Inicio
    </button>
  </div>
</template>

<style scoped>
.not-found-container {
  text-align: center;
  padding: 2rem;
  min-height: 100vh;
  background-color: #1a1a1a;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

h1 {
  font-size: 8rem;
  color: #ffffff;
  margin: 0;
  font-family: 'Inter', sans-serif;
  text-shadow: 0 0 20px rgba(138, 43, 226, 0.4);
}

h2 {
  font-size: 2.5rem;
  color: #ffffff;
  margin-bottom: 1rem;
  font-family: 'Inter', sans-serif;
  font-weight: 500;
}

p {
  color: #a0a0a0;
  margin-bottom: 2rem;
  font-family: 'Inter', sans-serif;
  font-size: 1.1rem;
}

.home-button {
  background-color: #8a2be2;
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1.1rem;
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  transition: all 0.3s ease;
  box-shadow: 0 0 15px rgba(138, 43, 226, 0.3);
}

.home-button:hover {
  background-color: #9d44e9;
  box-shadow: 0 0 20px rgba(138, 43, 226, 0.5);
}
</style>
