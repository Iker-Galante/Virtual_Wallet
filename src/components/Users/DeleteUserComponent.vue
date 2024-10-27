<script setup>
import { useRouter } from 'vue-router';
import {useProfileStore} from '@/Stores/ProfileStore';
const profileStore = useProfileStore();
const isOpen=defineModel('isOpen');
const index=defineModel('index');
const router = useRouter();
const deleteUser = (index) => {
    profileStore.deleteProfile(index);
    router.push({ name: 'login' });
}
</script>

<template>
    <v-dialog v-model="isOpen" width="auto">
        <v-card>
            <v-card-text>¿Estás seguro de que deseas eliminar su cuenta?</v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                        <v-btn color="error" @click="deleteUser(index)">Sí</v-btn>
                        <v-btn @click="isOpen = false">No</v-btn>
                </v-card-actions>
            </v-card>
    </v-dialog>
</template>