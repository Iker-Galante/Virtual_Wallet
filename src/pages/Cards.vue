<script setup>
import { ref} from 'vue'
import Card from '@Card.vue'
const n= ref(0);
</script>

<template>
    <v-app>
    <v-app-main>
        <h1>Mis Tarjetas</h1>
        <v-container fluid>
            <v-row>
                <v-col
                v-for="n in 10"
                :key="n"
                cols="12"
                sm="6"
                md="6"
                lg="4"
                xl="3">
                    <Card />
                </v-col>
            </v-row>
        </v-container>
        <v-btn class="btn" @click="deleteCard">Borrar tarjeta</v-btn>
    </v-app-main>
    </v-app>
</template>

<style scoped>
.btn{
}
</style>