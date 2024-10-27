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

function formatDateTime(date, time) {
  if (!date || !time) return '';
  
  const [year, month, day] = date.split('-');
  const [hours, minutes, seconds] = time.split(':');
  const dateObj = new Date(year, month - 1, day, parseInt(hours, 10), parseInt(minutes, 10), parseInt(seconds, 10));
  
  return dateObj.toLocaleString('es-AR', { 
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: '2-digit', 
    minute: '2-digit',
    second: '2-digit',
    hour12: false 
  });
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
    <div class="movement-info">
      <div class="movement-description">{{ movement.description }}</div>
      <div class="transaction-type">
        {{ movement.isCardTransaction ? 'Transacción con Tarjeta' : 'Transacción con dinero en cuenta' }}
      </div>
    </div>
    <div class="movement-right">
      <div class="movement-datetime">{{ formatDateTime(movement.date, movement.time) }}</div>
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
  /* left: 10px; */
}

.movement-info {
  flex-grow: 1;
}

.movement-description { 
  font-weight: 500;
  color: #CCCCCC;
  font-size: 16px;
}

.transaction-type {
  font-size: 12px;
  color: #888;
  margin-top: 2px;
}

.movement-right {
  text-align: right;
}

.movement-datetime {
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
