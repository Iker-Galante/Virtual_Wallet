<script setup>
import { ref, inject, computed } from 'vue'

const currentUserId = inject('currentuserId')
const form = ref({
  amount: '',
  alias: '',
  paymentMethod: ''
})

const submitted = ref(false)
const isDialogOpen = ref(false)

function confirmPayment() {
  isDialogOpen.value = false
  submitted.value = true
  console.log("Payment confirmed:", form.value)
}

function submitPayment() {
  if (form.value.amount && form.value.alias && form.value.paymentMethod) {
    isDialogOpen.value = true
  }
}

const paymentMethodIcon = computed(() => {
  return form.value.paymentMethod === 'Balance en Cuenta' ? 'money' : 'card'
})
</script>

<template>
  <div class="payment-form">
    <h2 class="form-title">Pago en Transferencia</h2>

    <form @submit.prevent="submitPayment">
      <div class="form-group">
        <label for="amount">Monto</label>
        <div class="input-wrapper">
          <span class="input-icon">$</span>
          <input 
            type="number" 
            v-model="form.amount" 
            id="amount" 
            placeholder="100.00"
            required
          />
        </div>
      </div>

      <div class="form-group">
        <label for="alias">Alias</label>
        <div class="input-wrapper">
          <span class="input-icon">@</span>
          <input 
            type="text" 
            v-model="form.alias" 
            id="alias" 
            placeholder="jose.mercado.pago" 
            required
          />
        </div>
      </div>

      <div class="form-group">
        <label for="paymentMethod">Metodo de Pago</label>
        <div class="input-wrapper">
          <span class="input-icon">
            <svg v-if="paymentMethodIcon === 'card'" xmlns="http://www.w3.org/2000/svg" class="icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
            </svg>
            <svg v-else xmlns="http://www.w3.org/2000/svg" class="icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </span>
          <select 
            v-model="form.paymentMethod" 
            id="paymentMethod" 
            required
          >
            <option value="" disabled>Seleccione un metodo</option>
            <option value="Tarjeta">Tarjeta</option>
            <option value="Balance en Cuenta">Balance en cuenta</option>
          </select>
        </div>
      </div>

      <button type="submit" class="submit-button">
        Transferir
      </button>
    </form>

    <div v-if="isDialogOpen" class="dialog-overlay">
      <div class="dialog">
        <h3 class="dialog-title">Payment Confirmation</h3>
        <div class="dialog-content">
          <p><strong>Monto:</strong> ${{ form.amount }}</p>
          <p><strong>Alias:</strong> {{ form.alias }}</p>
          <p><strong>Metodo:</strong> {{ form.paymentMethod }}</p>
        </div>
        <div class="dialog-actions">
          <button @click="isDialogOpen = false" class="cancel-button">
            Cancel
          </button>
          <button @click="confirmPayment" class="confirm-button">
            Confirmar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.payment-form {
  width: 800px;
  margin: 0 auto;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 24px;
}

.form-title {
  font-size: 24px;
  font-weight: bold;
  color: #333;
  margin-bottom: 24px;
}

.form-group {
  margin-bottom: 16px;
}

label {
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: #555;
  margin-bottom: 4px;
}

.input-wrapper {
  position: relative;
}

.input-icon {
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: #777;
}

input, select {
  width: 100%;
  padding: 10px 12px 10px 36px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: white;
}

select {
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23777'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 12px center;
  background-size: 16px;
}

.icon {
  width: 20px;
  height: 20px;
}

.submit-button {
  width: 100%;
  padding: 12px;
  font-size: 16px;
  font-weight: 600;
  color: white;
  background-color: #3b82f6;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.submit-button:hover {
  background-color: #2563eb;
}

.dialog-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}

.dialog {
  background-color: white;
  border-radius: 8px;
  padding: 24px;
  width: 100%;
  max-width: 400px;
}

.dialog-title {
  font-size: 20px;
  font-weight: 600;
  color: #333;
  margin-bottom: 16px;
}

.dialog-content {
  margin-bottom: 24px;
}

.dialog-content p {
  margin-bottom: 8px;
}

.dialog-actions {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
}

.cancel-button, .confirm-button {
  padding: 8px 16px;
  font-size: 14px;
  font-weight: 500;
  border-radius: 4px;
  cursor: pointer;
}

.cancel-button {
  color: #555;
  background-color: #f3f4f6;
  border: 1px solid #d1d5db;
}

.confirm-button {
  color: white;
  background-color: #3b82f6;
  border: none;
}

.cancel-button:hover {
  background-color: #e5e7eb;
}

.confirm-button:hover {
  background-color: #2563eb;
}
</style>