<script setup>
import { ref, computed, inject, onMounted } from 'vue'
import { useMovementStore } from '@/Stores/MovementStore';
import { usePaymentsStore } from '@/Stores/PaymentsStore';

const description = ref('Bitcoin')
const price = ref(0)

const isLoading = ref(false)


const currentProfile = inject('currentuserId');
const movementStore = useMovementStore();
const paymentStore = usePaymentsStore();

const isFormValid = computed(() => {
  return price.value > 0 && description.value.trim() !== ''
})


//Hardcoded:
onMounted(() => {
  
  paymentStore.createPayment(0, 100)
  price.value = paymentStore.getLastPayment(0);
  
});

const handlePayment = () => {
  console.log('Procesando pago. Detalles:', {
    amount: price.value,
    description: description.value
  });
  const date = new Date().toISOString().split('T')[0];
  const time = new Date().toISOString().split('T')[1].split('.')[0];
  movementStore.addMovement(currentProfile.value, date, time, price.value, 'payment', description.value);
};
</script>

<template>
  <v-container>
    <v-row justify="center" align="center">
      <v-col cols="12" sm="8" md="6">

        <v-card variant="elevated" class="pa-6 cuadro">
          
          <template v-if="price.value !== null">
            <h1 class="text-h4 mb-6 text-left text-white height">Detalles del Pago</h1>
            <v-card-text>
              <v-card-subtitle class="text-h6 mb-2 text-white">
                Monto a pagar: <strong>$ {{ price }}</strong>
              </v-card-subtitle>
              <v-card-subtitle class="text-h6 text-white">
                Razón: <strong>{{ description }}</strong>
              </v-card-subtitle>
            </v-card-text>
            <v-card-actions class="justify-center">
              <v-btn 
                color="white" 
                size="large" 
                @click="handlePayment"
              >
                Confirmar Pago
              </v-btn>
            </v-card-actions>
          </template>

          <template v-else>
            <h1 class="text-h4 mb-6 text-left text-white height">Error</h1>
            <v-card-text>
              <p class="text-white">Lo sentimos, no se pudieron cargar los detalles de pago. Verifique su solicitud e intente nuevamente.</p>
            </v-card-text>
          </template>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>


<style scoped>
.height {
  padding-top: 20px;
  padding-bottom: 20px;
}

.cuadro {
  border-radius: 15px;
  background-color: #2f2e36;
  margin-bottom: 20px;
}

.icons {
  color: white;
  font-size: 80px;
}
</style>