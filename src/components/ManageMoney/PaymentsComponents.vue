<script setup>
import { ref, inject, onMounted, defineProps, computed } from 'vue';
import { useCardStore } from '@/Stores/CardStore';
import { useMovementStore } from '@/Stores/MovementStore';
import { usePaymentsStore } from '@/Stores/PaymentsStore';
import { useProfileStore } from '@/Stores/ProfileStore';


import CardComponent from '@/components/ManageMoney/CardComponent.vue';


//const currentUserId = inject('currentuserId');
const cardStore = useCardStore();
const movementStore = useMovementStore();
const paymentsStore = usePaymentsStore();
const profileStore = useProfileStore();
const currentProfile = computed(() => profileStore.getCurrentProfile())
const profileId = computed(() => profileStore.getCurrentProfileIndex(currentProfile.value.email))
const carouselIndex = ref(0);
const open= ref(false);
const error_message = ref('')
const props = defineProps({
  userIdArg: {
    type: [String, undefined],
    default: undefined
  },
  paymentIdArg: {
    type: [String, undefined],
    default: undefined
  }
});

// Form data
const form = ref({
  userId: '',
  amount: '',
  alias: '',
  paymentMethod: '',
  cardNumber: ''
});

const currentCardIndex = ref(0);

onMounted(() => {
  if (props.userIdArg) {
    
    form.value.userId = props.userIdArg;
  }

  if (props.paymentIdArg) {
    const paymentAmount = paymentsStore.getPaymentAmount(props.userIdArg, props.paymentIdArg);
    if (paymentAmount) {
      form.value.amount = paymentAmount;
    }
  }

  
});

const submitted = ref(false);
const isDialogOpen = ref(false);
const cards = computed(() => cardStore.getCards(profileId.value))

const colors = ["#E1CC83", "#83B4E1", "#888989", "#6CAB90"];

function getCardColor(index)  {

  return colors[index % 4];
}

function transfer(otherUserId, amountToPay) {

  if (props.paymentIdArg) {
  
    // Cancela la deuda (cobra el otro)
    paymentsStore.pay(otherUserId, props.paymentIdArg);
  }
  else  {


    movementStore.addMovement(otherUserId, new Date().toLocaleDateString(), new Date().toLocaleTimeString(), amountToPay, 'cobro', 'Cobro en cuenta', false);
  }
}

function deleteForm() {
   //reset:
   form.value.alias = '';
    form.value.amount = '';
    form.value.paymentMethod = '';


}

function confirmPayment() {
  isDialogOpen.value = false;
  submitted.value = true;
  
  const otherUserId = props.userIdArg ? form.value.userId : profileStore.getProfileIdByAlias(form.value.alias);

  if( !props.userIdArg && !profileStore.profileExists(form.value.alias))  {

    open.value = true
    error_message.value ="Usario Invalido";
    deleteForm();
    return;
  }
  
  const amount = parseFloat(form.value.amount);

  const amountToPay = props.paymentIdArg ? 
    paymentsStore.getPaymentAmount(otherUserId, props.paymentIdArg) || amount
    : amount;

  if (amountToPay <= 0 || isNaN(amountToPay)) {
    open.value = true;
    error_message.value = "Monto invalido o insuficiente.";
    deleteForm();
    return;
  }

  if (form.value.paymentMethod === 'Balance en Cuenta') {

    // payment usando balance

    if (movementStore.addMovement(profileId.value, new Date().toLocaleDateString(), new Date().toLocaleTimeString(), -amountToPay, 'pago', 'Pago con saldo', false)) {

      transfer(otherUserId, amountToPay);
    } 
    else {
      error_message.value = "Fondos insuficientes en balance.";
      open.value = true;
      console.log("Insufficient funds in balance.");
    }

  } else if (form.value.paymentMethod === 'Tarjeta') {

    // payment usando tarjeta
    
    console.log(form);
    console.log(cards.value);
    console.log(carouselIndex.value);
    console.log(cards.value[carouselIndex.value].cardNumber);

    if (movementStore.addMovement(profileId.value, new Date().toLocaleDateString(), new Date().toLocaleTimeString(), -amountToPay, 'pago', 'Pago con tarjeta', true, cards.value[carouselIndex.value].cardNumber)) {
      
      transfer(otherUserId, amountToPay);

    } else {
      error_message.value = "Fondos insuficientes en la tarjeta.";
      open.value = true
      console.log("Insufficient funds on card.");
    }
  }

  deleteForm();

}

function submitPayment() {
  if (form.value.amount && form.value.alias && form.value.paymentMethod) {
    console.log(carouselIndex.value)
    isDialogOpen.value = true;
  }
}

const paymentMethodIcon = computed(() => {
  return form.value.paymentMethod === 'Balance en Cuenta' ? 'money' : 'card';
});
</script>

<template>
  <div class="payment-form">
    <h2 class="form-title">Pagar Transferencia</h2>

    <form @submit.prevent="submitPayment">
      <!-- Amount Field -->
      <div class="form-group">
        <label for="amount">Monto</label>
        <div class="input-wrapper">
          <span class="input-icon">$</span>
          <input 
            type="number" 
            v-model="form.amount" 
            :placeholder="props.paymentIdArg ? 'Autocompletado' : 'Ingrese monto'"
            required

          />
        </div>
      </div>

      <!-- Alias Field -->
      <div class="form-group">
        <label for="alias">Alias</label>
        <div class="input-wrapper">
          <input 
            type="text" 
            v-model="form.alias" 
            placeholder="Alias o nombre de beneficiario" 
            required
          />
        </div>
      </div>

      <!-- Payment Method Field -->
      <div class="form-group">
        <label for="paymentMethod">Metodo de Pago</label>
        <select v-model="form.paymentMethod" required>
          <option value="" disabled>Seleccione un metodo</option>
          <option value="Balance en Cuenta">Balance en cuenta</option>
          <option  v-if="cards.length !== 0" value="Tarjeta">Tarjeta</option>
        </select>
      </div>

      <!-- Card Selection (only if payment method is Card) -->
      <div v-if="form.paymentMethod === 'Tarjeta'" class="form-group">
        <label>Seleccionar Tarjeta</label>
        <div class="card-slider">

          <v-carousel class="d-flex justify-center align-center" hide-delimiters height="200" v-model="carouselIndex">
            <v-carousel-item v-for="(card, index) in cards" :key="card.cardNumber">
              <CardComponent
              height="90%"
              :cardNumber="card.cardNumber.toString()"
              :cardholderName="card.name"
              :cardColor="getCardColor(index)"
              />
            </v-carousel-item>

          </v-carousel>
          
        </div>
      </div>

      <!-- Submit Button -->
      <button type="submit" class="submit-button">Realizar Pago</button>
    </form>
  </div>
  <div v-if="isDialogOpen" class="modal-overlay">
  <div class="modal">
    <h3>Confirmación de Pago</h3>
    <p>Monto: {{ form.amount }}</p>
    <p>Beneficiario: {{ form.alias }}</p>
    <p>Método de Pago: {{ form.paymentMethod }}</p>

    <!-- Confirmation Buttons -->
    <div class="modal-buttons">
      <button @click="confirmPayment" class="confirm-button">Confirmar</button>
      <button @click="isDialogOpen = false" class="cancel-button">Cancelar</button>
    </div>
  </div>
</div>
<v-dialog v-model="open" max-width="290">
    <v-card color="#1D1D1D">
      <v-card-title class="headline">Error</v-card-title>
        <slot>
        <v-card-text>{{error_message}}</v-card-text>
        </slot>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="error" text @click="open = false">Cerrar</v-btn>
      </v-card-actions>
    </v-card>
    </v-dialog>
</template>



<style scoped>
.payment-form {
  max-width: 600px;
  margin: 40px auto;
  padding: 30px;
  background-color: #28293E;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.form-title {
  font-size: 24px;
  font-weight: bold;
  color: #FFFFFF;
  margin-bottom: 20px;
  text-align: center;
}

.form-group {
  margin-bottom: 16px;
}

label {
  font-size: 14px;
  font-weight: 500;
  color: #D1D1E9;
  display: block;
  margin-bottom: 6px;
}

.input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  background-color: #353550;
  border: 1px solid #5A5B85;
  border-radius: 8px;
  padding: 10px;
}

.input-icon {
  margin-right: 8px;
  color: #9A9AB3;
}

input, select {
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: none;
  border-radius: 4px;
  background-color: transparent;
  color: #FFFFFF;
  outline: none;
}

.submit-button {
  width: 100%;
  padding: 12px;
  font-size: 16px;
  font-weight: bold;
  color: white;
  background-color: #4A90E2;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s;
  margin-top: 20px;
}

.submit-button:hover {
  background-color: #357ABD;
}

/* Card Slider Styling */
.card-slider {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 10px;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal {
  background-color: #28293E;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
  color: #FFFFFF;
  max-width: 300px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.modal h3 {
  margin-bottom: 10px;
}

.modal-buttons {
  margin-top: 20px;
  display: flex;
  justify-content: space-around;
}

.confirm-button, .cancel-button {
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  font-weight: bold;
  cursor: pointer;
  color: #FFFFFF;
}

.confirm-button {
  background-color: #4A90E2;
}

.confirm-button:hover {
  background-color: #357ABD;
}

.cancel-button {
  background-color: #888989;
}

.cancel-button:hover {
  background-color: #6CAB90;
}

select {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  color: #D1D1E9;
}

select option {
  background-color: #353550;
  color: #FFFFFF;
}
</style>
