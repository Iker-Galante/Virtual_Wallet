<script setup>
import { ref } from 'vue';
const saldo = ref(0.00);

function addFunds() {
    saldo.value += 100.05; //Cambiar por la logica de agregado de fondos
}
</script>

<template>
    <div class="saldo-component d-flex align-center">
        <v-card class="tarjeta elevation-12" image="@/assets/Cardbg.jpeg">
            <v-card-text>
            <div class="align-center justify-space-between d-flex">
                <v-btn prepend-icon="mdi-plus-circle-outline" color="white" variant="text" class="text-none ml-auto pl-0"
                @click="addFunds"> 
                <div class="btn-text">
                    <span>Ingresar</span>
                    <span>Fondos</span>
                </div>
                </v-btn>
                <div class="align-left d-flex mr-auto text-white sld-text">
                <span class="saldo">Saldo Disponible</span>
                <span class="text-h5 text-truncate"> ${{ saldo }}</span>
                </div>    
        </div>
            </v-card-text> 
            <v-card-actions class="justify-space-between px-12">
                <v-btn class="text-white pagar" prepend-icon="mdi-send-variant-outline" >Pagar</v-btn>
                <v-btn class="text-white cobrar"  prepend-icon="mdi-arrow-up">Cobrar</v-btn>
            </v-card-actions>
        </v-card>
    </div>
</template>

<style scoped>
.saldo-component {
    margin-top: 50px;
    justify-content: center;
}
.tarjeta {
    /*Agregar ancho si necesario   width: ;*/
    width: 60vw; /* Set a specific width */
    padding: 30px; 
    border-radius: 20px;
}
.btn-text {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    line-height: 1.2;
}
.sld-text{
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    line-height: 1.2;
}
.pagar{
    flex: 1;
    background-color: #A398C1;
}
.cobrar{
    flex: 1;
    margin-left: 18px;
    background-color: #7749F8;
}
.saldo{
    font-size: 10px;
    font-weight: 500;
}
</style>