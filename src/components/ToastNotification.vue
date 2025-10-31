<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  show: {
    type: Boolean,
    default: false,
  },
  message: {
    type: String,
    default: 'Item adicionado ao carrinho!',
  },
  type: {
    type: String,
    default: 'success', // success, error, info
  },
})

const emit = defineEmits(['close'])

const visible = ref(props.show)

watch(
  () => props.show,
  (newVal) => {
    visible.value = newVal
    if (newVal) {
      setTimeout(() => {
        visible.value = false
        emit('close')
      }, 3000) // 3 segundos
    }
  },
)
</script>

<template>
  <Transition name="toast">
    <div v-if="visible" :class="['toast-notification', `toast-${type}`]">
      <div class="toast-content">
        <span class="toast-icon">✓</span>
        <span class="toast-message">{{ message }}</span>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.toast-notification {
  position: fixed;
  top: 100px;
  right: 30px;
  z-index: 9999;
  padding: 16px 24px;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  gap: 12px;
  min-width: 300px;
  max-width: 400px;
}

.toast-success {
  background: linear-gradient(135deg, #4caf50 0%, #45a049 100%);
  color: white;
}

.toast-error {
  background: linear-gradient(135deg, #f44336 0%, #d32f2f 100%);
  color: white;
}

.toast-info {
  background: linear-gradient(135deg, #2196f3 0%, #1976d2 100%);
  color: white;
}

.toast-content {
  display: flex;
  align-items: center;
  gap: 12px;
}

.toast-icon {
  font-size: 24px;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
}

.toast-message {
  font-size: 15px;
  font-weight: 500;
}

/* Animações */
.toast-enter-active {
  animation: slideIn 0.3s ease-out;
}

.toast-leave-active {
  animation: slideOut 0.3s ease-in;
}

@keyframes slideIn {
  from {
    transform: translateX(400px);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

@keyframes slideOut {
  from {
    transform: translateX(0);
    opacity: 1;
  }
  to {
    transform: translateX(400px);
    opacity: 0;
  }
}

/* Responsividade */
@media (max-width: 768px) {
  .toast-notification {
    right: 15px;
    left: 15px;
    min-width: auto;
  }
}
</style>
