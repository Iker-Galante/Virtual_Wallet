import { ref, computed } from 'vue';
import { defineStore } from 'pinia'
import { useBalanceStore } from './BalanceStore';

export const usePaymentsStore = defineStore('profile', () => {

// Colección de pagos, index representa el id del usuario y se guarda un array
// de montos de los links de pago generados, al pagarse la deuda el monto se setea en null
    const payments = ref([]);
    const balances = useBalanceStore();

// El usuario tiene la deuda, es decir, es quien genera el link

    function createPayment(userId, amount)    { 

        if(amount <= 0) return;

        if (!payments.value[userId])  {

            payments.value[userId] = [];
        }

        payments.value[userId].push(amount);

        const paymentId = payments.value[userId].length - 1;

        return `from=${userId}&payment=${paymentId}`;
    }

    function pay(userId, paymentId)    {

        if(!payments.value[userId] || !payments.value[userId][paymentId]) return;
        
        balances.addFundsById(userId, payments.value[userId][paymentId]);
        payments.value[userId][paymentId] = null;
    }

    return {createPayment, pay};
})