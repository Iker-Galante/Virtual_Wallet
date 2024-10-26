<script setup>

const isOpen=defineModel();
console.log(isOpen)

const deleteCard = (tarjeta) => {
    cardStore.eliminateCard(profileId.value, tarjeta.cardNumber)
    isOpen.value = false
}
</script>

<template>
    <v-dialog v-model="isOpen" width="auto">
        <v-card>
            <v-card-text>¿Estás seguro de que deseas eliminar esta tarjeta?</v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                        <v-btn color="error" @click="deleteCard(tarjeta)">Sí</v-btn>
                        <v-btn @click="isOpen = false">No</v-btn>
                </v-card-actions>
            </v-card>
    </v-dialog>
</template>