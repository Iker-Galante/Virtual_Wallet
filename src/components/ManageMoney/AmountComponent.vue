<script setup>
import { ref, computed, inject } from 'vue'
import { useMovementStore } from '@/Stores/MovementStore';
import logo from '@/assets/Visa.png'
const amount = ref(0)
const description = ref('')
const isLoading = ref(false)

const currentProfile = inject('currentuserId');
const movementStore = useMovementStore();
const otherForms=ref([{name:'QR',img:'mdi-qrcode-scan'},
                      {name:'Contactos',img:'mdi-contacts'},
                      {name:'Sin Monto Definido',img:'mdi-currency-usd-off'}]);

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
        
        isLoading.value = false
        amount.value = ''
        description.value = ''
    },1500)
  }
}
</script>
<template>
<v-container>
    <v-row justify="center" align="center">
      <v-col cols="12" sm="8" md="6">
        <h1 class="text-h4 mb-6 text-left text-white height">Creá un Link de Pago</h1>
        <v-card variant="elevated" class="pa-6 cuadro">
          <v-form @submit.prevent="handleSubmit">
            <v-card-text>
              <v-text-field
                v-model="amount"
                label="Monto a cobrar"
                prepend-inner-icon="mdi-currency-usd"
                type="number"
                variant="outlined"
                class="mb-4 text-white"
                color="white"
              ></v-text-field>
              
              <v-text-field
                v-model="description"
                label="Descripción del producto o servicio"
                variant="outlined"
                placeholder="Ej: Wifi, Buzo Zara"
                color="white"
                class="text-white"
              ></v-text-field>
            </v-card-text>
            
            <v-card-actions class="justify-center">
              <v-btn 
                color="white" 
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
        <h1 class="text-h5 mb-6 text-left text-white height">Otras Formas de Cobro</h1>
        <div class="d-flex d-row justify-space-between align-center" justify="center" align="center">
          <v-card v-for="forms in otherForms" class="distancia" @click="console.log('Gracias por su compra')">
            <v-card-text>
              <v-row no-gutters align="center">
                <v-col cols="16">
                  <v-icon
                  :icon="forms.img" 
                  max-width="60"
                  max-height="60"
                  class="icons"
                ></v-icon>
                  <p class="text-h6 font-weight-bold text-white" style="color: white;">
                    {{ forms.name }}
                  </p>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </div>
              
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

.distancia {
  margin-right: 20px;
  border-radius: 15px;
  background-color: #2f2e36;
}

.icons {
  color: white;
  font-size: 80px;
}

</style>