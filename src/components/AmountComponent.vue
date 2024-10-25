<script setup>
import { ref, computed, inject } from 'vue'
import { useMovementStore } from '@/Stores/MovementStore';

const amount = ref(0)
const description = ref('')
const isLoading = ref(false)

const currentProfile = inject('currentuserId');
const movementStore = useMovementStore();

console.log(currentProfile.value);

const isFormValid = computed(() => {
  return amount.value > 0 && description.value.trim() !== ''
})

const handleSubmit = () => {
  if (isFormValid.value) {
    isLoading.value = true
    // Simulate API call
    setTimeout(() => {
      console.log('Creating payment link for:', {
        amount: amount.value,
        description: description.value
      })
        const date = new Date().toISOString().split('T')[0];
        const time= new Date().toISOString().split('T')[1].split('.')[0];
        movementStore.addMovement(currentProfile.value,date,time,amount.value,'payment',description.value);
        
        console.log(movementStore.getMovementsByUserId(currentProfile.value));

        isLoading.value = false
        amount.value = ''
        description.value = ''
    },1500)
  }
}
</script>
<template>
<v-container class="fill-height">
    <v-row justify="center" align="center">
      <v-col cols="12" sm="8" md="6">
        <h1 class="text-h4 mb-6 text-center">Creá un Link de Pago</h1>
        <v-card variant="elevated" class="pa-6">
          <v-form @submit.prevent="handleSubmit">
            <v-card-text>
              <v-text-field
                v-model="amount"
                label="Monto a cobrar"
                prefix="$"
                type="number"
                variant="outlined"
                :rules="[ v => v > 0 || 'El monto debe ser mayor que 0']"
                class="mb-4"
              ></v-text-field>
              
              <v-text-field
                v-model="description"
                label="Descripción del producto o servicio"
                variant="outlined"
                placeholder="Ej: Wifi, Buzo Zara"
                :rules="[v => !!v || 'La descripción es requerida']"
              ></v-text-field>
            </v-card-text>
            
            <v-card-actions class="justify-center">
              <v-btn 
                color="primary" 
                size="large" 
                type="submit"
                :disabled="!isFormValid"
                :loading="isLoading"
              >
                Crear Link de Pago
              </v-btn>
            </v-card-actions>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>