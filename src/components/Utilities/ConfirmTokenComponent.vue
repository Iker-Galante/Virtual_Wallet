<script setup>
import { ref } from 'vue';
import { useProfileStore } from '@/Stores/ProfileStore';
import { useRouter } from 'vue-router';

const isOpen=defineModel('value');
const mail=defineModel('email');
const newPassword=defineModel('newPassword');
const token= ref('');
const profileStore = useProfileStore();
const router = useRouter();

function validate(){
    const index=profileStore.getCurrentProfileIndex(mail.value);
    console.log(newPassword.value);
    if(token.value == profileStore.getToken()){
        profileStore.resetPassword(index,newPassword.value);
        isOpen.value=false;
        router.push('/login');
        return;
    }
    console.log('Token incorrecto');
}
</script>

<template>
        <v-dialog v-model="isOpen" width="auto">
        <v-card>
            <v-card-text>Ingrese Token para continuar</v-card-text>
            <v-text-field label="Token" v-model="token" placeholder="Token" type="text" prepend-inner-icon="mdi-ticket-confirmation-outline" variant="outlined" color="blue" class="pa-1"></v-text-field>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn @click="isOpen = false">Cancelar</v-btn>
                    <v-btn color="error" @click="validate()">Aceptar</v-btn>
                </v-card-actions>
            </v-card>
    </v-dialog>
</template>