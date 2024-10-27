<script setup>
import { ref, computed, inject } from 'vue'
import { usePaymentsStore } from '@/Stores/PaymentsStore';
import { useProfileStore } from '@/Stores/ProfileStore';

const amount = ref()
const description = ref('')
const isLoading = ref(false)
const showLink = ref(false)
const copied = ref(false)
const textToCopy = ref('');
const profileStore = useProfileStore();
const paymentsStore = usePaymentsStore();

const isFormValid = computed(() => {
  return amount.value > 0 && description.value.trim() !== ''
})

const handleSubmit = () => {
  if (isFormValid.value) {
    isLoading.value = true
    setTimeout(() => {
      console.log('Creating payment link for:', {
        amount: amount.value,
        description: description.value
      })
        const date = new Date().toISOString().split('T')[0];
        const time= new Date().toISOString().split('T')[1].split('.')[0];
        const params = paymentsStore.createPayment(profileStore.getCurrentProfileId(), amount);
        textToCopy.value = `http://localhost:3000/pay/${params}`
        isLoading.value = false
        showLink.value = true
    },1500)
  }
}



function copyToClipboard() {
  navigator.clipboard.writeText(textToCopy.value)
    .then(() => {
      copied.value = true
    })
    .catch(err => {
      console.error("Error al copiar al portapapeles:", err);
    });
}

const handleClose = () => {
  amount.value = 0
  description.value = ''
  showLink.value = false
  copied.value = false
}
</script>
<template>
<v-container>
    <v-row justify="center" align="center">
      <v-col cols="12" sm="8" md="6">
        <h1 class="text-h4 mb-6 font-weight-bold text-center text-white height">Creá un Link de Pago</h1>
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
                placeholder="0"
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
      </v-col>
    </v-row>
      <v-dialog v-model="showLink" max-width="500px" persistent>
        <v-card color="#1D1D1D" height="250px" rounded="xl">
          <v-card-title class="text-h6 ma-4" >
            <v-row>
              <v-col cols="11">
                <span>Link de pago generado por $ {{ amount }}</span>
              </v-col>
              <v-col cols="1">
                <v-icon class="close-icon close-button" @click="handleClose" color="grey darken-1">
                  mdi-close
                </v-icon>
              </v-col>
            </v-row>
            
            
          </v-card-title>
          <v-card-text>
            <v-text-field
            v-model="textToCopy"
            label="Link de pago"
            variant="outlined"
            color="white"
            class="text-white"
            readonly
            append-inner-icon="mdi-content-copy"
            @click:append-inner="copyToClipboard"
            ></v-text-field>
            <h4 v-if="copied" class="copy-confirmation">Link copiado a portapapeles</h4>
          </v-card-text>
        </v-card>
      </v-dialog>
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

.copy-confirmation {
  font-size: 0.8rem;
  margin-top: -18px;
  margin-left: 10px;
  color: #757575; 
}
</style>