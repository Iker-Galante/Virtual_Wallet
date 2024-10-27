import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import { useProfileStore } from '@/Stores/ProfileStore';

export const useBalanceStore = defineStore('balance', () => {

    const balances = ref({});

    function addFundsById(userId, amount) {
        if (!balances.value[userId]) {
            balances.value[userId] = 0;
        }
        
        balances.value[userId] = parseFloat((parseFloat(balances.value[userId]) + parseFloat(amount)).toFixed(2));
    }

    function getBalanceById(userId) {
        return balances.value[userId] || 0;
    }

    const profiles = useProfileStore();
    const currentId = computed(() => profiles.getCurrentProfileId());

    function addFunds(amount) {
        addFundsById(currentId.value, amount);
    }

    function getBalance() {
        return getBalanceById(currentId.value);
    }

    return { addFundsById, getBalanceById, addFunds, getBalance };
});
