
<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useProfileStore } from '@/stores/ProfileStore';
const passwordStatus = ref(false);
const passwordStatus2 = ref(false);
const name= ref('');
const lastName= ref('');
const mail= ref('');
const age= ref('');
const password= ref('');
const validatePassword= ref('');

const profileStore = useProfileStore();

function showpassword() {
  passwordStatus.value = !passwordStatus.value;
}
function showpassword2() {
  passwordStatus2.value = !passwordStatus2.value;
}
const router = useRouter();
function validate(path){
    if(password.value === validatePassword.value){ //Por ahora solo valida que las contraseñas sean iguales
        profileStore.addProfile(name.value, lastName.value, mail.value, age.value, password.value);
        console.log(profileStore.getCurrentProfileUserId());
    }else{
        alert("Las contraseñas no coinciden");
    }
}
</script>

<template>
      <v-card class="ma-auto" min-width="800" min-height="450" elevation="8">
        <v-card-title>
          <h3 class="text-h3 text-left">Crear Cuenta</h3>
        </v-card-title>
        <v-card-text class="py-0">
            <div class="d-flex flex-row">   
                <v-text-field label="Nombre" v-model="name" placeholder="Jose Gutierrez" type="text" prepend-inner-icon="mdi-account" variant="outlined" color="blue" class="px-2"></v-text-field>
                <v-text-field label="Apellido" v-model="lastName" placeholder="Dolores de Rosa" type="text" prepend-inner-icon="mdi-account" variant="outlined" color="blue" class="px-2"></v-text-field>
            </div>
            <div class="d-flex">
                <v-text-field label="Mail" v-model="mail" placeholder="mymail@gmail.com" type="email" prepend-inner-icon="mdi-account" variant="outlined" color="blue" class="px-2"></v-text-field>
                <v-text-field label="Edad" v-model="age" max-width="150px" placeholder="13" type="number" variant="outlined" color="blue" class="px-2"></v-text-field>
            </div>
          <v-text-field label="Contraseña" v-model="password" placeholder="Contraseña" :type="passwordStatus? 'text' : 'password'" 
          prepend-inner-icon="mdi-lock" :append-inner-icon= "passwordStatus ?'mdi-eye-outline' : 'mdi-eye-off-outline'"  
          @click:append-inner="showpassword()" variant="outlined" color="blue" class="px-2"></v-text-field>
          <v-text-field label="Repetir Contraseña" v-model="validatePassword"placeholder="123456789" :type="passwordStatus2? 'text' : 'password'" 
          prepend-inner-icon="mdi-lock" :append-inner-icon= "passwordStatus2 ?'mdi-eye-outline' : 'mdi-eye-off-outline'"  
          @click:append-inner="showpassword2()" variant="outlined" color="blue" class="px-2"></v-text-field>
        </v-card-text>
        <v-card-actions class="justify-end">
          <v-btn color="primary" class="iniciar" variant="text" @click="validate('/mainPage')">Crear Cuenta</v-btn>
        </v-card-actions>
      </v-card>
</template>

<style scoped>

</style>