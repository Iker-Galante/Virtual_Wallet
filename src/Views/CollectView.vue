<script setup>
import { ref } from 'vue'
import { useProfileStore } from '@/Stores/ProfileStore'
import NavigationComponent from '@/components/NavigationComponent.vue';
</script>

<template>
    <NavigationComponent>
        <template #page-title> Cobrar </template>
        <template #Main_page>
            <h1>Cobrar</h1>
        </template>
    </NavigationComponent>
</template>