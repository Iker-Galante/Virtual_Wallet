<script setup>
import LoginForm from '@/components/Users/LoginFormComponent.vue';
</script>

<template>
  <div class="container">
    <div class="left-side">
      <v-img class="redondo" max-width="400" src="@/assets/logo.jpg"></v-img>
      <h3 class="text-texto text-center text-h4 logo-text">Bienvenido a Platan't</h3>
    </div>
    
    <div class="right-side">
      <LoginForm />
    </div>
  </div>
</template>

<style scoped>
  .container {
  display: flex;
  height: 100vh; /* Full height of the viewport */
  width: 100vw; /* Full width of the viewport */
  text-align: center;
  align-items: center;
 background: linear-gradient(to right, rgba(25, 25, 25, 0.95) 40%, rgba(255, 255, 255, 0.7) 40%);
}
.left-side {
  flex: 0.8; 
  padding: 20px 10px 20px 10px;
}
.right-side {
  flex: 1.2;
  padding: 20px;
}

.redondo {
  border-radius: 50%;
  margin: 0 auto;
  opacity: 0.8; 
}
.iniciar {
  font-weight: bold;
}

.logo-text {
  margin-top: 40px; 
}
</style>
