import { ref, computed } from 'vue';
import { defineStore } from 'pinia'
import { useMovementStore } from './MovementStore';

export const usePaymentsStore = defineStore('payments', () => {

// Colección de pagos, index representa el id del usuario y se guarda un array
// de montos de los links de pago generados, al pagarse la deuda el monto se setea en null
    const payments = ref([]);
    const movements = useMovementStore();

// El usuario tiene la deuda, es decir, es quien genera el link

    function createPayment(userId, amount)    { 

        if(amount <= 0) return null;

        if (!payments.value[userId])  {

            payments.value[userId] = [];
        }

        payments.value[userId].push(amount);

        const paymentId = payments.value[userId].length - 1;

        return `?from=${userId}&payment=${paymentId}`;
    }

    function pay(userId, paymentId)    {

        if(!payments.value[userId] || !payments.value[userId][paymentId]) return false;
        
        movements.addMovement(userId, new Date().toLocaleDateString(), new Date().toLocaleTimeString(), payments.value[userId][paymentId], 'cobro', 'Cobro con link de pago', false);
        payments.value[userId][paymentId] = null;

        return true;
    }

    function getPaymentAmount(userId, paymentId)    {

        if(!payments.value[userId] || !payments.value[userId][paymentId]) {
            
            return null;
        }
        
        return payments.value[userId][paymentId];
    }

    function getLastPayment(userId) {

        return getPaymentAmount(userId, getLastPaymentId(userId));
    }

    function getLastPaymentId(userId)   {

        return payments.value[userId].length - 1;
    }

    return {createPayment, pay, getPaymentAmount, getLastPayment, getLastPaymentId};
})