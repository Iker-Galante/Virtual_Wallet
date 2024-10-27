<script setup>
import MovementsComponent from '@/components/Movements/MovementComponent.vue';
import MovementAnalyticsComponent from '@/components/Movements/MovementAnalyticsComponent.vue';
</script>

<template>
    <NavigationComponent>
        <template #page-title> Movimientos </template>
        <template #Main_page>
            <div class="movement-wrapper">
                <MovementAnalyticsComponent/>
            </div>
            <div class="movement-wrapper">
                <MovementsComponent/>
            </div>
        </template>
    </NavigationComponent>
</template>

<style scoped>
.movement-wrapper {
  display: flex;
  justify-content: center;
  /* align-items: center; */
  /* height: 100%; */
  margin-top: 40px;
}
</style>
