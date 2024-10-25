<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useProfileStore } from '@/Stores/ProfileStore';

const profileStore = useProfileStore();
const email= ref('');
const password= ref('');
const passwordStatus = ref(false);

function showpassword() {
  passwordStatus.value = !passwordStatus.value;
}
const router = useRouter();
function navigate(path){
  router.push(path);
}

function checkCredentials(path){
  const profile = profileStore.getCurrentProfileUserId(email.value);
  if(profile && profile.password === password.value){
    profileStore.setCurrentProfile(profile);
    router.push(path);
  }else{
    alert("Credenciales incorrectas");
  }
}
</script>

<template>
  <div class="container">
    <div class="left-side">
      <v-img class="redondo" max-width="500" src="@/assets/logo.jpg"></v-img>
      <h3 class="text-texto text-center text-h4">Bienvenido a Platan't</h3>
    </div>
    
    <div class="right-side">
      <v-card class="mx-auto" max-width="600" max-height="600" elevation="4">
        <v-card-title>
          <h3 class="text-h3 text-left">Iniciar sesión</h3>
        </v-card-title>
        <v-card-text class="py-0 ">
          <v-text-field label="Email" v-model="email" placeholder="mymail@gmail.com" type="email" prepend-inner-icon="mdi-account" variant="outlined" color="blue"></v-text-field>
          <v-text-field label="Contraseña" v-model="password" placeholder="Contraseña" :type="passwordStatus? 'text' : 'password'" 
          prepend-inner-icon="mdi-lock" :append-inner-icon= "passwordStatus ?'mdi-eye-outline' : 'mdi-eye-off-outline'"  
          @click:append-inner="showpassword()" variant="outlined" color="blue"></v-text-field>
        </v-card-text>
        <v-card-actions class="justify-end">
          <v-btn color="primary" class="iniciar" variant="text" @click="checkCredentials('/MainPage')">Iniciar sesión</v-btn>
        </v-card-actions>
        <v-divider class="opacity-10 mx-2"></v-divider>
        <v-card-actions class="pb-0">
          <p class="text-h8 pl-1">Olvidaste tu constraseña?</p>
          <v-btn  color="primary" class="ml-auto" variant="plain">Recuperar Contraseña</v-btn>
        </v-card-actions>
        <v-card-actions class="pt-0"> 
          <p class="text-h8 pl-1">Primera vez áca?</p>
          <v-btn color="primary" class="ml-auto" variant="plain" @click="navigate('/register')">Registrarse</v-btn>
        </v-card-actions>
      </v-card>
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
 background: linear-gradient(to right, rgba(44, 44, 44, 0.9) 40%, rgba(255, 255, 255, 0.7) 40%);
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
</style>
