<script setup>
import BalanceComponent from '@/components/BalanceComponent.vue';
import MovementComponent from '@/components/MovementComponent.vue';
import Navigation from '@/components/NavigationComponent.vue';
</script>

<template>
  <Navigation>
    <template #page-title>Inicio</template>
    <template #Main_page>
      <div class="home-content">
        <div class="balance-wrapper">
          <BalanceComponent/>
        </div>
        <div class="movement-wrapper">
          <MovementComponent/>
        </div>
      </div>
    </template>
  </Navigation>
</template>

<style scoped>
.home-content {
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  padding-top: 20px; /* Add some top padding */
}

.balance-wrapper, .movement-wrapper {
  width: 100%;
}

.balance-wrapper {
  display: flex;
  justify-content: center;
}

.movement-wrapper {
  margin-top: 20px;
}
</style>
