<script setup>
import { ref, computed, inject, onMounted } from 'vue';
import { useMovementStore } from '@/Stores/MovementStore';
import { usePaymentsStore } from '@/Stores/PaymentsStore';

const description = ref('Bitcoin');
const userToPay = ref('Isaac@Newton')
const nameToPay = ref('Isaac Newton')
const price = ref(0);
const isLoading = ref(false);
const confirmDialog = ref(false); // Control dialog visibility

const currentProfile = inject('currentuserId');
const movementStore = useMovementStore();
const paymentStore = usePaymentsStore();

const isFormValid = computed(() => price.value > 0 && description.value.trim() !== '');

// Hardcoded price example
onMounted(() => {
  paymentStore.createPayment(0, 100);
  price.value = paymentStore.getLastPayment(0);
});

const openConfirmation = () => {
  confirmDialog.value = true;
};

const confirmPayment = () => {
  console.log('Procesando pago:', { amount: price.value, description: description.value });
  const date = new Date().toISOString().split('T')[0];
  const time = new Date().toISOString().split('T')[1].split('.')[0];
  movementStore.addMovement(currentProfile.value, date, time, price.value, 'payment', description.value);
  confirmDialog.value = false; // Close dialog after confirmation
};

const cancelPayment = () => {
  confirmDialog.value = false;
};
</script>


<template>
  <v-container>
    <v-row justify="center" align="center">
      <v-col cols="12" sm="8" md="6">
        <v-card class="pa-6 cuadro">
          <template v-if="price !== 0">
            <p class="price-text">Monto a pagar: ${{ price }}</p>
            <p class="description-text">Descripción: {{ description }}</p>
            <p class="author-text">Para: {{ nameToPay }}, {{ userToPay }}</p>
            <v-btn class="confirm-btn" @click="openConfirmation">Pagar</v-btn>
          </template>
          <template v-else>
            <p class="error-text">Error: No se pudo cargar el monto de pago.</p>
          </template>
        </v-card>
      </v-col>
    </v-row>

    <!-- Confirmation Dialog -->
    <v-dialog v-model="confirmDialog" max-width="400">
      <v-card>
        <v-card-title class="headline dialog-title">Confirmar Transacción</v-card-title>
        <v-card-text class="confirmation-text">
          ¿Estás seguro de que deseas confirmar el pago de ${{ price }}?
          <br />
          <strong>Descripción:</strong> {{ description }}
        </v-card-text>
        <v-card-actions class="confirmation-actions">
          <v-btn @click="confirmPayment" style="background-color: #8E66FF; color: white; font-size: 16px;">
            Sí, Confirmar
          </v-btn>
          <v-btn @click="cancelPayment" style="background-color: #A9A9A9; color: white; font-size: 16px;">
            Cancelar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<style scoped>

.cuadro {
  border-radius: 15px;
  background-color: #2f2e36;
  color: white;
  text-align: center;
  padding: 20px;
  margin-bottom: 20px;
}

.price-text {
  font-size: 24px;
  margin-bottom: 15px;
}

.description-text {
  font-size: 20px;
  margin-bottom: 20px;
}

.confirm-btn {
  margin-top: 10px;
  background-color: #8E66FF;
  color: white;
  font-size: 18px;
  padding: 10px 20px;
}

.error-text {
  color: red;
  font-weight: bold;
}

.dialog-title {
  font-size: 22px;
  text-align: center;
}

.confirmation-text {
  padding: 20px;
  font-size: 18px;
  color: #333;
}

.confirmation-actions {
  display: flex;
  justify-content: space-between;
  padding: 20px;
}

.v-card {
  padding: 10px;
}
</style>
