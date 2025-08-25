<template>
  <div
    class="checklist-row d-flex align-center"
    :class="{ 'has-border': hasBorder }"
    @mouseenter="hover = true"
    @mouseleave="hover = false"
  >
    <!-- Checkbox Cell -->
    <div class="table-cell checkbox-cell">
      <v-checkbox
        v-model="isChecked"
        hide-details
        density="compact"
        class="ma-0 pa-0"
        @update:model-value="onChecked"
      />
    </div>

    <!-- Title Cell -->
    <div class="table-cell title-cell">
      {{ title }}
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  title: String,
  id: [String, Number],
  hasBorder: {
    type: Boolean,
    default: true, // Let parent disable top border for first row
  },
})

const emit = defineEmits(['checked'])

const isChecked = ref(false)
const hover = ref(false)

function onChecked(value) {
  emit('checked', { id: props.id, checked: value })
}
</script>

<style scoped>
.checklist-row {
  display: flex;
  min-height: 48px;
  transition: background-color 0.2s ease;
  cursor: pointer;
}

.checklist-row.has-border {
  border-bottom: 1px solid #e0e0e0;
}

.checklist-row:hover {
  background-color: #f5f5f5;
}

.table-cell {
  padding: 12px 16px;
  display: flex;
  align-items: center;
  font-size: 14px;
}

.checkbox-cell {
  width: 56px;
  justify-content: center;
  border-right: 1px solid #e0e0e0;

}

.title-cell {
  flex: 1;
}
</style>
