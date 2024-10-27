<script setup>
import { ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useProfileStore } from '@/Stores/ProfileStore';

const profileStore = useProfileStore();
const email = ref('');
const password = ref('');
const passwordStatus = ref(false);
const showEmailError = ref(false);
const userEmailError = ref("Email o contraseña incorrectos");
const router = useRouter();
const route = useRoute();

function showpassword() {
  passwordStatus.value = !passwordStatus.value;
}

function navigate(path) {
  router.push(path);
}

function checkCredentials() {
  showEmailError.value = false;

  const profile = profileStore.getCurrentProfileUserId(email.value);
  if (profile && profile.password === password.value) {
    profileStore.setCurrentProfile(profile);
    const redirect = route.query.redirect || '/'
    router.push(redirect);
  } else {
    showEmailError.value = true;
  }
}
</script>

<template>
  <v-card class="mx-auto" max-width="600" max-height="600" elevation="4">
    <v-card-title>
      <h3 class="text-h4 text-left pb-3">Iniciar sesión</h3>
    </v-card-title>
    <v-card-text class="py-0">
      <v-text-field label="Email" v-model="email" placeholder="miEmail@gmail.com" type="email"
        prepend-inner-icon="mdi-account" variant="outlined" color="blue" :error="showEmailError"
        :error-messages="showEmailError ? userEmailError : ''"></v-text-field>
      <v-text-field label="Contraseña" v-model="password" placeholder="Contraseña"
        :type="passwordStatus ? 'text' : 'password'" prepend-inner-icon="mdi-lock"
        :append-inner-icon="passwordStatus ? 'mdi-eye-outline' : 'mdi-eye-off-outline'"
        @click:append-inner="showpassword()" variant="outlined" color="blue" :error="showEmailError"
        :error-messages="showEmailError ? userEmailError : ''"></v-text-field>
    </v-card-text>
    <v-card-actions class="justify-end">
      <v-btn color="primary" class="iniciar" variant="text" @click="checkCredentials()">Iniciar sesión</v-btn>
    </v-card-actions>
    <v-divider class="opacity-10 mx-2"></v-divider>
    <v-card-actions class="pb-0">
      <p class="text-h8 pl-1">Olvidaste tu constraseña?</p>
      <v-btn color="primary" class="ml-auto" variant="plain" @click="navigate('/forget-password')">Recuperar
        Contraseña</v-btn>
    </v-card-actions>
    <v-card-actions class="pt-0">
      <p class="text-h8 pl-1">Primera vez áca?</p>
      <v-btn color="primary" class="ml-auto" variant="plain" @click="navigate('/register')">Registrarse</v-btn>
    </v-card-actions>
  </v-card>
</template>

<style scoped>
.iniciar {
  font-weight: bold;
}
</style>
