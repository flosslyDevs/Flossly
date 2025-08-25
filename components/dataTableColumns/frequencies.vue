<template>
  <div
    :style="`background-color: ${getRandomHexColor()}; height: 100%;`"
    class="pa-1 d-flex align-center"
  >
    <v-menu
      v-model="selected.frequencyMenu"
      :close-on-content-click="false"
      offset-y
    >
      <template #activator="{ props }">
        <p
          v-bind="props"
        style="width: 100%;"> {{ selected?.frequency }}</p>
      </template>

      <v-card width="250" class="pa-4">
        <v-list>
          <v-list-item
            v-for="(s, i) in frequencyStatuses"
            :key="i"
            :style="`background-color: ${getRandomHexColor()}; color:#fff; margin-bottom: 6px; min-height: 30px;`"
            @click="
              () => {
                selected.frequency = s.name;
                emit('update');
                selected.frequencyMenu = false; // Optional: close menu on select
              }
            "
          >
            <v-list-item-title>{{ s.name }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-card>
    </v-menu>
  </div>
</template>
<script setup>
import { getRandomHexColor } from '~/lib/misc';

const { selected, column } = defineProps(["selected", "column"]);
const emit = defineEmits(["update"]);
const frequencyStatuses = ref([
  { key: "daily", name: "Daily", color: "#4CAF50" }, // Green
  { key: "weekly", name: "Weekly", color: "#2196F3" }, // Blue
  { key: "biweekly", name: "Biweekly", color: "#3F51B5" }, // Indigo
  { key: "monthly", name: "Monthly", color: "#9C27B0" }, // Purple
  { key: "quarterly", name: "Quarterly", color: "#FF9800" }, // Orange
  { key: "yearly", name: "Yearly", color: "#795548" }, // Brown
  { key: "adhoc", name: "Ad Hoc", color: "#607D8B" }, // Blue Grey
]);
</script>
