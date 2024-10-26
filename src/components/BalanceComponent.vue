<script setup>
// import { useRouter } from 'vue-router';
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import SaldoDisplay from './SaldoDisplay.vue';
import { useBalanceStore } from '@/Stores/BalanceStore';
import { useMovementStore } from '@/Stores/MovementStore';
import { useProfileStore } from '@/Stores/ProfileStore';

const router = useRouter();
const balanceStore = computed(() => useBalanceStore());
const movementStore = computed(() => useMovementStore());
const profileStore = computed(() => useProfileStore());
const profileId = computed(() => profileStore.value.getCurrentProfileIndex(profileStore.value.getCurrentProfile().email));

//TODO: make it dynamic
function addFunds() {
    balanceStore.value.addFunds(100.05); 
    movementStore.value.addMovement(
        profileId.value, 
        new Date().toISOString().split('T')[0], 
        new Date().toISOString().split('T')[1].split('.')[0], 
        100.05, 
        'credit', 
        'Ingreso de fondos'
    );

}
</script>

<template>
    <div class="saldo-component d-flex align-center">
        <v-card class="tarjeta elevation-12" image="@/assets/Cardbg.jpeg">
            <v-card-text>
                <div class="align-center justify-space-between d-flex">
                    <v-btn prepend-icon="mdi-plus-circle-outline" class="add-funds-btn" @click="addFunds"> 
                     <div class="btn-text">
                        <span>Ingresar</span>
                        <span>Fondos</span>
                    </div> 
                    </v-btn>
                    <SaldoDisplay class="saldo-display"/>
                </div>
            </v-card-text>
            <v-card-actions class="button-container">
                <v-btn class="action-btn pagar" prepend-icon="mdi-send-variant-outline" @click="router.push('/Pay')">Pagar</v-btn>
                <v-btn class="action-btn cobrar" prepend-icon="mdi-arrow-up" @click="router.push('/Collect')">Cobrar</v-btn>
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
    
    width: 60vw; 
    height: 20vw;
    padding: 30px; 
    border-radius: 20px;
}
.btn-text {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    line-height: 1.2;
    font-size: 1.1rem; 

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
.add-funds-btn {
  color: white;
  background-color: transparent; 
  text-transform: none;
  margin-left: 20%;
  padding-left: 0;
  font-size: 1.2rem; 
  height: auto; 
  padding: 12px 20px; 
}

.button-container {
  display: flex;
  justify-content: space-between;
  padding: 0 16px 16px;
  margin-top: 16px;
  width: 80%;
  margin-left: auto;
  margin-right: auto;
}

.action-btn {
  flex: 0 0 45%;
  padding: 16px 24px;
  font-size: 1.1rem;
  text-transform: none;
  border-radius: 12px;
  height: 70px;
}

.pagar {
  background-color: rgba(163, 152, 193, 0.7);
  color: white;
}

.cobrar {
  background-color: rgba(119, 73, 248, 0.7);
  color: white;
}

/* Adjust icon size */
.action-btn :deep(.v-btn__prepend) {
  margin-right: 10px;
  font-size: 1.3rem;
}
.saldo-display {
    margin-right: 40%;
}
</style>