<script setup>
import { ref, computed } from 'vue';
import { useBalanceStore } from '@/Stores/BalanceStore';
import { useMovementStore } from '@/Stores/MovementStore';
import { useProfileStore } from '@/Stores/ProfileStore';

const balanceStore = computed(() => useBalanceStore());
const movementStore = computed(() => useMovementStore());
const profileStore = computed(() => useProfileStore());
const profileId = computed(() => profileStore.value.getCurrentProfileIndex(profileStore.value.getCurrentProfile().email));

const showDialog = ref(false);
const fundAmount = ref(0);

function openAddFundsDialog() {
    showDialog.value = true;
}

function addFunds() {
    if (fundAmount.value > 0) {
        balanceStore.value.addFundsById(profileId.value, fundAmount.value);
        movementStore.value.addMovement(
            profileId.value,
            new Date().toISOString().split('T')[0],
            new Date().toISOString().split('T')[1].split('.')[0],
            fundAmount.value,
            'credit',
            'Ingreso de fondos'
        );
        showDialog.value = false;
        fundAmount.value = 0;
    }
}
</script>

<template>
    <div class="add-funds-container">
        <v-btn prepend-icon="mdi-plus-circle-outline" class="add-funds-btn" @click="openAddFundsDialog">
            <div class="btn-text">
                <span>Ingresar</span>
                <span>Fondos</span>
            </div>
        </v-btn>

        <v-dialog v-model="showDialog" max-width="400px">
            <v-card class="dialog-card">
                <v-card-title class="dialog-title">Ingresar Fondos</v-card-title>
                <v-card-text>
                    <v-text-field
                        v-model="fundAmount"
                        label="Monto"
                        type="number"
                        prefix="$"
                        step="0.01"
                        min="0"
                        class="fund-input"
                    ></v-text-field>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="#A398C1" text @click="showDialog = false" class="normal-case-btn">
                        Cancelar
                    </v-btn>
                    <v-btn color="#7749F8" text @click="addFunds" class="normal-case-btn">
                        Confirmar
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<style scoped>
.add-funds-container {
    padding-left: 150px;
}

.add-funds-btn {
    color: white;
    background-color: transparent;
    text-transform: none;
    padding-left: 0;
    font-size: 1.2rem;
    height: auto;
    padding: 12px 20px;
}

.btn-text {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    line-height: 1.2;
}

.dialog-card {
    background-color: #1d1d1d;
    color: white;
}

.dialog-title {
    color: white;
}

.fund-input {
    color: white;
}

:deep(.v-field__outline) {
    color: #7749F8;
}

:deep(.v-label) {
    color: #A398C1;
}

.normal-case-btn {
    text-transform: none;
}
</style>
