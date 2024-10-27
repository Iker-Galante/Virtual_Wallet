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
  <v-card class="login-card">
    <v-card-title>
      <h3 class="login-title">Iniciar sesión</h3>
    </v-card-title>
    <v-card-text class="login-form">
      <v-text-field
        label="Email"
        v-model="email"
        placeholder="miEmail@gmail.com"
        type="email"
        prepend-inner-icon="mdi-account"
        variant="outlined"
        color="blue"
        :error="showEmailError"
        :error-messages="showEmailError ? userEmailError : ''"
      ></v-text-field>
      <v-text-field
        label="Contraseña"
        v-model="password"
        placeholder="Contraseña"
        :type="passwordStatus ? 'text' : 'password'"
        prepend-inner-icon="mdi-lock"
        :append-inner-icon="passwordStatus ? 'mdi-eye-outline' : 'mdi-eye-off-outline'"
        @click:append-inner="showpassword()"
        variant="outlined"
        color="blue"
        :error="showEmailError"
        :error-messages="showEmailError ? userEmailError : ''"
      ></v-text-field>
    </v-card-text>
    <v-card-actions class="login-actions">
      <v-btn color="primary" class="login-button" variant="text" @click="checkCredentials()">
        Iniciar sesión
      </v-btn>
    </v-card-actions>
    <v-divider class="login-divider"></v-divider>
    <v-card-actions class="recovery-section">
      <p class="helper-text">Olvidaste tu constraseña?</p>
      <v-btn color="primary" class="recovery-button" variant="plain" @click="navigate('/forget-password')">
        Recuperar Contraseña
      </v-btn>
    </v-card-actions>
    <v-card-actions class="register-section">
      <p class="helper-text">Primera vez áca?</p>
      <v-btn color="primary" class="register-button" variant="plain" @click="navigate('/register')">
        Registrarse
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<style scoped>
.login-card {
  max-width: 600px;
  max-height: 600px;
  margin: 0 auto;
  border: none;
  box-shadow: none;
}

.login-title {
  font-size: 2rem;
  text-align: left;
  padding-bottom: 0.75rem;
}

.login-form {
  padding: 0;
}

.login-actions {
  justify-content: flex-end;
}

.login-button {
  font-weight: bold;
}

.login-divider {
  opacity: 0.1;
  margin: 0 0.5rem;
}

.recovery-section {
  padding-bottom: 0;
}

.register-section {
  padding-top: 0;
}

.helper-text {
  font-size: 0.875rem;
  padding-left: 0.25rem;
}

.recovery-button,
.register-button {
  margin-left: auto;
}
</style>
