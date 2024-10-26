
import { ref } from 'vue';
import { defineStore } from 'pinia';


export const useBalanceStore = defineStore('balance', () => {

     const initialBalance = ref(0.00);

    function addFunds(amount) {
        initialBalance.value += amount;
    }
    function getBalance() {
        return initialBalance.value;
    }

    return { addFunds,getBalance };
});