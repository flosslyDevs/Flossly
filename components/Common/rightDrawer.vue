<template>
  <v-navigation-drawer
    :model-value="modelValue"
    @update:model-value="$emit('update:modelValue', $event)"
    location="right"
    temporary
    :width="width"
  >
    <!-- Header -->
    <v-toolbar flat color="white">
      <v-toolbar-title>{{ title }}</v-toolbar-title>
      <v-spacer />
      <v-btn icon @click="$emit('update:modelValue', false)">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-toolbar>

    <!-- Content -->
    <div
      class="pa-4"
      style="
        background-color: #f5f5f5;
        height: calc(100% - 64px - 64px);
        overflow-y: auto;
      "
    >
      <slot />
    </div>

    <!-- Footer -->
    <!-- Footer -->
    <div
      class="d-flex justify-space-between align-center px-4 py-2"
      style="background-color: white; height: 64px"
    >
      <v-btn
        color="white"
        class="text-primary"
        style="width: 48%; border-radius: 8px"
        @click="$emit('back')"
      >
        Back
      </v-btn>

      <v-btn
        color="primary"
        class="text-white"
        style="width: 48%; border-radius: 8px"
        @click="$emit('save')"
      >
        Save
      </v-btn>
    </div>
  </v-navigation-drawer>
</template>

<script setup>
defineProps({
  modelValue: Boolean,
  title: {
    type: String,
    default: "Panel",
  },
  width: {
    type: [Number, String],
    default: 600,
  },
});

defineEmits(["update:modelValue", "back", "save"]);
</script>
