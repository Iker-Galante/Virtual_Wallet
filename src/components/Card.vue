<script setup>
import { ref} from 'vue'

const name= ref('Jose_Dominguez');
const cardname=ref('VISA');
</script>

<template>
    <v-card class="mt-4" elevation="8" ><!--height="100%" por si quiero tarjeta mas larga-->
        <v-card-title class="d-flex justify-space-between align-center">
                <span class="pl-2 text-h5">{{ name }}</span>
                <span class="pr-2 text-h5">{{ cardname }}</span>
        </v-card-title>
        <v-card-text class="d-flex align-center justify-space-between">
            <p class="pl-2 text-h6">**** **** **** 6789</p>
            <v-icon icon="mdi-trash-can-outline"></v-icon>
        </v-card-text>
    </v-card>
</template>

<style scoped>
</style>