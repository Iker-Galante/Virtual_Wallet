import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import { useProfileStore } from '@/Stores/ProfileStore';

export const useBalanceStore = defineStore('balance', () => {

    const balances = ref({});

    function addFundsById(userId, amount) {
        if (!balances.value[userId]) {
            balances.value[userId] = 0;
        }

        if (balances.value[userId] + amount < 0) {
            alert("Insufficient funds. This action cannot be completed.");
            return false;
        }
        
        balances.value[userId] = parseFloat((parseFloat(balances.value[userId]) + parseFloat(amount)).toFixed(2));
        return true;
    }

    function getBalanceById(userId) {
        return balances.value[userId] || 0;
    }

    const profiles = useProfileStore();
    const currentId = computed(() => profiles.getCurrentProfileId());

    function addFunds(amount) {
        return addFundsById(currentId.value, amount);
    }

    function getBalance() {
        return getBalanceById(currentId.value);
    }

    return { addFundsById, getBalanceById, addFunds, getBalance };
});
