<script setup>
import { storeToRefs } from 'pinia'
import { useBalanceStore } from '@/Stores/BalanceStore'

const balanceStore = useBalanceStore()
const { balance } = storeToRefs(balanceStore)
const { addFunds } = balanceStore
</script>

<template>
  <div>
    <h2>Balance: {{ balance }}</h2>
    <button @click="addFunds(100)">Add 100</button>
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
  margin-left: 25%;
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
</style>
