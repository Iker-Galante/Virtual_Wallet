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
        { date: '2024-03-16', time: '14:45', amount: 5000.00, movementType: 'deposito', description: 'Salario', isCardTransaction: false },
        { date: '2024-03-16', time: '14:45', amount: -50.00, movementType: 'retiro', description: 'Compras', isCardTransaction: true },
        { date: '2024-03-17', time: '11:20', amount: -30.00, movementType: 'pago', description: 'Factura de servicios', isCardTransaction: false },
        { date: '2024-03-18', time: '20:15', amount: -25.50, movementType: 'pago', description: 'Restaurante', isCardTransaction: true },
        { date: '2024-03-19', time: '16:00', amount: 200.00, movementType: 'deposito', description: 'Reembolso', isCardTransaction: false },
    ];

    function addMovement(userId, date, time, amount, movementType, description, isCardTransaction, cardNumber) {
        if (!movements.value[userId]) {
            movements.value[userId] = [...staticMovements];
            
            console.log("Adding static movements to user:", userId);
            for (const movement of staticMovements) {
                if (movement.isCardTransaction) {
                    const cards = cardStore.getCards(userId);
                    if (cards.length > 0) {
                        cardStore.addCardTransaction(userId, cards[0].cardNumber, movement.amount);
                        console.log("Card transaction added for static movement:", movement);
                    }
                } else {
                    balanceStore.addFundsById(userId, movement.amount);
                    console.log("Funds added for static movement:", movement);
                }
            }
        }

        let transactionSuccess = true;

        if (isCardTransaction) {
            if (!cardNumber) {
                cardNumber = cardStore.getCards(userId)[0].cardNumber;
            }
            transactionSuccess = cardStore.addCardTransaction(userId, cardNumber, amount);
        } else {
            balanceStore.addFundsById(userId, amount);
        }

        if (transactionSuccess) {
            movements.value[userId].push({ date, time, amount, movementType, description, isCardTransaction });
            return true;
        }

        return false;
    }

    function getMovementsByUserId(userId) {
        if (!movements.value[userId]) {
            addMovement(userId, '2024-03-15', '09:30', 1500.00, 'deposito', 'Salario', false, null);
        }
        return movements.value[userId];
    }

    return { addMovement, getMovementsByUserId }
})
