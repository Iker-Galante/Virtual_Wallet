
<!-- Usando Alert component, no funciona por mas que las variables 
  se modifiquen correctamente, dejo esta version sin usar el componente

  <template>
  <v-container>
    <v-row justify="center" align="center">
      <v-col cols="12" sm="8" md="6">
        <v-card class="pa-6 cuadro">
          <p class="price-text">Monto a pagar: ${{ price }}</p>
          <p class="description-text">Descripción: {{ description }}</p>
          <p class="author-text">Para: {{ nameToPay }}, {{ userToPay }}</p>
          <v-btn class="confirm-btn" @click="confirmDialog = true">Pagar</v-btn>
        </v-card>
      </v-col>
    </v-row>

    <AlertComponent
      v-model="confirmDialog"
      title="Confirmar Transacción"
      message="¿Estás seguro de que deseas confirmar el pago de ${{ price }}?"
      :buttonText="'Sí, Confirmar'"
      colorClass="confirmation-color"
      :buttonColor="'#f3a500'"
      :onClose="confirmPayment"
    />

    <AlertComponent
      v-model="successDialog"
      title="¡Pago Confirmado!"
      message="Tu pago de ${{ price }} ha sido exitoso."
      buttonText="Cerrar"
      colorClass="success-color"
      :buttonColor="'#8E66FF'"
      :onClose="() => successDialog.value = false"
    />

    <AlertComponent
      v-model="failureDialog"
      title="¡Pago Fallido!"
      message="Tu pago de ${{ price }} no pudo ser procesado. Por favor, intenta de nuevo."
      buttonText="Cerrar"
      colorClass="failure-color"
      :buttonColor="'#A9A9A9'"
      :onClose="() => failureDialog.value = false"
    />
  </v-container>
</template> -->

<template>
  <v-container>
    <v-row justify="center" align="center">
      <v-col cols="12" sm="8" md="6">
        <v-card class="pa-6 cuadro">
          <template v-if="price !== 0">
            <p class="price-text">Monto a pagar: ${{ price }}</p>
            <p class="description-text">Descripción: {{ description }}</p>
            <p class="author-text">Para: {{ nameToPay }}, {{ userToPay }}</p>
            <v-btn class="confirm-btn" @click="openConfirmationDialog">Pagar</v-btn>
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
        <v-card-title class="headline">Confirmar Transacción</v-card-title>
        <v-card-text>¿Estás seguro de que deseas confirmar el pago de ${{ price }}?</v-card-text>
        <v-card-actions>
          <v-btn color="purple" @click="confirmPayment">Confirmar</v-btn>
          <v-btn color="grey" @click="closeConfirmationDialog">Cancelar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Success Dialog -->
    <v-dialog v-model="successDialog" max-width="400">
      <v-card>
        <v-card-title class="headline">Pago Exitoso</v-card-title>
        <v-card-text>El pago de ${{ price }} ha sido realizado con éxito.</v-card-text>
        <v-card-actions>
          <v-btn color="purple" @click="closeSuccessDialog">Cerrar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Failure Dialog -->
    <v-dialog v-model="failureDialog" max-width="400">
      <v-card>
        <v-card-title class="headline">Error en el Pago</v-card-title>
        <v-card-text>Ocurrió un error al procesar el pago. Inténtalo de nuevo.</v-card-text>
        <v-card-actions>
          <v-btn color="purple" @click="closeFailureDialog">Cerrar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script setup>
import { ref, computed, inject, onMounted } from 'vue'
import { useMovementStore } from '@/Stores/MovementStore'
import { usePaymentsStore } from '@/Stores/PaymentsStore'

const description = ref('Bitcoin')
const userToPay = ref('Isaac@Newton')
const nameToPay = ref('Isaac Newton')
const price = ref(0)
const confirmDialog = ref(false)
const successDialog = ref(false)
const failureDialog = ref(false)

const currentProfile = inject('currentuserId')
const movementStore = useMovementStore()
const paymentStore = usePaymentsStore()

// Hardcoded Example
const userIdArg = 0

onMounted(() => {
  paymentStore.createPayment(userIdArg, 100) // To delete in final version
  price.value = paymentStore.getLastPayment(userIdArg)
})

// Functions to control dialog visibility
const openConfirmationDialog = () => {
  confirmDialog.value = true
}

const closeConfirmationDialog = () => {
  confirmDialog.value = false
}

const confirmPayment = () => {
  const date = new Date().toISOString().split('T')[0]
  const time = new Date().toISOString().split('T')[1].split('.')[0]
  movementStore.addMovement(currentProfile.value, date, time, price.value, 'payment', description.value)

  if (paymentStore.pay(userIdArg, paymentStore.getLastPaymentId(userIdArg))) {
    successDialog.value = true
  } else {
    failureDialog.value = true
  }
  confirmDialog.value = false
}

const closeSuccessDialog = () => {
  successDialog.value = false
}

const closeFailureDialog = () => {
  failureDialog.value = false
}
</script>

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
  color: white;
  font-weight: bold;
}

.headline {
  font-size: 22px;
  text-align: center;
}
</style>