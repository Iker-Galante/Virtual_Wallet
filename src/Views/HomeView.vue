<script setup>
import BalanceComponent from '@/components/BalanceComponent.vue';
import MovementComponent from '@/components/MovementComponent.vue';
import Navigation from '@/components/NavigationComponent.vue';
</script>

<template>
    <Navigation>
      <template #Main_page>
      <BalanceComponent/>
      <MovementComponent/>
    </template>
    </Navigation>
</template>

<style scoped>
</style>