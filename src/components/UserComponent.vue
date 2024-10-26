<template>

    <v-card
      class="user-card"
      color="#2f2e36"
      rounded="xl"
      elevation="5"
      max-width="250"
    >
    <v-card-text>
        <p class="text-h6 font-weight-bold white--text">
            {{ name }} {{ lastName }}
        </p>
        <p class="text-h7 font-weight-bold purple--text">
            {{ username }}
        </p>
    </v-card-text>
</v-card>

</template>

<script setup>

import { defineProps } from 'vue';


const props = defineProps({

    name: {
    type: String,
    required: true,
    },
  
    lastName: {
    type: String,
    required: true,
    },

    username: {
    type: String,
    required: true,
    },
});

</script>

<style scoped>
    
    .user-card  {

        color: white;
        background-color: #2f2e36;
    }

    .text-h7    {

        color: #8E66FF; 
    }
    
</style>
