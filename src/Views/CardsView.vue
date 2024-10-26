<script setup>
import { ref, onMounted, computed,provide } from 'vue'
import CreditCard from '@/components/CardComponent.vue'
import NavigationComponent from '@/components/NavigationComponent.vue'
import { useCardStore } from '@/Stores/CardStore'
import { useProfileStore } from '@/Stores/ProfileStore'
import { reactive } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { required, numeric, maxLength, helpers } from '@vuelidate/validators'


const cardStore = useCardStore()
const profileStore = useProfileStore()
const showModal = ref(false)
const currentProfile = computed(() => profileStore.getCurrentProfile())
const profileId = computed(() => profileStore.getCurrentProfileIndex(currentProfile.value.email))
const cards = computed(() => cardStore.getCards(profileId.value))
const visaRegex = /^4[0-9]{12}(?:[0-9]{3})?$/;
const masterCardRegex = /^5[1-5][0-9]{14}$/;
const amexRegex = /^3[47][0-9]{13}$/;

onMounted(() => {
  // Only add a card if there are no cards for this profile
  if (cards.value.length === 0) {
    cardStore.addCard("admin admin", "4338123456789101", "10/26", "123", 0, profileId.value)
  }

  cardStore.toggleDeleteButton(false)
})

const colors = ["#E1CC83", "#83B4E1", "#888989", "#6CAB90"]

const formInitialState = {
    name: '',
    cardNumber: '',
    expDate: '',
    cvv: '',
  }

const formState = reactive({
    ...formInitialState,
  })

  const validName = (value) => {
    const namePattern = /^[A-Za-z]+( [A-Za-z]+)*$/
    return namePattern.test(value)
}

const cardNumberValidator = (value) => {
  if (!visaRegex.test(value) && !masterCardRegex.test(value) && !amexRegex.test(value)) {
    return false
  }

  return true
}

const expirationDateValidator = (value) => {
  const regex = /^(0[1-9]|1[0-2])\/\d{2}$/
  if (!regex.test(value)) {
    return false
  }

  const [month, year] = value.split('/').map(Number)
  
  const currentDate = new Date()
  const currentMonth = currentDate.getMonth() + 1
  const currentYear = currentDate.getFullYear() % 100
  
  if (year < currentYear || (year === currentYear && month <= currentMonth)) {
    return false
  }

  return true
}

const cvvValidator = (value) => {
  return amexRegex.test(formState.cardNumber) ? value.length === 4 : value.length === 3
}

  const rules = {
    name: { 
      required: helpers.withMessage('Este campo es obligatorio', required),
      validName: helpers.withMessage('Ingrese un nombre valido', validName),
      },
    cardNumber: { 
      required: helpers.withMessage('Este campo es obligatorio', required),
      numeric: helpers.withMessage('Solo se aceptan caracteres numericos', numeric),
      cardNumberValidator: helpers.withMessage('No es un numero de tarjeta valido o de un banco aceptado', cardNumberValidator), 
    },
    expDate: { 
      required: helpers.withMessage('Este campo es obligatorio', required),
      expirationDateValidator: helpers.withMessage('Ingrese una fech valida', expirationDateValidator),
      maxLength: maxLength(5)
    },
    cvv: { 
      required: helpers.withMessage('Este campo es obligatorio', required),
      numeric: helpers.withMessage('Solo se aceptan caracteres numericos', numeric),
      cvvValidator: helpers.withMessage('Ingrese un cvv valido', cvvValidator),
      maxLength: maxLength(4) 
    },
  }

  const v$ = useVuelidate(rules, formState)

  function clear () {
    v$.value.$reset()

    for (const [key, value] of Object.entries(formInitialState)) {
      formState[key] = value
    }
  }

  function handleDeletButton() {
    cardStore.toggleDeleteButton(true)
  }

  function handleCancelDelete() {
    cardStore.toggleDeleteButton(false)
  }

const addCard = () => {
  cardStore.addCard(
    formState.name,
    formState.cardNumber,
    formState.expDate,
    formState.cvv,
    10000,
    profileId.value
  );
  showModal.value = false
  clear()
}

async function handleAddCard() {
  const isFormCorrect = await v$.value.$validate();
  if (isFormCorrect) {
    addCard();
  } else {
    v$.value.$touch();
  }
}

const handleCancel = () => {
  showModal.value = false;
  clear();
}

</script>

<template>
    <NavigationComponent>
      <template #page-title>Tarjetas</template> 
      <template #Main_page>
        <v-btn
          fab
          color="#1D1D1D"
          icon="mdi-close"
          size="60"
          class="fab-top-right"
          v-if="cardStore.showDelete"
          @click="handleCancelDelete()"
          >
          <v-icon size="28">mdi-close</v-icon>
        </v-btn>
        <v-row justify="start">
          <v-col cols="4" md="4" class="ma-15">
            <p class="text-h3 font-weight-bold" style="color: white">
              Mis Tarjetas
            </p>
          </v-col>
        </v-row>
        <v-container class="ml-15 mr-15" fluid>
          <v-row>
            <v-col
              v-for="(tarjeta, index) in cards"
              :key="index"
              cols="12"
              sm="6"
              md="6"
              lg="4"
              xl="3"
            >
            <CreditCard
            :cardNumber="tarjeta.cardNumber.toString()"
            :cardholderName="tarjeta.name"
            :cardColor="colors[index % 4]"
              />
            </v-col>
          </v-row>
        </v-container>
        <v-speed-dial
          location="top center"
          transition="slide-y-reverse-transition"
          v-if="!cardStore.showDelete"
        >
          <template v-slot:activator="{ props: activatorProps }">
            <v-btn
              fab
              v-bind="activatorProps"
              :active="true"
              icon="mdi-credit-card-edit-outline"
              color="#1D1D1D"
              class="fab-button"
              size="70"
            >
              <v-icon color="white" size="28">mdi-credit-card-edit-outline</v-icon>
            </v-btn>
          </template>

          <v-btn  key="1" icon="mdi-trash-can-outline" size="large" color="#3D3D3D" @click="handleDeletButton()">
            <v-icon color="white" size="25">mdi-trash-can-outline</v-icon>
          </v-btn>
          <v-btn key="2" icon="mdi-plus" size="large" color="#3D3D3D" @click="showModal = true">
            <v-icon color="white" size="30">mdi-plus</v-icon>
          </v-btn>

        </v-speed-dial>
        
        <v-dialog v-model="showModal" max-width="900px" persistent>
        <v-card color="#1D1D1D" height="700px" rounded="xl" class="custom-scrollbar">
          <v-card-title class="text-h5 ma-4" >Nueva Tarjeta</v-card-title>
          <v-card-text>
            <v-container>
              <v-row justify="center">
                <v-col cols="12" sm="8" md="8" lg="6" xl="5">
                  <CreditCard
                  :cardNumber= "formState.cardNumber"
                  :cardholderName="formState.name"
                  :cardColor="colors[2]"
                  />
                </v-col>
              </v-row>
            </v-container>
            <form>
              <v-text-field
                v-model="formState.name"
                :error-messages="v$.name.$errors.map(e => e.$message)"
                label="Nombre (Como aparece en la tarjeta)"
                required
                maxlength="18"
                @blur="v$.name.$touch"
                @input="v$.name.$touch"
                ></v-text-field>

                <v-card-text>
                  <v-row no-gutters align="center" justify="start" class="d-flex align-center">
                    <v-col cols="auto" class="pr-2">
                      <p class="text-h8 font-weight-bold" style="color: white">
                        Solo se aceptan los siguientes tipos de tarjetas:
                      </p>
                    </v-col>
                    <v-col cols="1" class="px-1">
                      <v-img
                        src="@/assets/mastercard2.jpg"
                        max-width="55"
                        max-height="55"
                      ></v-img>
                    </v-col>
                    <v-col cols="1" class="px-1">
                      <v-img
                        src="@/assets/Visa.png"
                        max-width="50"
                        max-height="50"
                      ></v-img>
                    </v-col>
                    <v-col cols="1" class="px-1">
                      <v-img
                        src="@/assets/American-Express-Logo.png"
                        max-width="60"
                        max-height="60"
                      ></v-img>
                    </v-col>
                  </v-row>
                </v-card-text>
              <v-text-field
                v-model="formState.cardNumber"
                :error-messages="v$.cardNumber.$errors.map(e => e.$message)"
                label="Numero de tarjeta"
                required
                maxlength="16"
                @blur="v$.cardNumber.$touch"
                @input="v$.cardNumber.$touch"
              ></v-text-field>
              <v-container>
                <v-row no-gutters justify="center">
                  <v-col cols="4" md="4" class="mx-15">
                    <v-text-field
                      v-model="formState.expDate"
                      :error-messages="v$.expDate.$errors.map(e => e.$message)"
                      label="Fecha de vencimiento"
                      placeholder="mm/yy"
                      required
                      maxlength="5"
                      @blur="v$.expDate.$touch"
                      @input="v$.expDate.$touch"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="4" md="4" class="mx-15">
                    <v-text-field
                      v-model="formState.cvv"
                      :error-messages="v$.cvv.$errors.map(e => e.$message)"
                      label="CVV"
                      required
                      maxlength="4"
                      @blur="v$.cvv.$touch"
                      @input="v$.cvv.$touch"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
          </form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="#794588" @click="handleAddCard()">Agregar</v-btn>
          <v-btn color="#794588" @click="handleCancel()">Cancelar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
        
      </template>
    </NavigationComponent>
</template>

<style scoped>

.fab-button {
  position: fixed;
  bottom: 34px;
  right: 44px;
  color: rgba(255, 255, 255, 0.1) !important;
}

.fab-top-right {
  position: fixed;
  top:120px; 
  right: 60px;
}

.custom-scrollbar::-webkit-scrollbar {
  width: 8px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: #f1f1f1; 
  border-radius: 4px;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: #4a4a4a;
  border-radius: 4px;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background-color: #333;
}
</style>