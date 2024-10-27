//id de Usuario, fecha, hora, monto, tipo de movimiento, descripcion

import { ref } from 'vue';
import { defineStore } from 'pinia';
import { useCardStore } from './CardStore';
import { useBalanceStore } from './BalanceStore';
//import {  } from '@/api/';

export const useMovementStore = defineStore('movement', () => {
    const movements = ref({})
    const cardStore = useCardStore()
    const balanceStore = useBalanceStore()

    const staticMovements = [
        { date: '2024-03-16', time: '14:45:00', amount: 5000.00, movementType: 'deposito', description: 'Salario', isCardTransaction: false },
        { date: '2024-03-16', time: '14:45:00', amount: -50.00, movementType: 'retiro', description: 'Compras', isCardTransaction: true },
        { date: '2024-03-17', time: '11:20:00', amount: -30.00, movementType: 'pago', description: 'Factura de servicios', isCardTransaction: false },
        { date: '2024-03-18', time: '20:15:00', amount: -25.50, movementType: 'pago', description: 'Restaurante', isCardTransaction: true },
        { date: '2024-03-19', time: '16:00:00', amount: 200.00, movementType: 'deposito', description: 'Reembolso', isCardTransaction: false },
    ];

    function initializeUserMovements(userId) {
        if (movements.value[userId]) return;

        movements.value[userId] = [...staticMovements];
        
        staticMovements.forEach(movement => {
            if (movement.isCardTransaction) {
                const cards = cardStore.getCards(userId);
                if (cards.length > 0) {
                    cardStore.addCardTransaction(userId, cards[0].cardNumber, movement.amount);
                }
            } else {
                balanceStore.addFundsById(userId, movement.amount);
            }
        });
    }

    function addMovement(userId, date, time, amount, movementType, description, isCardTransaction, cardNumber) {
        initializeUserMovements(userId);

        const transactionSuccess = isCardTransaction
            ? cardStore.addCardTransaction(userId, cardNumber || cardStore.getCards(userId)[0].cardNumber, amount)
            : (balanceStore.addFundsById(userId, amount), true);

        if (transactionSuccess) {
            movements.value[userId].push({ date, time, amount, movementType, description, isCardTransaction });
        }

        return transactionSuccess;
    }

    function getMovementsByUserId(userId) {
        initializeUserMovements(userId);
        return movements.value[userId];
    }

    return { addMovement, getMovementsByUserId }
})
