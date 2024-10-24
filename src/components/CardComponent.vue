<script setup>

</script>

<template>
    <v-card class="mt-4" elevation="8" ><!--height="100%" por si quiero tarjeta mas larga-->
        <v-card-title class="d-flex justify-space-between align-center">
            <slot name="card"></slot>
        </v-card-title>
        <v-card-text class="d-flex align-center justify-space-between">
            <slot name="card_number"></slot>
        </v-card-text>
    </v-card>
</template>

<style scoped>
</style>