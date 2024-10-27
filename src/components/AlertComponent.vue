<template>
    <v-dialog :value="modelValue" max-width="400">
      <v-card :class="`alert-card ${colorClass}`">
        <v-card-title class="alert-title">{{ title }}</v-card-title>
        <v-card-text class="alert-text">{{ message }}</v-card-text>
        <v-card-actions class="alert-actions">
          <v-btn @click="closeDialog" :style="{ backgroundColor: buttonColor, color: 'white' }">
            {{ buttonText }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </template>
  
  <script setup>
  import { defineProps, defineEmits } from 'vue';
  
  const props = defineProps({
    title: String,
    message: String,
    buttonText: { type: String, default: 'Close' },
    colorClass: { type: String, default: 'default-color' },
    buttonColor: { type: String, default: '#8E66FF' },
    modelValue: { type: Boolean, required: true },
    onClose: Function,
  });
  
  const emit = defineEmits(['update:modelValue']);
  
  const closeDialog = () => {
    emit('update:modelValue', false); // Emit event to close dialog
    if (props.onClose) props.onClose();
  };
  </script>
  
  <style scoped>
  .alert-card {
    padding: 20px;
    border-radius: 15px;
    color: white;
  }
  .alert-title {
    font-size: 22px;
    text-align: center;
  }
  .alert-text {
    font-size: 18px;
    text-align: center;
  }
  .alert-actions {
    display: flex;
    justify-content: center;
    padding-top: 15px;
  }
  </style>
  