<script setup>

const props = defineProps({
  movement: {
    type: Object,
    required: true
  }
});

function getIcon(type) {
  const iconMap = {
    'deposit': 'mdi-cash-plus',
    'withdrawal': 'mdi-cash-minus',
    'transfer': 'mdi-bank-transfer',
    'payment': 'mdi-cart',
  };
  return iconMap[type] || 'mdi-cash';
}

function formatTime(time) {
  if (!time) return '';
  
  const [hours, minutes] = time.split(':');
  const date = new Date();
  date.setHours(parseInt(hours, 10));
  date.setMinutes(parseInt(minutes, 10));
  
  return date.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
}

function formatAmount(amount) {
  const prefix = amount > 0 ? '+ ' : '- ';
  return `${prefix}$${Math.abs(amount).toFixed(2)}`;
}
</script>

<template>
  <div class="movement-item">
    <div class="icon-container">
      <v-icon color="black" size="28">{{ getIcon(movement.movementType) }}</v-icon>
    </div>
    <div class="movement-description">{{ movement.description }}</div>
    <div class="movement-right">
      <div class="movement-time">{{ formatTime(movement.time) }}</div>
      <div class="movement-amount" :class="{ 'positive': movement.amount > 0, 'negative': movement.amount < 0 }">
        {{ formatAmount(movement.amount) }}
      </div>
    </div>
  </div>
</template>

<style scoped>
.movement-item {
  display: flex;
  align-items: center;
  padding: 12px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  font-family: Arial, sans-serif;
}

.icon-container {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 16px;
  border-radius: 50%;
  background-color: white;
  overflow: hidden;
}

.icon-container .v-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  left: 30px;
}

.movement-description { 
  flex-grow: 1;
  font-weight: 500;
  color: #CCCCCC;
  font-size: 16px;
}

.movement-right {
  text-align: right;
}

.movement-time {
  font-size: 14px;
  color: #FFFFFF;
  margin-bottom: 4px;
}

.movement-amount {
  font-weight: 600;
  font-size: 16px;
}

.movement-amount.positive {
  color: #4CAF50;
}

.movement-amount.negative {
  color: #F44336;
}
</style>
