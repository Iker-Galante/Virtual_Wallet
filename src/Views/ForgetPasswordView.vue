
<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useProfileStore } from '@/Stores/ProfileStore';
import ConfirmTokenComponent from '@/components/ConfirmTokenComponent.vue';

const profileStore = useProfileStore();
const mail= ref('');
const name= ref('');
const lastName= ref('');
const password= ref('');
const passwordStatus = ref(false);
const forms = computed(() => name.value!='' && lastName.value!='' && mail.value!='' && password.value!='');
const errorMessage = ref('Los datos no coinciden con los registrados');
const displayErrorNoUser = ref(false);
const displayErrorNoMatching = ref(false);
const isOpen= ref(false);
const router = useRouter();
function navigate(){
  router.go(-1);
}

function validate(){
  displayErrorNoUser.value=false;
  displayErrorNoMatching.value=false;

  const index=profileStore.getCurrentProfileIndex(mail.value);
  const profile= profileStore.getCurrentProfileUserId(mail.value);
  if(index==-1){
    errorMessage.value='No existe un usuario con ese mail';
    displayErrorNoUser.value=true;
    return;
  }
  if(profile.name!=name.value || profile.lastName!=lastName.value){
    errorMessage.value='Los datos no coinciden con los registrados';
    displayErrorNoMatching.value=true;
    return;
  }
  const random= ref(Math.random()* 100000000);
  let roundedNumber = Number(random.value.toPrecision(8));
  profileStore.setToken(roundedNumber);
  console.log(roundedNumber);
  profileStore.setToken(roundedNumber);
  isOpen.value=true;
}

function showpassword() {
  passwordStatus.value = !passwordStatus.value;
}
</script>

<template>
<v-card class="ma-auto" min-width="800" min-height="450" elevation="8">
        <v-card-title>
          <h3 class="text-h3 text-left">Recuperar Contraseña</h3>
        </v-card-title>
        <v-card-text class="py-0">
            <div class="d-flex flex-row">   
                <v-text-field label="Nombre" v-model="name" placeholder="Jose Gutierrez" type="text" prepend-inner-icon="mdi-account" variant="outlined" color="blue" class="pa-1" :error="displayErrorNoMatching" :error-messages="displayErrorNoMatching? errorMessage: ''"></v-text-field>
                <v-text-field label="Apellido" v-model="lastName" placeholder="Dolores de Rosa" type="text" prepend-inner-icon="mdi-account" variant="outlined" color="blue" class="pa-1" :error="displayErrorNoMatching" :error-messages="displayErrorNoMatching? errorMessage: ''"></v-text-field>
            </div>
            <div class="d-flex">
                <v-text-field label="Email" v-model="mail" placeholder="myEmail@gmail.com" type="email" prepend-inner-icon="mdi-account" variant="outlined" color="blue" class="pa-1" :error="displayErrorNoUser" :error-messages="displayErrorNoUser? errorMessage: ''"></v-text-field>
            </div>
          <v-text-field label="Nueva Contraseña" v-model="password" placeholder="123456" :type="passwordStatus? 'text' : 'password'" 
          prepend-inner-icon="mdi-lock" :append-inner-icon= "passwordStatus ?'mdi-eye-outline' : 'mdi-eye-off-outline'"  
          @click:append-inner="showpassword()" variant="outlined" color="blue" class="pa-1"></v-text-field>
        </v-card-text>
        <v-card-actions class="justify-end">
          <v-btn color="primary" class="iniciar" variant="text" @click="navigate()">Salir</v-btn>
          <v-btn color="primary" class="iniciar" variant="text" @click="validate()" :disabled="!forms">Restablecer Contraseña</v-btn>
        </v-card-actions>
      </v-card>
      <ConfirmTokenComponent v-model:value="isOpen" v-model:email="mail" v-model:newPassword="password"/>
</template>

<style scoped>


</style>